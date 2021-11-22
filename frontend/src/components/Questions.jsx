import { useState } from "react";
import "./Questions.scss"

export default function Questions(props) {

  // Using hardcoded questions for now
  const questions = [
    {
      questionText: 'What is 1+1?',
      answerOptions: [
        {answerText: '0', isCorrect: false},
        {answerText: '1', isCorrect: false},
        {answerText: '2', isCorrect: true},
        {answerText: '3', isCorrect: false},
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
        {questions[currentQuestion].answerOptions.map((answerOption) => (
          <button onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
        ))}
      </div>
      </>
    )}
    </div>

  );
}