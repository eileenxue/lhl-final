import Chat_Home from "./Chat_Home";
import Questions from "./Questions";

import "./ExamPage.scss";
import FaceDetect from "./FaceDetect";
import AudioModel from "./AudioModel";
import axios from "axios";
import {useState, useEffect} from 'react';
import Chat from './Chat';
import ExamPrimary from "./ExamPrimary";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3005");


export default function ExamPage() {
  // Check if page is in focus or not
  const [user,setUser] = useState({});
  const [message, setMessage] = useState("");


  const checkFocus = () => {
    if(document.hasFocus() === false){
      // Raise concern if user is not in focus
      console.log("User is not focus on the current page")
      setMessage("User is not focus on the current page");
    }
    setMessage("");
  }
  const runCheckFocus = async () => {
    // const model = await blazeface.load();

    // Set how often it should run
    // 1000 means every 1 second
    setInterval(() => {
      checkFocus();
    }, 1000)
  }


  useEffect (() => {runCheckFocus()}, []);

  const sendMessage = async function() {
    // wait for the data to come in to send to the backend 
    const timestamp = new Date();
    console.log("=========================: here comes the function ")
    try {
      const payLoad = {
        // currently hard coded examid == 1
        // appointment_id: 1, 
        // student_id: user.id,
        room: "fancy",
        message,
        timestamp: timestamp
      }
      console.log("sending message or not ????????")
      await socket.emit("send_message", payLoad);
    } catch (error) {
      console.log(error)
    }
  };

  const joinRoom = () => {
    console.log("joined fancy student   ~~~~~~~~~~~~~~~~~~")
      socket.emit("join_room", "fancy");
  };


  useEffect(() => {
    joinRoom();
    const storedUser = localStorage.getItem("storedUser");
    // if (!storedUser) {
    //   window.location.href = "/login";
    // };

    const parsedUser = JSON.parse(storedUser);

    setUser(parsedUser);
    // console.log("++++++++++++++:", parsedUser);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${parsedUser.accessToken}`;
    // getAppointments();
    // receiveMessage();
  }, []);


  useEffect(()=>{ 
    if (message) { sendMessage() }
  }, [message]);



  return (
    <div className="exam-page">
      <h1>Exam In Progress</h1>
      <details>
        <summary>Read Instructions</summary>
      <div className="exam-page--instructions">
        {/* <p>Instructions: </p> */}
        <ul>
          <li>Do not turn off your video or microphone during the exam.</li>
          <li>
            Do not click away from this page while your exam is in progress.
          </li>
          <li>You can communicate with the proctor through chat.</li>
          <li>Once you're ready, click "Start Exam"</li>
        </ul>
      </div>
      </details>
      <div className="exam-page--wrapper">
        {/* Where the webcam and chat will be */}
        <div className="exam-page--left">
          <FaceDetect />
          <AudioModel />
          <Chat />
        </div>

        {/* Where the questions will be */}
        <div className="exam-page--right">
          <ExamPrimary />
        </div>
      </div>
    </div>
  );
}
