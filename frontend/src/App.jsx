import "./App.css";
import "./Chat.css";

import UserList from "./components/UserList";
import tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState } from "react";
import Chat_Home from "./components/Chat_Home";
import Login from "./components/Login";

import axios from "axios";


function App() {
  const labels = ["Background Noise", "keyboard", "moving", "voice"];

  const [user, setUser] = useState(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);


  // const [currentIndex, setCurrentIndex] = useState(null);
  // const findBiggestIndex = (listOfValues) => {
  //   const biggestNumber = Math.max(...listOfValues)
  //   const biggestIndex = listOfValues.indexOf(biggestNumber)
  //   if(biggestIndex){
  //   return setCurrentIndex(biggestIndex)
  //   }
  // const [currentIndex, setCurrentIndex] = useState(null);
  const [thereIsNoise, setThereIsNoise] = useState(false);
  // const backgroundNoise = (listOfValues) => {};

  async function createModel() {
    const URL = "http://localhost:3002/audio-model/";
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
      "BROWSER_FFT", // fourier transform type, not useful to change
      undefined, // speech commands vocabulary feature, not useful for your models
      checkpointURL,
      metadataURL
    );

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
  }
  async function init() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    // const labelContainer = document.getElementById("label-container");

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(
      (result) => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        console.log(scores, classLabels);
        // alert("there is some noise in the background");
        // findBiggestIndex(scores);
        setThereIsNoise(scores[0] > 0.5);
      },
      {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.5,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
      }
    );

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
  }



  return (
    <div className="App">
      {/* <h1> super exam </h1>
       <UserList /> 
      <button onClick={init}>Start</button>
      {thereIsNoise && <div>There is some background noiseeeee</div>}
      <Chat_Home /> */}
      <Login /> 
      

     
    </div>
  );
}

export default App;
