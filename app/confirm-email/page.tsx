"use client"
import { redirect, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const Page = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");

    console.log(userId, code);
    
    useEffect(() => {
        if (!userId || !code) return;

        axiosInstance.get(`${process.env.NEXT_PUBLIC_API}/auth/confirmEmail?UserId=${userId}&Code=${code}`)
            .then(() => {
                toast.success("Email activated!");
                redirect("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId, code]);

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <h1 className='text-white'>testtttttttt</h1>
            <Loader className='text-white bg-white w-8 h-8 animate-spin'/>
        </div>
    );
}

export default Page;
