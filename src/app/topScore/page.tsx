"use client";

import { useState, useEffect } from "react";
import { getLeaderboard } from "@/serverAction/serverAction";

export default function App() {
  const [leaderboard, setLeaderboard] = useState<
    { user: string; score: number }[]
  >([]);

  useEffect(() => {
    async function fetchUserScore() {
      const initialScore = await getLeaderboard();
      setLeaderboard(initialScore);
    }
    fetchUserScore();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const totalScore = await getLeaderboard();
      setLeaderboard(totalScore);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" min-h-screen h-auto flex items-center justify-center py-10 px-5 flex-col bg-green-500">
      <tbody>
        {leaderboard.map((entry, index) => {
          if (index > 2) return;
          return (
            <tr key={index} className="text-9xl text-white font-bold">
              <td className="p-3 col-span-3">{entry.user}</td>
              <td className="p-3">{entry.score}</td>
            </tr>
          );
        })}
      </tbody>
    </div>
  );
}
