import React, { useState, useEffect, useContext } from 'react'
import { ExamContext } from '../../helpers/contexts';
import axios from 'axios';
import { API_URL } from '../../setting';

export default function ExamQuestions() {

  const { score, setScore, setExamState } = useContext(ExamContext);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerChosen, setAnswerChosen] = useState("");

  useEffect(() => {
    // axios.get("http://localhost:3005/api/questions")
    // .then((result) => {
    //   console.log("hereeeeee",result)
    //   setQuestions(result.data)
    // });
    axios.get(`${API_URL}questions/exam/1`).then((result) => {
      setQuestions(result.data.questions);
      // console.log(typeof result.data.questions)
      console.log("Questions for Exam 1:", result.data.questions);
    });
  }, []);

  const nextQuestion = () => {
    // Check if question is correct or not and then change the score
    
    // Change the current question
    setCurrentQuestion(currentQuestion + 1);
  }

  const finishExam = () => {
    // Still add the score if the question is correct or not

    setExamState("endScreen");
  }

  const questionText = questions.map((question, key) => (
      <h2 key={key}>{question.question}</h2>
    )
  )

  const answers = questions.map((answers) => (
    <div className="exam-answers">
      <button>{answers.answer1}</button>
      <button>{answers.answer2}</button>
      <button>{answers.answer3}</button>
      <button>{answers.answer4}</button>
    </div>
    )
  )

  // const answer1 = questions.map((question) => (

  // ))

  return (
    <div>

      <span>Question {currentQuestion + 1}</span>
      <div className="exam-questions">
        {questionText[currentQuestion]}
        {answers[currentQuestion]}
        {/* <button>{questions.map((question => (
          <div>{question.answer1}</div>)))}
        </button> */}
      </div>
    
      {currentQuestion === questions.length - 1 ? (
        <button onClick={finishExam}>Finish Quiz</button>
      ) : (
        <button onClick={nextQuestion}>Next Question</button>
      )}


      {/* {results} */}
    </div>
  )
}
