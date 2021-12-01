import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ExamContext } from '../../helpers/contexts';
import "../ExamPrimary.scss";

export default function StartMenu() {
  const { examState, setExamState, info } = useContext(ExamContext);
  return (
    <div className="start-menu">
      <h2>{info.type}</h2>
      <p>When you're ready...</p>
      <Button variant="contained" size="large" className="start-menu-btn" onClick={() => {setExamState("mainExam")}}>
        Start Exam
      </Button>
    </div>
  )
}
