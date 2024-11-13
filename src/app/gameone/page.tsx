"use client";

import React, { useState, createContext } from "react";
import data from "@/../data.json";
import Image from "next/image";
import Logo from "./../../../public/gameone8.svg";
import PropQuizz from "../../../components/PropQuizz";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

interface QuizzContextType {
  currentQuizz: number[];
  quizzs: IQuizz[];
  paginate: void;
  currentPage: number;
  setAnswer: React.Dispatch<React.SetStateAction<boolean[]>>;
  totalQuizz: number;
  quizzperPage: number;
  answer: boolean[];
}


interface Ichoice {
  id: number;
  url: string;
  isCorrect: boolean;
}

interface IQuizz {
  id: number;
  question: string;
  choices: Ichoice[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QuizzContext = createContext<any>({});

const GameOne = () => {
  const { quizzs } = data;
  const [answer, setAnswer] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quizzperPage] = useState<number>(1);
  const indexOfLastQuizz = currentPage * quizzperPage;
  const indexOfFirstQuizz = indexOfLastQuizz - quizzperPage;
  const currentQuizz = quizzs.slice(indexOfFirstQuizz, indexOfLastQuizz);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const QuizzContextValue = {
    currentQuizz,
    quizzs,
    paginate,
    currentPage,
    setAnswer,
    totalQuizz: quizzs.length,
    quizzperPage,
    answer,
  };


  return (
    <>
      <div className="flex justify-center my-auto py-10">
        <div className="text-center font-bold">
          <Image src={Logo} alt="Logo" />
          <div className="my-auto py-5 text-xl">
            <h1>WHICH IS A</h1>
            <h1>&quot; AI GENERATED IMAGE&quot;</h1>
          </div>
          <QuizzContext.Provider value={QuizzContextValue}>
            <PropQuizz />
          </QuizzContext.Provider>
        </div>
      </div>
    </>
  );
};

export default GameOne;
