import React, { useEffect } from "react";
import Image from "next/image";
import { handleAnswerSubmit } from "@/serverAction/serverAction";
import data from "../data.json";

interface Ichoice {
  id: number;
  url: string;
  isCorrect: boolean;
}

interface QuizzContextType {
  currentQuizz: typeof data.quizzs;
  quizzs: typeof data.quizzs;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setAnswer: React.Dispatch<React.SetStateAction<boolean[]>>;
  totalQuizz: number;
  quizzperPage: number;
  answer: boolean[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const PropQuizz = (props: QuizzContextType) => {
  const {
    currentQuizz,
    setAnswer,
    totalQuizz,
    quizzperPage,
    paginate,
    currentPage,
    answer,
    setScore,
  } = props;

  const quizz = currentQuizz;

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
      handleAnswerSubmit(answer)
        .then((data) => {
          setScore(data.score);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [answer]);

  const handleAnswer = async (isCorrect: boolean) => {
    await setAnswer((prev: boolean[]) => [...prev, isCorrect]);
    handleNextQuizz();
  };

  return (
    <div className="h-full w-full flex justify-center">
      {quizz.map((quizz, index: number) => {
        return (
          <div key={index}>
            <h1 className="mb-4 text-4xl text-center">
              {quizz.question <= 5 ? (
                <>
                  รูปภาพไหนที่<span className="text-red-600">ไม่ได้</span>
                  มาจากการใช้ AI Generate
                </>
              ) : (
                <>
                  รูปภาพไหนที่<span className="text-green-500">ได้</span>
                  มาจากการใช้ AI Generate
                </>
              )}
            </h1>
            <div className="flex justify-center">
              <div>
                {quizz.choices.map((choice: Ichoice, index: number) => {
                  return (
                    <div className="flex flex-row mb-4" key={index}>
                      <div onClick={() => handleAnswer(choice.isCorrect)}>
                        <Image
                          src={choice.url}
                          alt="Logo"
                          width={150}
                          height={100}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropQuizz;
