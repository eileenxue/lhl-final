import "./Chat.css";
import UserList from "./components/UserList";
import tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState, useEffect } from "react";
import Chat_Home from "./components/Chat_Home";
import Registration from "./components/Registration";
import Questions from "./components/Questions";
import Login from "./components/Login";
import WebGazer from "./components/WebGazer";

import axios from "axios";
import MainHeader from "./components/MainHeader";
import Home from "./components/Home";

import DashboardProctor from "./components/Dashboard_proctor";
import DashboardStudent from "./components/Dashboard_student";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RequireAuth() {
  let userLoggedin = localStorage.getItem("storedUser");
  let location = useLocation();
  if (!userLoggedin) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

function App() {
  let userLoggedin = localStorage.getItem("storedUser");

  const labels = ["Background Noise", "keyboard", "moving", "voice"];
  const [user, setUser] = useState("");

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

  const handleLogout = function () {
    localStorage.removeItem("storedUser");
    window.location.href = "/login";
  };

  return (
    <div className="App">
      <MainHeader/>
      <main>

      {/* DECLARE ALL ROUTES HERE */}
      <Routes>
        <Route>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/chat/:id" element={<Chat_Home />}/>

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardStudent />} />
            <Route path="/admin" element={<DashboardProctor />} />
          </Route>
        </Route>
      </Routes>
      
      </main>

      {/* <h1> super exam </h1>
       <UserList /> 
      <button onClick={init}>Start</button>
      {thereIsNoise && <div>There is some background noiseeeee</div>}
      <Questions/>
      <Chat_Home /> */}
      {/* <WebGazer /> */}

    
      {/* <Registration />  */}

      {/* ****************************** from origin main **************************************
       <WebGazer />
      <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
      <Route path="/chat/:id" element={<Chat_Home />}/>
      </Routes>
      </Router>
      ****************************** from origin main ************************************** */}

     
    </div>
  );
}

export default App;
