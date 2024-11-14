"use client";

import React, { useState , useEffect } from "react";
import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import PropQuizz from "@/components/PropQuizz";
import { checkCoookie } from '@/serverAction';
import { redirect } from 'next/navigation'

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

  useEffect(() => {
    async function getCookie() {
        const isCookie = await checkCoookie();
        if(!isCookie)redirect('/')
    }
    getCookie();
  }, []);

  return (
    <>
      <div className="bg w-screen min-h-screen h-auto py-10 px-5">
      <div className="text-center font-bold text-white">
      <Image src="/img/gameone8.svg" alt="Logo" width={300} height={300} className="flex justify-self-center mb-4"/>
          {score != -1 ? (
            <div>
              <div className="flex-row">
              <h1 className="font-bold text-3xl text-white">You recived : {score} points!</h1>
              <Image src="/img/modwelcome.png" alt="modwelcome" width={500} height={500} className="justify-self-center"/>
              <Link href="/"><Image src="/img/gobackbtn.svg" alt="" width={300} height={300} className="justify-self-center"/></Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="my-auto py-5 text-2xl">
                <h1>WHICH IS A</h1>
                <h1>&quot; AI GENERATED IMAGE&quot;</h1>
              </div>
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GameOne;
