"use client";

import { useState, useEffect } from "react";
import { getModPopTotalScore } from "@/serverAction/serverAction";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getScore = setInterval(async () => {
      const totalScore = await getModPopTotalScore();
      setCount(totalScore);
    }, 50);
    return () => clearInterval(getScore);
  }, []);

  return (
    <>
      <div className="bg-green-500 w-screen h-screen content-center">
        <div>
          <div className="font-bold text-9xl flex justify-self-center text-white mb-4">
            {count}
          </div>
        </div>
      </div>
    </>
  );
}
