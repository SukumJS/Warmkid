"use client";

import { useState, useEffect } from "react";
import { getTotalScore } from "@/serverAction";
import Image from "next/image";

export default function App() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(false);

  useEffect(() => {
    const getScore = setInterval(async () => {
      const totalScore = await getTotalScore();
      if (totalScore >= 1000) setGoal(true);
      setCount(totalScore);
    }, 50);
    return () => clearInterval(getScore);
  }, []);

  return (
    <>
      <div className="bg w-screen h-screen content-center">
        <div>
          <div className="font-bold text-4xl flex justify-self-center">
            Total Score : {count}
          </div>
          <Image
            src={goal ? "/img/modwelcome.png" : "/img/modplussign.png"}
            className="flex justify-self-center"
            alt=""
            width={500}
            height={500}
          ></Image>
        </div>
      </div>
    </>
  );
}
