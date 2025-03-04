"use client"
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { error } from 'console';

const page = () => {
    const { userId ,code } = useParams<{ userId:string , code:string }>();

    console.log(userId , code);
    
    useEffect(()=>{
        axiosInstance.get(`${process.env.NEXT_PUBLIC_API}/auth/confirmEmail?UserId=${userId}&Code=${code}`).then(()=>{
            toast.success("email activated !")
        }).catch((error)=>{
            console.log(error);
        })
    })
  return (
    <div>
      
    </div>
  )
}

export default page
