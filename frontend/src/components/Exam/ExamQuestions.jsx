import React, { useState, useEffect, useContext } from 'react'
import { ExamContext } from '../../helpers/contexts';
import "../ExamPrimary.scss";
import axios from 'axios';
import { API_URL } from '../../setting';
import { Button } from '@mui/material';

export default function ExamQuestions() {

  const { score, setScore, setExamState, questions } = useContext(ExamContext);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerChosen, setAnswerChosen] = useState("");

  const nextQuestion = () => {
    // Check if question is correct or not and then change the score
    if (questions[currentQuestion].correct_answer === answerChosen){
      setScore(score + 1);
    }
    console.log(`You chose ${answerChosen}`);
    
    // Change the current question
    setCurrentQuestion(currentQuestion + 1);
  }

  const finishExam = () => {
    // Still add the score if the question is correct or not
    if (questions[currentQuestion].correct_answer === answerChosen){
      setScore(score + 1);
    }
    // Change to the final screen
    setExamState("endScreen");
  }

  // const questionText = questions.map((question, key) => (
  //     <h2 key={key}>{question.question}</h2>
  //   )
  // )

  const answers = questions.map((answers) => (
    <div className="exam-answers">
      <button onClick={() => setAnswerChosen(answers.answer1)}>{answers.answer1}</button>
      <button onClick={() => setAnswerChosen(answers.answer2)}>{answers.answer2}</button>
      <button onClick={() => setAnswerChosen(answers.answer3)}>{answers.answer3}</button>
      <button onClick={() => setAnswerChosen(answers.answer4)}>{answers.answer4}</button>
    </div>
    )
  )

  return (
    <div>
      <div className="exam-questions">
        <span>Question {currentQuestion + 1}</span>
        <h2>{questions[currentQuestion].question}</h2>
        {/* {questionText[currentQuestion]} */}
        {answers[currentQuestion]}
      </div>
    
      {/* Determine what to show until the user reaches the last question */}
      {currentQuestion === questions.length - 1 ? (
        // <button onClick={finishExam}>Finish Quiz</button>
        <Button variant="outlined" onClick={finishExam}>Finish Quiz</Button>
      ) : (
        <Button variant="outlined" onClick={nextQuestion}>Next Question</Button>
      )}

    </div>
  )
}
