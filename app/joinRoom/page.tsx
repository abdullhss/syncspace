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
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';

const API = process.env.NEXT_PUBLIC_API ;


const page = () => {
  
  const formSchema = z.object({
    id: z.string().min(1, "room id is required"),
  });
  type FormData = z.infer<typeof formSchema>;

  const router = useRouter() ; 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
    
    const onSubmit: SubmitHandler<FormData> = async (data) => {
      const target = `${API}/Room/${data.id}/join`
      try{
        const response = await axiosInstance.post(target , {
          "connectionId": data.id
        })
        toast.success(response.data.result)
        router.push(`/rooms/${data.id}`)
      
      }
      catch(error : any){
        toast.error(error.response.data.errors[0])
      }
    };

  return (
    <Center className="relative z-10 min-h-[100vh]">
      <div className="flex flex-col gap-4 items-center text-white w-[60%]">
          <h1 className="textGradient text-5xl ">Sync Space</h1>
          <p className="text-white ">join existing room </p>
          <form
          onSubmit={handleSubmit(onSubmit)}
          className=" max-w-xl mx-auto p-8 space-y-4 border rounded-lg shadow w-full "
          >

          <div>
              <label className="block text-sm font-medium mb-2"> room Id :</label>
              <Input
              type="text"
              {...register("id")}
              placeholder="Enter room id"
              />
              {errors?.id?.message && (
                  <p className="text-red-500 text-sm">{(errors.id.message) as string}</p>
              )}
          </div>

          <div className="flex justify-around gap-4">
              <Button type="submit" className="BGGradient opacity-100">
                  join now !
              </Button>
              <Button type="button" variant={"outline"} className="bg-transparent text-white">
                  <Link href={"/createRoom"}>create room</Link>
              </Button>
          </div>
          </form>
      </div>
  </Center>
  )
}

export default page
