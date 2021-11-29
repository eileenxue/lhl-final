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

  return (
    <div>
      <h1>Exam Complete</h1>
      <div className="exam-final-score">
        Your score: {score} / {questions.length} 
      </div>
      <div className="exam-end-btns">

      {/* Bonus feature: If user does not get a perfect score, they can restart exam */}
      {score / questions.length === 1 ? (
        <Button variant="contained" component={Link} to="/dashboard">Exit</Button>
      ) : (
        <>
        <Button variant="contained" component={Link} to="/dashboard">Exit</Button>
        <Button variant="" onClick={restartExam} className="restart-btn">Restart Exam</Button>
        </>
      )}
      </div>
    </div>
  )
}
