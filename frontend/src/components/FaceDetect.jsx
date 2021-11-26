import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs-core";
import * as converter from "@tensorflow/tfjs-converter";
import * as blazeface from "@tensorflow-models/blazeface";

import Webcam from "react-webcam";

export default function FaceDetect() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load face model
  const runFaceModel = async () => {
    const model = await blazeface.load();

    // Set how often it should run
    setInterval(() => {
      detect(model)
    }, 100)
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
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      
      // Set video/canvas properties to actual video
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      // Make detections
      const prediction = await model.estimateFaces(video);
      console.log(prediction);
      
      // Draw canvas

    }
  }

  runFaceModel();

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          width: 600,
          height: 400
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: 600,
          height: 400
        }}
      />
    </div>

  );
}