import React, { useState } from 'react';
import StartMenu from "./Exam/StartMenu";
import EndScreen from "./Exam/EndScreen";
import ExamQuestions from "./Exam/ExamQuestions";
import { ExamContext } from "../helpers/contexts";
import "./ExamPrimary.scss";

export default function ExamPrimary() {


  const [examState, setExamState] = useState("menu");
  const [score, setScore] = useState(0);

  return (
    <div className="exam-primary">
      {/* <h1>Exam Primary</h1> */}
      <ExamContext.Provider value={{ examState, setExamState, score, setScore }}>
        {examState === "menu" && <StartMenu/>}
        {examState === "mainExam" && <ExamQuestions/>}
        {examState === "endScreen" && <EndScreen/>}
      </ExamContext.Provider>
    </div>
  )
}
