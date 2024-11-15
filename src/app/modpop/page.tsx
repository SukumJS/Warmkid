// page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  handlePopClick,
  getScore,
  checkCoookie,
} from "@/serverAction/serverAction";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function App() {
  const [count, addCount] = useState<number>(0);
  const [isClicked, setClick] = useState(false);
  const countRef = useRef<number>(0);
  const [isLoading, setLoading] = useState(true);

  function AddCounter() {
    setClick(true);
    addCount((prevCount) => {
      const newCount = prevCount + 1 - 0;
      countRef.current = newCount;
      return newCount;
    });
    setTimeout(() => {
      setClick(false);
    }, 75);
  }

  useEffect(() => {
    async function fetchScore() {
      setLoading(true);
      const initialScore = parseInt(await getScore());
      setLoading(false);
      addCount(initialScore);
      countRef.current = initialScore;
    }
    fetchScore();
  }, []);

  useEffect(() => {
    async function getCookie() {
      const isCookie = await checkCoookie();
      if (!isCookie) redirect("/");
    }
    getCookie();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      handlePopClick(countRef.current);
      console.log(countRef.current);
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg w-screen h-screen py-10 px-5 flex flex-col">
      <div className="flex justify-center">
        <Image
          src="/img/logoGame2.svg"
          alt="logoG2"
          width={300}
          height={300}
          className="mb-6"
        />
      </div>

      <div className="flex flex-grow items-center justify-center text-center text-white">
        {!isLoading && (
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
        )}
      </div>
    </div>
  );
}
