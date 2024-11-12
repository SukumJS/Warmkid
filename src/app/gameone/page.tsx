import React from 'react'
import data from '@/../data.json'

const GameOne = () => {


  const {quizzs} = data


  console.log(quizzs);
  


  return (
   <>
    <h1>Game One</h1>
    <div>
      {quizzs.map((quizz) => (
        <div key={quizz.question}>
          <h2>Question {quizz.question}</h2>
          <div>
            {quizz.choices.map((choice) => (
              <div key={choice.id}>
                {/* <Image src={choice.url} alt={`Choice ${choice.id}`} /> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
   </> 
  )
}

export default GameOne
