"use client";
import React from "react";
import Image from "next/image";
import signupBG from "@/public/signup.avif"
import Center from "@/app/components/Center";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import Footer from "../components/Footer";
import { useLogin } from "../contexts/LoginProvider";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import axiosInstance from "../axiosInstance";
export default function page() {
    const {setToken,setUserName ,setAvatar} = useLogin() 
    const router = useRouter()

    const formSchema = z.object({
        Email: z.string().email("enter Valid email") ,
        password: z.string().min(8, "Password must be at least 8 characters with spial charcter , capital and small"),
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(formSchema),
      });
    
      const onSubmit = async (data : any) => {
        console.log("Form Data:", data);
        
        const dataToBeSent = {
            "email": data.Email,
            "password": data.password
          }
          await axiosInstance
          .post(`${process.env.NEXT_PUBLIC_API}/auth/login`, dataToBeSent)
          .then((response) => {
            toast.success("Success log in!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            console.log(response.data.result);
            console.log(response.data.result.token);
            
            setToken(response.data.result.token);
            localStorage.setItem("token" , response.data.result.token)
            
            setUserName(response.data.result.username)
            localStorage.setItem("username" , response.data.result.username)
            
            setAvatar(response.data.result.avatar) 
            localStorage.setItem("avatar" , response.data.result.avatar)
            
            router.push("/home")
          })
          .catch((error) => {
            console.log(error.response.data.errors[0]);
            
            toast.error("Email or password is not correct", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setToken(null);
          });
        
      };
  return (
    <div
    style={{
        backgroundImage: `url(${signupBG.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        position: "relative",
    }}
    className=""
    >
    <div
        style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        }}
    ></div>

    <Center className="relative z-10 min-h-screen">
        <div className="flex flex-col gap-4 items-center text-white w-[70%] md:w-[60%]">
            <h1 className="textGradient text-5xl text-nowrap">Sync Space</h1>
            <p className="text-white ">Login Now </p>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className=" max-w-xl mx-auto p-8 space-y-4 border rounded-lg shadow w-full "
            >

            {/* Email */}
            <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                type="email"
                {...register("Email")}
                placeholder="Enter Email"
                />
                {errors?.Email?.message && (
                    <p className="text-red-500 text-sm">{(errors.Email.message) as string}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                type="password"
                {...register("password")}
                placeholder="Enter password"
                />
                {errors?.password?.message && (
                    <p className="text-red-500 text-sm">{(errors.password.message) as string}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-around gap-4">
                <Button type="submit" className="BGGradient opacity-100">
                    login
                </Button>
                <Button type="button" variant={"outline"} className="bg-transparent text-white">
                    <Link href={"/signup"}>Register</Link>
                </Button>
            </div>
            </form>
        </div>
    </Center>
    </div>
  );
}
