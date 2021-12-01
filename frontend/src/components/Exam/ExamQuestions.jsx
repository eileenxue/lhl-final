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

    // Submit the score to the database
    // const scoreDecimal = (score/questions.length);
    // alert(`Final: ${scoreDecimal * 100}%`)

    // Change to the final screen
    setExamState("endScreen");
  }

  const answers = questions.map((answers) => (
    <div className="exam-answers">
      <Button variant="contained" color="info" onClick={() => setAnswerChosen(answers.answer1)}>{answers.answer1}</Button>
      <Button variant="contained" color="info" onClick={() => setAnswerChosen(answers.answer2)}>{answers.answer2}</Button>
      <Button variant="contained" color="info" onClick={() => setAnswerChosen(answers.answer3)}>{answers.answer3}</Button>
      <Button variant="contained" color="info" onClick={() => setAnswerChosen(answers.answer4)}>{answers.answer4}</Button>
    </div>
    )
  )

  return (
    <div>
      <div className="exam-questions">
        <div className="exam-question-num">Question {currentQuestion + 1}</div>
        <h2>{questions[currentQuestion].question}</h2>
        {/* {questionText[currentQuestion]} */}
        {answers[currentQuestion]}
      </div>
    
      {/* Determine what to show until the user reaches the last question */}
      {currentQuestion === questions.length - 1 ? (
        <Button variant="contained" color="success" size="large" onClick={finishExam} className="exam-finish-btn">Submit Exam</Button>
      ) : (
        <Button variant="outlined" size="large" onClick={nextQuestion} className="exam-next-btn">Next Question</Button>
      )}

    </div>
  )
}
