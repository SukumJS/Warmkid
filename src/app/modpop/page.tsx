// page.tsx
"use client";

import { useEffect, useState } from "react";
import { handlePopClick, getScore } from '@/serverAction';
import Image from "next/image";

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

    return (
        <div className="bg w-screen h-screen content-center">
            <div>
                <div className="font-bold text-4xl flex justify-self-center">POPMOD</div>
                <div className="flex items-center flex justify-self-center">
                    <button onClick={AddCounter}>
                        <Image
                            src={isClicked ? "/img/mod2.png" : "/img/mod1.png"}
                            alt="mod"
                            width={300}
                            height={300}
                            className="flex justify-self-center"
                        />
                    </button>
                </div>
                <div className="font-bold text-4xl flex justify-self-center">{count} Point!</div>
            </div>
        </div>
    );
}