import { useState, useEffect } from 'react';
import * as speechCommands from "@tensorflow-models/speech-commands";
import axios from 'axios';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3005"); // point to the backend url


export default function AudioModel() {
  const labels = ["Background Noise", "keyboard", "moving", "voice"];
  const [user, setUser] = useState({});
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
    const URL = "http://localhost:3001/audio-model/";
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
        if (scores[3] > 0.5) {setMessage("there is noise in the background")} 
        else (setMessage(""));
        
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

  init();

  return (
    <div>
      <p>Audio</p>
      {/* <button onClick={init}>Start</button> */}
      {/* {thereIsNoise && <div>There is some background voices</div>} */}
    </div>

  );
}