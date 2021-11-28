import { useState , useEffect} from "react";
import "./Questions.scss"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from "axios";
import { API_URL } from "../setting";
import StartMenu from "./Exam/StartMenu";
import EndScreen from "./Exam/EndScreen";
import ExamQuestions from "./Exam/ExamQuestions";

export default function Questions(props) {

  // Get the state of current question, always start with index 0
  // const [currentQuestion, setCurrentQuestion] = useState(0);

  // Show the final scoreboard
  // const [showScore, setShowScore] = useState(false);
  // const [score, setScore] = useState(0);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:3005/api/questions")
    // .then((result) => {
    //   console.log("hereeeeee",result)
    //   setQuestions(result.data)
    // });
    axios.get(`${API_URL}questions/exam/1`).then((result) => {
      setQuestions(result.data.questions);
      console.log("questions:", result.data);
    });
  }, []);

  const questionsTest = questions.map(
    question => (
      <div>
        {question.question}
      </div>
    )
  )

  // Change the question 
  // const handleAnswerClick = (isCorrect) => {
  //   if(isCorrect === true){
  //     // alert('this is true')
  //     setScore(score + 1);
  //   }

  //   const nextQuestion = currentQuestion + 1;

  //   // Add condition so that it doesn't exceed length of all questions. Once at the end, show score.
  //   if (nextQuestion < questions.length) {
  //     setCurrentQuestion(nextQuestion);
  //   } else {
  //     alert('this is the end')
  //     setShowScore(true);
  //   }
  // }


  // NEW QUIZ STUFF
  // const [gameState, setGameState] = useState("menu");


  return (
    <div>
      <div className="questions">
      <h1 className="questions--heading">Exam: LHL 100</h1>

      {/* {gameState === "menu" && <StartMenu/>}
      {gameState === "mainExam" && <ExamQuestions/>}
      {gameState === "endScreen" && <EndScreen/>} */}


    {/* ====== OLD QUIZ COMPONENT ===== */}
    {/* {showScore ? (
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
    )} */}
    </div>
        
    {questionsTest}

    {/* Useful for visualization */}
    <pre>
      { JSON.stringify(questions, null, 2) }
    </pre>
    </div>

  );
}