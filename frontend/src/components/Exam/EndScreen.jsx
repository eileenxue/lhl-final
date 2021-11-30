import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link ,useNavigate, useParams} from "react-router-dom";
import { ExamContext } from "../../helpers/contexts";
import "../ExamPrimary.scss";
import axios from "axios";

export default function EndScreen() {
  const { score, setScore, setExamState, questions } = useContext(ExamContext);
  let { id } = useParams();
  let navigate = useNavigate();

  const baseURL = "http://localhost:3005";
  // Additional feature to restart exam if student have multiple tries
  const restartExam = () => {
    setScore(0);
    setExamState("menu");
  };

  // Get the decimal value of score to be stored in the db
 
  const scoreDecimal = score / questions.length;
  console.log(`${score} / ${questions.length}`);
  console.log(`You scored ${scoreDecimal * 100}%`);

  // Store the score
  const storeScore = () => {
    axios
      .post(`${baseURL}/api/questions/exam/${id}`, {
        score: scoreDecimal,
      })
      .then((response) => {
        navigate("/dashboard");
        console.log("store score successfully~~~!!!! ");
      });
  };

  return (
    <div>
      <h2>Exam Complete</h2>
      <div className="exam-final-percentage">{scoreDecimal * 100}%</div>
      <div className="exam-final-score">
        Final score: {score} / {questions.length}
      </div>
      <div className="exam-end-btns">
        {/* Bonus feature: If user does not get a perfect score, they can restart exam */}
        {score / questions.length === 1 ? (
          <Button variant="contained" onClick={storeScore}> Submit score</Button>
        ) : (
          <>
            <Button variant="contained" onClick={storeScore}> Submit score </Button>
            <Button variant="" onClick={restartExam} className="restart-btn">
              Restart Exam
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
