import React, { useState, useEffect } from 'react';
import StartMenu from "./Exam/StartMenu";
import EndScreen from "./Exam/EndScreen";
import ExamQuestions from "./Exam/ExamQuestions";
import { ExamContext } from "../helpers/contexts";
import axios from 'axios';
import { API_URL } from '../setting';
import "./ExamPrimary.scss";
import { useParams } from 'react-router';

export default function ExamPrimary() {

  const [examState, setExamState] = useState("menu");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  // const {id} = useParams();

  useEffect(() => {
    axios.get(`${API_URL}questions/exam/1`).then((result) => {
      setQuestions(result.data.questions);
      console.log("Questions for Exam 1:", result.data.questions);
    });
  }, []);

  return (
    <div className="exam-primary">
      {/* <h1>Exam Primary</h1> */}
      <ExamContext.Provider value={{ examState, setExamState, score, setScore, questions, setQuestions }}>
        {examState === "menu" && <StartMenu/>}
        {examState === "mainExam" && <ExamQuestions/>}
        {examState === "endScreen" && <EndScreen/>}
      </ExamContext.Provider>
    </div>
  )
}
