import React, { useState, useEffect } from "react";
import StartMenu from "./Exam/StartMenu";
import EndScreen from "./Exam/EndScreen";
import ExamQuestions from "./Exam/ExamQuestions";
import { ExamContext } from "../helpers/contexts";
import axios from "axios";
import { API_URL } from "../setting";
import "./ExamPrimary.scss";
import { useParams } from "react-router";

export default function ExamPrimary() {
  const [examState, setExamState] = useState("menu");
  const [score, setScore] = useState(0);
  const [info, setInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  let { id } = useParams();

  // const {id} = useParams();

  useEffect(() => {
    axios.get(`${API_URL}questions/exam/${id}`).then((result) => {
      setInfo(result.data.questions[0]);
      setQuestions(result.data.questions);
      // console.log(result.data.questions);
    });
  }, []);

  return (
    <div>
      <p>student name: {info.first_name}</p>
      <p>exam name: {info.type}</p>

      <div className="exam-primary">
        {/* <h1>Exam Primary</h1> */}

        <ExamContext.Provider
          value={{
            examState,
            setExamState,
            score,
            setScore,
            questions,
            setQuestions,
          }}
        >
          {examState === "menu" && <StartMenu />}
          {examState === "mainExam" && <ExamQuestions />}
          {examState === "endScreen" && <EndScreen />}
        </ExamContext.Provider>
      </div>
    </div>
  );
}
