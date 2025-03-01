"use client";
import React, { useEffect, useState, createContext, useContext, useLayoutEffect } from 'react';
import axiosInstance from '../axiosInstance';

const loginContext = createContext({} as any);

export const LoginProvider = ({ children }: { children: any }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userName , setUserName ] = useState<string | null>(null);
    const [avatar , setAvatar ] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserName = localStorage.getItem("username") ;
        const storedAvatar = localStorage.getItem("avatar") ;
        if (storedToken && storedUserName && storedAvatar) {
            setToken(storedToken);
            setUserName(storedUserName) ;
            setAvatar(storedAvatar);
        }
    }, []);


    useLayoutEffect(()=>{
        if (token) {
            axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
        }
    },[token])


    const refreshToken = async () => {
        try {
            const response = await axiosInstance.get("/auth/refreshToken");
            const newToken = response.data.token;

            localStorage.setItem("token", newToken);
            setToken(newToken);

            return newToken;
        } catch (error) {
            console.error("Failed to refresh token", error);
            logout();
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/login";
    };

    return (
        <loginContext.Provider value={{ token, setToken, refreshToken, logout,userName , setUserName ,avatar , setAvatar}}>
            {children}
        </loginContext.Provider>
    );
};

export const useLogin = () => {
    return useContext(loginContext);
};
