import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ExamContext } from '../../helpers/contexts';

export default function StartMenu() {
  const { examState, setExamState } = useContext(ExamContext);
  return (
    <div className="start-menu">
      <p>When you're ready...</p>
      <Button variant="contained" onClick={() => {setExamState("mainExam")}}>
        Start Exam
      </Button>
    </div>
  )
}
