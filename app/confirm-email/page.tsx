"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, Suspense } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const ConfirmEmailContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");

    useEffect(() => {
        if (!userId || !code) return;

        axiosInstance.get(`${process.env.NEXT_PUBLIC_API}/auth/confirmEmail?UserId=${userId}&Code=${code}`)
            .then(() => {
                toast.success("Email activated!");
                router.push("/login"); // 🔥 استخدم useRouter بدل redirect()
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId, code, router]);

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Loader className='w-8 h-8 animate-spin'/>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<div className='min-h-screen flex items-center justify-center'> <Loader className='w-8 h-8 animate-spin'/> </div>}>
            <ConfirmEmailContent />
        </Suspense>
    );
};

export default Page;
