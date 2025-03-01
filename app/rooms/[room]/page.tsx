"use client"
import Center from '@/app/components/Center'
import { Copy , Send } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import img from "@/public/movie.png"
import Message from '@/app/components/Message'
import { toast } from 'react-toastify'
import axiosInstance from '@/app/axiosInstance'
import { Skeleton } from '@/components/ui/skeleton'
import { use } from "react";
import { useLogin } from '@/app/contexts/LoginProvider'
import { useSignalR } from '@/app/hooks/useSignalR'
import ReactPlayer from "react-player";
import { useParams } from 'next/navigation'


interface Room{
  roomId : string , 
  roomName : string ,
  roomParticipants : string[] ;
}
const API = process.env.NEXT_PUBLIC_API ;

const page = () => {
  const { room } = useParams<{ room: string }>();
  const {username} = useLogin() ;
  const [RoomDetails , setRoomDetails ] = useState<Room >({roomId : "" ,  roomName :"", roomParticipants:[]}); 
  const [Link , setLink] = useState<string>("") ; 
  const [inputMessage , setInputMessage] = useState("") ;
  const [PageMeassages , setPageMeassages] = useState<string[]>([]);
  useEffect(()=>{
    FetchRoom() ;
  },[])

  
  const FetchRoom = async () =>{
    const response = await axiosInstance.get(`${API}/room/${room}`);
    setRoomDetails(response.data.result)
  }
  const { messages, sendMessage ,videoLink , sendVideo , IsPlaying } = useSignalR(room);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <>
      <div className='h-8 px-5 flex items-center text-white justify-between'>
        <div className='flex items-center gap-3'>
          <span>Room Name : </span>
          <span>{RoomDetails.roomName || <Skeleton className='w-24 h-4 bg-white/50'/>}</span>
        </div>

        <div className='flex items-center gap-3'>
          <span>Room ID :</span>
          <span>{room}</span>
          <Copy onClick={()=>{
            navigator.clipboard.writeText(room).then(
              ()=>{toast.success("Copied to clipboard!")}
            )
          }}/>
        </div>
      </div>
      
      <div className='px-5 flex items-center justify-center mt-4 text-white'>
        <input type="text"
        className='w-[50%] bg-transparent py-1 border-2 border-r-0 border-white outline-none rounded-l-md'
        onChange={(e)=>{setLink(e.target.value)}}
        />
        <button className='BGGradient px-6 py-1 border-white border-2 border-l-0 rounded-r-md' onClick={()=>{sendVideo(Link)}} > Play</button>
      </div>

      <Center className=' md:h-[85vh] px-4 py-8 flex flex-col md:flex-row items-center gap-4 justify-around' col={false}>
          {/* video container */}
          <div className='w-[100%] h-[30vh] md:w-[60%] md:h-full bg-black rounded-lg'>
            <ReactPlayer
              url={videoLink || ""}
              playing={IsPlaying}
              width="100%"
              height="100%"
              controls
            />
          </div>
          <div className='h-[50vh] w-full md:w-[35%] py-2 md:h-full bg-black/50 rounded-lg'>
            <div ref={containerRef} className="w-full px-2 space-y-2 h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                {
                  messages?.map((message , i)=>{
                  message.content
                  message.user.userName;
                  const updatedAvatar = message.user.avatar.split("favatars\\").pop();
                  const finalAvatar = updatedAvatar&&(process.env.NEXT_PUBLIC_MAINDOMAIN + "/favatars/" + updatedAvatar)
                  return(
                      <Message 
                        key={i}
                        img={finalAvatar}
                        name={message.user.userName}
                        message={message.content}
                        user={localStorage.getItem("username")===message.user.userName}
                        />
                    )
                })
                }
              </div>
              
              <div className=' w-full h-[10%] flex text-white items-center justify-center'>
                <input value={inputMessage} onChange={(e)=>{setInputMessage(e.target.value)}} type="text" className='px-1 bg-transparent border w-[85%] rounded-l-xl outline-none'/>
                <button onClick={()=>{
                  sendMessage(inputMessage)
                }} className='border border-gray-600 rounded-r-xl w-[10%] flex justify-center bg-gray-600'>
                  <Send className='w-5'/>
                </button>
              </div>
          </div>
      </Center>
    </>
  )
}

export default page
