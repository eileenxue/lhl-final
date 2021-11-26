import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs-core";
import * as converter from "@tensorflow/tfjs-converter";
import * as facemodel from "@tensorflow-models/blazeface";

import Webcam from "react-webcam";

export default function FaceDetect() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div>
      <h1> Face Detection </h1>
      <Webcam
        ref={webcamRef}
      />
      <canvas
        ref={canvasRef}
      />
    </div>

  );
}