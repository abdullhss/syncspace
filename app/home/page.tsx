"use client"
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Center from '../components/Center';
import Link from 'next/link';
import Image from 'next/image';
import movieImge from '@/public/movie.png';
import { Button } from '@/components/ui/button';
import axiosInstance from '../axiosInstance';

interface Room{
    roomId : string , 
    roomName : string ,
    roomParticipants : string[] ;
}
const API =  process.env.NEXT_PUBLIC_API
const page = () => {
    const [rooms , setRooms] = useState<Room[]>([]);
    useEffect(()=>{
        fetchRooms() ; 
    },[])

    const fetchRooms = async ()=>{
        const response = await axiosInstance.get(`${API}/room/user`);
        setRooms(response.data.result);
    }
    console.log(rooms);
    return (
        <Center className="px-[10vw] w-full min-h-[80vh]">
        <div className='flex flex-col md:flex-row mt-12'>
            <div className='text-white flex flex-col gap-6'>
            <h1 className='text-4xl font-bold'>Watch And Get New <br/> Friends With,</h1>
            <h2 className='textGradient text-4xl text-nowrap w-[80%] md:w-[50%]'>Sync Space</h2>
            <p className='w-[60%]'>
                Make friends while watching! Host or join virtual watch parties, connect with like-minded individuals, and enjoy the shared experience of watching your favorite shows, movies, or sports.
            </p>
            <div className='flex gap-12 items-center'>
                <Button className='BGGradient'>
                <Link href={'/createRoom'}>Create Room</Link>
                </Button>
                <Button className='bg-transparent border'>
                <Link href={'/joinRoom'}>Join Room</Link>
                </Button>
            </div>
            </div>
            <div>
            <Image alt='movie Image' width={800} height={800} src={movieImge} />
            </div>
        </div>
        
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-fuchsia-600 pr-2'>
            {rooms.map((room, index) => (
            <div key={index} className='flex flex-col gap-2 p-4 rounded-2xl shadow-lg text-white bg-gradient-to-r from-indigo-700/60 to-blue-700/60'>
                <p className='font-semibold text-lg'>Room Name : {room.roomName}</p>
                <p className='text-sm text-gray-200 break-all'>Room ID: {room.roomId}</p>
                <p className='text-sm text-gray-200 break-all'>Participants : {room.roomParticipants.length}</p>
                    <Link href={`/rooms/${room.roomId}`}>
                        <Button className='mt-4 BGGradient w-full'>
                            Join
                        </Button>
                    </Link>
        </div>
            ))}
        </div>
        </Center>
    );
};

export default page;