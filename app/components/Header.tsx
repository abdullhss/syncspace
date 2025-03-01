"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img from "@/public/movie.png"
import { useLogin } from '../contexts/LoginProvider'
import { Skeleton } from "@/components/ui/skeleton"

const Header = () => {
  const {userName , avatar} = useLogin() 
  const updatedAvatar = avatar?.split("favatars\\").pop();

  const finalAvatar = updatedAvatar&&(process.env.NEXT_PUBLIC_MAINDOMAIN + "/favatars/" + updatedAvatar)

  return (
    <header className='flex items-center justify-between px-12  text-white py-4 z-10'>
        <h1 className='textGradient text-2xl'>Sync Space</h1>
        <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <p> hello { userName ||<Skeleton className="h-4 w-[120px] bg-white/50"/>} </p>
              <div className='w-12 h-12 rounded-full flex items-center justify-center'>
              {
                avatar?
                  <Image src={finalAvatar || img.src} alt='user photo' width={50} height={50} className='w-full h-full rounded-full'/>
                  : <Skeleton className='w-12 h-12 bg-white/50 rounded-full'/>
              }
              </div>
            </div>
        </div>
    </header>
  )
}

export default Header