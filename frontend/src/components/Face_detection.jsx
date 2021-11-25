import { useState } from "react";
import tf from "@tensorflow/tfjs";

// const blazeface = require('@tensorflow-models/blazeface');

function Face_detection() {

  const blazeface = require('@tensorflow-models/blazeface');
  const [status, setStatus] = useState({}); 

  let video = document.getElementById("video");
  let model;
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let message = document.getElementById("message");

  const setupCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 600, height: 400 },
        audio: false,
      })
      .then((stream) => {
        video.srcObject = stream;
      });
  };

  const detectFaces = async () => {
    const prediction = await model.estimateFaces(video, false);

    console.log(prediction);

    ctx.drawImage(video, 0, 0, 600, 400);

    prediction.forEach((pred) => {
      // Warning: rainbow color only fun for a while
      const rainbow = Math.floor(Math.random() * 16777215).toString(16);

      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "#FFC0CB";
      ctx.rect(
        pred.topLeft[0],
        pred.topLeft[1],
        pred.bottomRight[0] - pred.topLeft[0],
        pred.bottomRight[1] - pred.topLeft[1]
      );
      ctx.stroke();
      // message.innerHTML = "Status: All good!";
    });

    // If face is not detected
    if (prediction.length === 0) {
      console.log("No face detected");
      message.innerHTML = "No face detected";
      setStatus({numberOfFaces: 0, message: "No face detected"})
      ctx.fillStyle = "rgba(255, 65, 0, 0.6)";
      ctx.fillRect(0, 0, 600, 400);
    }

    // If there's more than 1 face detected
    if (prediction.length >= 2) {
      message.innerHTML = `There are ${prediction.length} faces in the video`;
      setStatus({numberOfFaces: prediction.length, message: `There are ${prediction.length} faces in the video`})
    }
  };

  setupCamera();
  // Make sure model is loaded before calling function
  video.addEventListener("loadeddata", async () => {
    model = await blazeface.load();

    // Around 10 frames per second, change number for other framerates
    setInterval(detectFaces, 100);
  });

  return (<div>
  {status.message}
  </div>)
}

export default Face_detection;
