import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ExamContext } from '../../helpers/contexts';
import "../ExamPrimary.scss";

export default function EndScreen() {
  const { score, setScore, setExamState, questions } = useContext(ExamContext);

  // Additional feature to restart exam if student have multiple tries
  const restartExam = () => {
    setScore(0);
    setExamState("menu");
  }

  // Get the decimal value of score to be stored in the db
  const scoreDecimal = (score/questions.length);

  console.log(`${score} / ${questions.length}`);
  console.log(`You scored ${scoreDecimal * 100}%`);

  return (
    <div>
      <h2>Exam Complete</h2>
      <div className="exam-final-percentage">
        {scoreDecimal * 100}%
      </div>
      <div className="exam-final-score">
         Final score: {score} / {questions.length} 
      </div>
      <div className="exam-end-btns">

      {/* Bonus feature: If user does not get a perfect score, they can restart exam */}
      {score / questions.length === 1 ? (
        <Button variant="contained" component={Link} to="/dashboard">Save Result</Button>
      ) : (
        <>
        <Button variant="contained" component={Link} to="/dashboard">Save Result</Button>
        <Button variant="" onClick={restartExam} className="restart-btn">Restart Exam</Button>
        </>
      )}
      </div>
    </div>
  )
}
