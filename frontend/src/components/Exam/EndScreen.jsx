import React, { useContext } from 'react';
import { ExamContext } from '../../helpers/contexts';

export default function EndScreen() {
  const { score, setScore, setExamState } = useContext(ExamContext);

  return (
    <div>
      <h1>Exam Completed</h1>
      <button>Exit</button>
    </div>
  )
}
