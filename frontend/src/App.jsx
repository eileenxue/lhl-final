import "./App.css";
import "./Chat.css";

import UserList from "./components/UserList";
import tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState } from "react";
import Chat_Home from "./components/Chat_Home";

import axios from "axios";


function App() {
  const labels = ["Background Noise", "keyboard", "moving", "voice"];
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

// *******************************************************************************

const [user, setUser] = useState(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

// handle api request 
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/login", { email, password });
    setUser(res.data);
  } catch (err) {
    console.log(err);
  }
};

const seeQuestions = async (id) => {
  setSuccess(false);
  setError(false);
  try {
    await axios.get("/questions", {
      headers: { authorization: "Bearer " + user.accessToken },
    });
    setSuccess(true);
  } catch (err) {
    setError(true);
  }
}

  return (
    <div className="App">
      {/* <h1> super exam </h1>
       <UserList /> 
      <button onClick={init}>Start</button>
      {thereIsNoise && <div>There is some background noiseeeee</div>}
      <Chat_Home /> */}
      

      {user ? (
        <div className="home">
          <span>
            Welcome to the <b>{user.is_proctor ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.first_name}</b>.
          </span>
          <span>checkout questions page :::</span>
          <button  onClick={() => seeQuestions(user.id)}>
            see? 
          </button>

          {error && (
            <span >
              You are not allowed to see anything as you are NOOOOOT proctor !
              
            </span>
          )}
          {success && (
            <span >
              you can see stuff as you are a proctor.
            </span>
          )}
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle"> Login</span>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

export default App;
