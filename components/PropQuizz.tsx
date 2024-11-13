import React, { useContext, useEffect } from "react";
import { QuizzContext } from "../src/app/gameone/page";
import Image from "next/image";
import { handleAnswerSubmit } from "@/serverAction";

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

const PropQuizz = () => {
  const {
    currentQuizz,
    setAnswer,
    totalQuizz,
    quizzperPage,
    paginate,
    currentPage,
    answer,
  } = useContext(QuizzContext);

  const quizz: IQuizz[] = currentQuizz;

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalQuizz / quizzperPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextQuizz = () => {
    pageNumbers.map(async (number) => {
      if (currentPage === number) {
        paginate(number + 1);
      }
    });
  };
  useEffect(() => {
    console.log("answer", answer);
    if (answer.length === totalQuizz) {
      handleAnswerSubmit(answer);
    }
  }, [answer]);

  const handleAnswer = async (isCorrect: boolean) => {
    await setAnswer((prev: boolean[]) => [...prev, isCorrect]);
    handleNextQuizz();
  };

  return (
    <div className="h-full w-full flex justify-center flex-col">
      {quizz.map((quizz: IQuizz, index: number) => {
        return (
          <div key={index}>
            <h1>{quizz.question}</h1>
            <div className="flex justify-center">
              {quizz.choices.map((choice: Ichoice, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleAnswer(choice.isCorrect)}
                  >
                    <Image
                      src={choice.url}
                      alt="Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropQuizz;
