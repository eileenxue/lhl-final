import "./App.css";
import UserList from "./components/UserList";
import tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";


const socket = io.connect("http://localhost:3005"); // point to the backend url

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

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(socket.id);
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {/* <h1> super exam </h1>
       <UserList />  */}
      <button onClick={init}>Start</button>
      {thereIsNoise && <div>There is some background noiseeeee</div>}
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}  />
      )}
    </div>
  );
}

export default App;
