import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs-core";
import * as converter from "@tensorflow/tfjs-converter";
import * as blazeface from "@tensorflow-models/blazeface";
import './FaceDetect.scss';
import Webcam from "react-webcam";

import axios from 'axios'
import io from "socket.io-client";
const socket = io.connect("http://localhost:3005");



export default function FaceDetect() {
  const [user,setUser] =useState();
  const [message, setMessage] = useState("")


  const sendMessage = async function() {
    // wait for the data to come in to send to the backend 
    const timestamp = new Date();
    console.log("=========================: here comes the function ",)
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


  useEffect(()=>{ 
    joinRoom();
    const storedUser = localStorage.getItem('storedUser');
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser); 
    // console.log("++++++++++++++:", parsedUser);
    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.accessToken}`;
  }, []);

  useEffect(()=>{ 
    if (message) { sendMessage() }
  }, [message]);


  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  // const [message, setMessage] = useState("Status: All Good!")

  // Load face model
  const runFaceModel = async () => {
    const model = await blazeface.load();

    // Set how often it should run
    // 1000 means every 1 second
    setInterval(() => {
      detect(model)
    }, 1000)
  }

  // Detect function when webcam is up and running and receiving data
  const detect = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      // const videoWidth = webcamRef.current.video.videoWidth;
      // const videoHeight = webcamRef.current.video.videoHeight;
      
      // Set video properties to actual video
      // webcamRef.current.video.width = videoWidth;
      // webcamRef.current.video.height = videoHeight;

      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;
      
      // Make detections
      const prediction = await model.estimateFaces(video);
      console.log(prediction);
      
      // Draw canvas
      // const ctx = canvasRef.current.getContext("2d");
     
      // If face is not detected
      if (prediction.length === 0){
        console.log("No face detected");
        setMessage("No face detected");
      } 

      // If more than one face detected
      if (prediction.length >= 2){
        console.log(`There are ${prediction.length} faces in the video`);
        setMessage(`There are ${prediction.length} faces in the video`);
      }

      setMessage("");
    }
  }

  runFaceModel();

  return (
    <div className="face-detect">
      <Webcam
        ref={webcamRef}
      />
      <div id="message">{message}</div>
      {/* <canvas
        ref={canvasRef}
        style={{
          width: 600,
          height: 400
        }}
      /> */}
    </div>

  );
}