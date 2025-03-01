"use client"
import React from 'react'
import Center from '../components/Center'
import { Input } from '@/components/ui/input'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
  const formSchema = z.object({
      RoomName: z.string().min(1, "First name is required"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(formSchema),
    });
  
    const onSubmit = async (data : any) => {
      try{
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}/Room/new` , {
          roomName : data.RoomName
        })

        toast.success("room created")
        router.push(`/rooms/${response.data.result.roomId}`)
      } 
      catch(error){
        throw Error("Create Error : " + error)
      }
    };

  return (
    <Center className="relative z-10 min-h-[100vh]">
      <div className="flex flex-col gap-4 items-center text-white w-[60%]">
          <h1 className="textGradient text-5xl ">Sync Space</h1>
          <p className="text-white ">create room </p>
          <form
          onSubmit={handleSubmit(onSubmit)}
          className=" max-w-xl mx-auto p-8 space-y-4 border rounded-lg shadow w-full "
          >

            <div>
                <label className="block text-sm font-medium mb-2"> room name </label>
                <Input
                type="text"
                {...register("RoomName")}
                placeholder="Enter room name"
                />
                {errors?.RoomName?.message && (
                    <p className="text-red-500 text-sm">{(errors.RoomName.message) as string}</p>
                )}
            </div>

            <div className="flex justify-around gap-4">
                <Button type="submit" className="BGGradient ">
                    create
                </Button>
                <Button type="button" variant={"outline"} className="bg-transparent text-white">
                    <Link href={"/joinRoom"}>join room</Link>
                </Button>
            </div>
          </form>
      </div>
  </Center>
  )
}

export default page
