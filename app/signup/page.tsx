"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import signupBG from "@/public/signup.avif"
import Center from "@/app/components/Center";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
export default function page() {

    const formSchema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        Email: z.string().email("enter valid email"),
        password:z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[\W_]/, "Password must contain at least one special character")
    });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(formSchema),
      });
    
      const onSubmit = async (data : any) => {
            console.log(data);
            
            const dataToBeSent = {
                "userName": data.firstName + "_" + data.lastName ,
                "email": data.Email ,
                "password": data.password 
            }
            
            await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}/auth/register` ,dataToBeSent )
            .then((response) => {
                toast.success("Account created check your Email", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
            .catch((error) => {
                toast.error("there is problem Now try later", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
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
            <p className="text-white ">Register Now</p>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto p-8 space-y-4 border rounded-lg shadow"
            >
            {/* First Name and Last Name */}
            <div className="flex gap-4">
                <div className="w-1/2">
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input
                    type="text"
                    {...register("firstName")}
                    placeholder="Enter first name"
                />
                {errors?.firstName?.message && (
                    <p className="text-red-500 text-sm">{(errors.firstName.message) as string}</p>
                )}
                </div>
                <div className="w-1/2">
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input
                    type="text"
                    {...register("lastName")}
                    placeholder="Enter last name"
                />
                {errors?.lastName?.message && (
                    <p className="text-red-500 text-sm">{(errors.lastName.message) as string}</p>
                )}
                </div>
            </div>

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
                <Button type="submit" className={`BGGradient hover:opacity-100`}>
                    Register
                </Button>
                <Button type="button" variant={"outline"} className="bg-transparent text-white">
                    <Link href={"/login"}>Login</Link>
                </Button>
            </div>
            </form>
        </div>
    </Center>

    </div>
  );
}
