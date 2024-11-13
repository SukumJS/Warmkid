"use client";

import { useState, useEffect } from "react";
import { getLeaderboard } from "@/serverAction";

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
    <div className="bg w-screen h-screen content-center">
      <table className="flex justify-self-center bg-white rounded text-black p-3">
        <tbody>
          <tr className="font-bold border-b-2 border-black">
            <td>Name</td>
            <td>Score</td>
          </tr>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.user}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
