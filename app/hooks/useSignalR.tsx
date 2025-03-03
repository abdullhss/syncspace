"use client";
import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axiosInstance from "../axiosInstance";
import ReactPlayer from "react-player";

const API_URL = "https://syncspace.runasp.net/streaminghub";
const API_CHAT = "https://syncspace.runasp.net/api";

export const useSignalR = (roomId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [ videoLink , setVideoLink] = useState<string>("");
  const [IsPlaying , setIsPlaying] = useState<boolean>(false) ;
  const ReactPlayerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(API_URL)
      .withAutomaticReconnect()
      .build();

    conn.start()
      .then(() => {
        console.log("Connected to SignalR");
        return conn.invoke("JoinRoom", roomId);
      })
      .then(() => {
        setConnection(conn);
        console.log(`Joined room: ${roomId}`);
      })
      .catch(err => console.error("SignalR Connection Error: ", err));

    conn.on("ReceiveMessage", (message) => {
      console.log("Received message:", message);
      setMessages(prev => [...prev, message]);
    });

    conn.on("StreamStarted",(videoLink)=>{
      setVideoLink(videoLink);
      setIsPlaying(true);
    })
    
    
    conn.on("SyncVideo", (currentTime : number, isPaused: boolean) => {
        if(ReactPlayerRef.current){
          const playerTime = ReactPlayerRef.current.getCurrentTime();
          const drift = Math.abs(playerTime - currentTime);
          
          if (drift > 1) {
            ReactPlayerRef.current.seekTo(currentTime, "seconds");
          }
          
          setIsPlaying(!isPaused);
        }
      }
    );
    
    conn.on("UpdateVideo", (currentTime : number, isPaused:boolean) => {
        if(ReactPlayerRef.current){
          const playerTime = ReactPlayerRef.current.getCurrentTime();
          const drift = Math.abs(playerTime - currentTime);
    
          if (drift > 1) {
            ReactPlayerRef.current.seekTo(currentTime, "seconds");
          }
    
          setIsPlaying(!isPaused);
        }
      }
    );
    

    conn.onreconnected(async () => {
      await conn.invoke("JoinRoom", roomId);
      console.log("Rejoined room after reconnect");
    });

    // Cleanup
    return () => {
      conn.off("ReceiveMessage");
      conn.off("StreamStarted");
      conn.off("SyncVideo");
      conn.off("UpdateVideo");
      conn.stop();
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`${API_CHAT}/chat/${roomId}`);
        if (response.data.isSuccess) {
          setMessages(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [roomId]);

  const sendMessage = async (content: string) => {
    try {
      const response = await axiosInstance.post(`${API_CHAT}/chat`, {
        content,
        roomId,
      });
      
      if (response.data.isSuccess) {
        console.log("Message sent successfully");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };
  
  const sendVideo = async (videoLink : string) =>{
    if (!videoLink.trim()) {
      console.error("Video URL is empty. Please provide a valid URL.");
      return;
    }
    connection &&
    connection
    .invoke("StartStream", roomId, videoLink)
    .catch((err) => console.error("Failed to start stream: ", err));
  }
  
  const handleStateChange = (status : boolean) => {
      if(ReactPlayerRef.current && connection){
        const currentTime = ReactPlayerRef.current.getCurrentTime();
        connection
          .invoke("UpdateVideoState", roomId, currentTime, status)
          .catch((err) => console.error("Failed to update state:", err));
        setIsPlaying(status)
        console.log("status Now : " , status);
        
      }
  };



  const handleSeek = (seconds : any) => {
    if(connection){
      connection
      .invoke("UpdateVideoState", roomId, seconds, !IsPlaying)
      .catch((err) => console.error("Failed to update seek state:", err));
    }
  };
  
  return { messages, sendMessage, connection , videoLink , sendVideo, IsPlaying , setIsPlaying ,ReactPlayerRef , handleStateChange , handleSeek };
};