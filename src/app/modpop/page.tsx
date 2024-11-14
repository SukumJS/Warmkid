// page.tsx
"use client";

import { useEffect, useState } from "react";
import { handlePopClick, getScore , checkCoookie } from '@/serverAction';
import Image from "next/image";
import { redirect } from 'next/navigation'

export default function App() {
    const [count, addCount] = useState(0);
    const [isClicked, setClick] = useState(false);

    function AddCounter() {
        handlePopClick();
        setClick(true);
        addCount((count) => count + 1);
        setTimeout(() => {
            setClick(false);
        }, 75);
    };

    useEffect(() => {
        async function fetchScore() {
            const initialScore = await getScore();
            addCount(initialScore);
        }
        fetchScore();
    }, []);

    useEffect(() => {
        async function getCookie() {
            const isCookie = await checkCoookie();
            if(!isCookie)redirect('/')
        }
        getCookie();
    }, []);

    return (
        <div className="bg w-screen h-screen py-10 px-5 flex flex-col">
            <div className="flex justify-center">
                <Image src="/img/logoGame2.svg" alt="logoG2" width={300} height={300} className="mb-6" />
            </div>
    
            <div className="flex flex-grow items-center justify-center text-center text-white">
                <div>
                    <div className="font-bold text-6xl mb-6">POPMOD</div>
                    <div className="flex justify-center items-center mb-6">
                        <button onClick={AddCounter}>
                            <Image
                                src={isClicked ? "/img/mod2.png" : "/img/mod1.png"}
                                alt="mod"
                                width={500}
                                height={500}
                            />
                        </button>
                    </div>
                    <div className="font-bold text-6xl">{count} Point!</div>
                </div>
            </div>
    </div>
    
    );
}