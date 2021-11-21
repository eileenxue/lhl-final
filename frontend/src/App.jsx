import "./App.css";
// import UserList from "./components/UserList";
// import tf from "@tensorflow/tfjs";
// import * as speechCommands from "@tensorflow-models/speech-commands";
import { useEffect } from "react";
import Counter from './components/Counter';

function App() {
  window.saveDataAcrossSession = true;

  let startLookTime = Number.POSITIVE_INFINITY;
  let look_delay = 2000;
  let left_cutoff = window.innerWidth/ 8;
  let right_cutoff = window.innerWidth - window.innerWidth / 8;

  let bottom_cutoff = window.innerHeight / 8;
  let top_cutoff = window.innerWidth - window.innerHeight / 8;
  

  useEffect(() => {
    const webgazer = window.webgazer;

    webgazer
      .setGazeListener((data, timestamp) => {
        if (data == null) return;
        if (data.x < left_cutoff || data.x > right_cutoff || data.y < bottom_cutoff ||  data.y > top_cutoff  ) {
          // if looking left / right, record the timestamp
          startLookTime = timestamp;
        } 
        // if stare for over 1500 then alert
        if (startLookTime + look_delay < timestamp) {
          console.log(" you should focus on the middle of the screen ");
           // console.log(data, timestamp);
        }
      })
      .begin();
  }, []);

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
    <div className="App" >
      {/* <h1> super exam </h1>
       <UserList />  */}
      {/* <button onClick={init}>Start</button> */}
      <Counter />
       

    </div>
  );
}
export default App;
