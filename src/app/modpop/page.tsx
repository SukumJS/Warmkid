"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function App() {
    const [count , addCount] = useState(0);

    function AddCouter(){
        addCount((count) => count + 1);
    };
    return (
        <>
        <body className="bg-violet-950">
            <Image src="/img/BlueBTN.png" alt="" width={150} height={50} className="justify-self-lesf"/>
            <center className="flex-col justify-between">
                <h1 className="font-bold text-4xl">POPMOD</h1>
                <button onClick={AddCouter}><Image src="/img/ModType.png" alt="" width={300} height={300} className="justify-self-center"/></button>
                <h1 className="font-bold text-4xl">{count} Point!</h1>
            </center>
        </body>
        </>
    );
}