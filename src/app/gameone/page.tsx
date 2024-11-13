"use client";

import React, { useState } from "react";
import data from "@/data.json";
import Image from "next/image";
import Logo from "./../../../public/gameone8.svg";
import PropQuizz from "@/components/PropQuizz";

const GameOne = () => {
  const { quizzs } = data;
  const [score, setScore] = useState<number>(-1);
  const [answer, setAnswer] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quizzperPage] = useState<number>(1);
  const indexOfLastQuizz = currentPage * quizzperPage;
  const indexOfFirstQuizz = indexOfLastQuizz - quizzperPage;
  const currentQuizz = quizzs.slice(indexOfFirstQuizz, indexOfLastQuizz);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="bg w-auto h-auto py-10 px-5">
        <div className="text-center font-bold">
          <Image
            src={Logo}
            alt="Logo"
            width={300}
            height={300}
            className="flex justify-self-center"
          />
          <div className="my-auto py-5 text-2xl text-white">
            <h1>WHICH IS A</h1>
            <h1>&quot; AI GENERATED IMAGE&quot;</h1>
          </div>
          {score != -1 ? (
            <h1>{score}</h1>
          ) : (
            <PropQuizz
              currentQuizz={currentQuizz}
              quizzs={quizzs}
              paginate={paginate}
              currentPage={currentPage}
              setAnswer={setAnswer}
              totalQuizz={quizzs.length}
              quizzperPage={quizzperPage}
              answer={answer}
              setScore={setScore}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GameOne;
