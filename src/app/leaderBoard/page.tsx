"use client";

import { useState, useEffect } from "react";
import { getLeaderboard } from "@/serverAction/serverAction";
import Image from "next/image";

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
    <div className="bg min-h-screen h-auto flex items-center justify-center py-10 px-5 flex-col">
      <Image src="/img/logoScoreBoard.svg" alt="logoLeaderBoard" width={300} height={300} className="mb-4"></Image>
      <table className="w-full max-w-xs bg-white rounded-lg shadow-md text-black p-4">
        <thead>
          <tr className="bg-blue-500 text-white font-semibold rounded-t-lg">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-gray-50 hover:bg-blue-100">
              <td className="p-3">{entry.user}</td>
              <td className="p-3">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
