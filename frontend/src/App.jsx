import logo from "./logo.svg";
import "./App.css";
import UserList from "./components/UserList";
import tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { useRef , useEffect} from "react";
// import { drawMesh } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runFacemesh = async () => {
    // OLD MODEL
    // const net = await facemesh.load({
    //   inputResolution: { width: 640, height: 480 },
    //   scale: 0.8,
    // });
    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({input:video});
      console.log(face);

      // // Get canvas context
      // const ctx = canvasRef.current.getContext("2d");
      // requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
  };

  useEffect(()=>{runFacemesh()}, []);

  // async function createModel() {
  //   const URL = "http://localhost:3002/audio-model/";
  //   const checkpointURL = URL + "model.json"; // model topology
  //   const metadataURL = URL + "metadata.json"; // model metadata

  //   const recognizer = speechCommands.create(
  //     "BROWSER_FFT", // fourier transform type, not useful to change
  //     undefined, // speech commands vocabulary feature, not useful for your models
  //     checkpointURL,
  //     metadataURL
  //   );

  //   // check that model and metadata are loaded via HTTPS requests.
  //   await recognizer.ensureModelLoaded();

  //   return recognizer;
  // }
  // async function init() {
  //   const recognizer = await createModel();
  //   const classLabels = recognizer.wordLabels(); // get class labels
  //   // const labelContainer = document.getElementById("label-container");

  //   // listen() takes two arguments:
  //   // 1. A callback function that is invoked anytime a word is recognized.
  //   // 2. A configuration object with adjustable fields
  //   recognizer.listen(
  //     (result) => {
  //       const scores = result.scores; // probability of prediction for each class
  //       // render the probability scores per class
  //       console.log(scores, classLabels);
  //     },
  //     {
  //       includeSpectrogram: true, // in case listen should return result.spectrogram
  //       probabilityThreshold: 0.75,
  //       invokeCallbackOnNoiseAndUnknown: true,
  //       overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
  //     }
  //   );

  //   // Stop the recognition in 5 seconds.
  //   // setTimeout(() => recognizer.stopListening(), 5000);
  // }
  return (
    <div className="App">
      {/* <h1> super exam </h1>
       <UserList />  */}

      {/* <button onClick={init}>Start</button> */}

      <section>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </section>
    </div>
  );
}

export default App;
