import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ExamContext } from '../../helpers/contexts';
import "../ExamPrimary.scss";

export default function StartMenu() {
  const { examState, setExamState, info } = useContext(ExamContext);
  return (
    <div className="start-menu">
      <h2>{info.type}</h2>
      {/* <h3>When you're ready...</h3> */}
      <Button variant="contained" onClick={() => {setExamState("mainExam")}}>
        Start Exam
      </Button>
    </div>
  )
}
