// page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  handleModPopClick,
  getPopModScore,
  checkCoookie,
  getGameSettings,
} from "@/serverAction/serverAction";
import Image from "next/image";
import { redirect } from "next/navigation";
export default function App() {
  const [count, addCount] = useState<number>(0);
  const [isClicked, setClick] = useState(false);
  const countRef = useRef<number>(0);
  const [isLoading, setLoading] = useState(true);
  const [isDisabled, setDisabled] = useState(false);

  function AddCounter() {
    if (isDisabled) return;
    setClick(true);
    setDisabled(true);
    setTimeout(() => {
      addCount((prevCount) => {
        const newCount = prevCount + 1;
        countRef.current = newCount;
        return newCount;
      });
      setClick(false);
      setDisabled(false);
    }, 60);
  }

  useEffect(() => {
    async function fetchScore() {
      setLoading(true);
      const initialScore = parseInt(await getPopModScore());
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
    const fetchSettings = async () => {
      const data = await getGameSettings();
      if (!data.modpop) {
        console.log("modpop is disabled");
        redirect("/");
      }
    };
    const interval = setInterval(() => {
      fetchSettings();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleModPopClick(countRef.current);
    }, 2000);

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
            <div className="font-bold text-6xl mb-6">MODPOP</div>
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
