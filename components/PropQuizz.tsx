import React, { useContext } from "react";
import { QuizzContext } from "../src/app/gameone/page";
import Image from "next/image";

interface IQuizz {
  id: number;
  url: string;
  isCorrect: boolean;
}

const PropQuizz = () => {
  const { currentQuizz, setAnswer ,totalQuizz, quizzperPage,paginate ,currentPage } = useContext(QuizzContext);

  const quizz = currentQuizz;

  const choices = quizz[0].choices;
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalQuizz / quizzperPage); i++) {
    pageNumbers.push(i);
  }

    const handleNextQuizz = () => {
    pageNumbers.map((number) => {
      if (currentPage === number) {
        paginate(number + 1);
      }
    });
  };


  const handleAnswer = (isCorrect: boolean) => {
    setAnswer((prev: boolean[]) => [...prev, isCorrect]);
    handleNextQuizz();
  };

  return (
    <div className="h-full w-full flex justify-center flex-col">
      {choices.map((choice: IQuizz) => (
        <div key={choice.id} onClick={() => handleAnswer(choice.isCorrect)}>
          <Image src={choice.url} alt="quizz" width={100} height={100} />
        </div>
      ))}
    </div>
  );
};

export default PropQuizz;
