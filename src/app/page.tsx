"use client";

import React, { useState , useEffect } from "react";
import { addUser , checkCoookie } from "@/serverAction";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const[cookie , setCookie] = useState(false);

  useEffect(() => {
    async function getCookie() {
      const isCookie = await checkCoookie();
      if(isCookie)setCookie(true);
    }
   getCookie();
   }, []);

  if(!cookie){
    return (
      <>
        <div className="bg w-screen h-screen py-10 px-5 justify-items-center relative"> 
          <Image src="/img/logoWarmkids.svg" alt="" width={500} height={500} className="mb-4"/>
          <form action={addUser} className="text-xl">
            <input type="name" name="name" placeholder="Enter name" className="mr-2 text-black px-1 rounded"/>
            <button className="bg-green-400 text-white px-1 rounded">submit</button>
          </form>
          <Image src="/img/logobottom.svg" alt="" width={500} height={500} className="absolute bottom-0 left-1/2 transform -translate-x-1/2"/>
        </div>
      </>
    );
  } else {
    return(
      <>
      <div className="bg w-screen h-screen py-10 px-5 flex-col justify-items-center"> 
        <Image src="/img/logoWarmkids.svg" alt="" width={500} height={500} className="mb-4" />
        <Link href={"/gameone"}><Image src="/img/gameone8.svg" alt="logoG1" width={300} height={300} className="mb-6" /></Link>
        <Link href={"/modpop"}><Image src="/img/logoGame2.svg" alt="logoG2" width={300} height={300} className="mb-6" /></Link>
        <Image src="/img/logobottom.svg" alt="" width={500} height={500} className="absolute bottom-0 left-1/2 transform -translate-x-1/2"/>
      </div>
      </>
    );
  }
  
}
