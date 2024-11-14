"use client";
import { useState, useEffect } from "react";

const Admin = () => {
  const [gameone, setGameone] = useState<boolean>(false);
  const [modpop, setModpop] = useState<boolean>(false);

  const getStatus = async () => {
    await fetch("/api/settinggame").then(async (res) => {
      const data = await res.json();
      setGameone(data.gamesone);
      setModpop(data.modpop);
    });
  };

  const handleGame = async (gameID: string, status: boolean) => {
    try {
      await fetch(`/api/settinggame/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: gameID, status: `${!status}` }),
      }).then(async (res) => {
        const data = await res.json();
        setGameone(data.gameone);
        setModpop(data.modpop);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatus();
  });

  console.log(gameone, modpop);
  

  const gameoneID = "6736619fbfc593a5672b5dbc";
  const modpopID = "673661c2bfc593a5672b5dc1";

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-y-10">
          <button
            onClick={() => handleGame(gameoneID, gameone)}
            className={
              gameone
                ? `bg-blue-500 text-white font-bold py-2 px-4 rounded`
                : `bg-red-500 text-white font-bold py-2 px-4 rounded`
            }
          >
            Game One
          </button>
          <button
            onClick={() => handleGame(modpopID, modpop)}
            className={
              modpop
                ? `bg-blue-500 text-white font-bold py-2 px-4 rounded`
                : `bg-red-500 text-white font-bold py-2 px-4 rounded`
            }
          >
            Mod POP
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
