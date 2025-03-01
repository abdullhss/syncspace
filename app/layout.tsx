"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from 'next/font/google';
import bg from "@/public/backgound.avif";
import Header from "./components/Header";
import { usePathname } from 'next/navigation';
import Footer from "./components/Footer";
import { LoginProvider } from "./contexts/LoginProvider";
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/ReactToastify.css"
import { ToastContainer } from 'react-toastify';
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
  variable: '--font-poppins',
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/signup", "/"];

  if (noLayoutRoutes.includes(pathname)) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} antialiased`}>
            <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false} 
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover={false}
            theme="dark"/>
          <LoginProvider>
            <CustomCursor/>
            {children}
            <Footer/>
          </LoginProvider>

        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>

        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          ></div>
          <div className="relative z-10 min-h-screen">
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false} 
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover={false}
              theme="dark"/>
            <LoginProvider>
            <CustomCursor/>

              <Header />
              {children}
              <Footer/>
            </LoginProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
