import { useState } from "react";
import "./Questions.scss"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Questions(props) {

  // Using hardcoded questions for now
  const questions = [
    {
      questionText: 'When is demo day for Sept 2021 cohort?',
      answerOptions: [
        {answerText: 'Never!!', isCorrect: false},
        {answerText: 'Dec 1, 2021', isCorrect: false},
        {answerText: 'Dec 2, 2021', isCorrect: true},
        {answerText: 'Sometimes next year', isCorrect: false},
      ]
    }, 
    {
      questionText: 'Who is the mascot of Lighthouse Labs?',
      answerOptions: [
        {answerText: 'Gary', isCorrect: false},
        {answerText: 'Francis', isCorrect: false},
        {answerText: 'Vasily', isCorrect: false},
        {answerText: 'Larry', isCorrect: true},
      ]
    }, 
    {
      questionText: 'Which cohort is the best?',
      answerOptions: [
        {answerText: 'Sept 2021', isCorrect: true},
        {answerText: 'Oct 2021', isCorrect: false},
        {answerText: 'Nov 2021', isCorrect: false},
        {answerText: 'None of the above', isCorrect: false},
      ]
    }, 
  ]

  // Get the state of current question, always start with index 0
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Show the final scoreboard
  const [showScore, setShowScore] = useState(false);

  const [score, setScore] = useState(0);

  // Change the question 
  const handleAnswerClick = (isCorrect) => {
    if(isCorrect === true){
      // alert('this is true')
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    // Add condition so that it doesn't exceed length of all questions. Once at the end, show score.
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert('this is the end')
      setShowScore(true);
    }
  }

  return (
    <div className="questions">
    <h1 className="questions--heading">Exam: LHL 100</h1>

    {showScore ? (
      <div className='questions--scorecard'>You scored {score} out of {questions.length}</div>
    ) : (
      <>
      <div className='questions--section'>
        <div className='questions--count'>
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className='questions--text'>{questions[currentQuestion].questionText}</div>
      </div>
      <div className='questions--answers'>
        <ButtonGroup orientation="vertical" variant="outlined">
          {questions[currentQuestion].answerOptions.map((answerOption) => (
              <Button onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</Button>
          ))}
        </ButtonGroup>
      </div>
      </>
    )}
    </div>

  );
}