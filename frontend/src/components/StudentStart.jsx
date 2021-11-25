// go to the calibration page

// bring roya code to component
// bring eileen code to component

// import { Fragment } from "react";
// import ML_sound from "./ML_sound";
import WebGazer from "./WebGazer";
import Questions from './Questions';
// import ML_sound  from "./ML_sound";
// import Face_detection from "./Face_detection";

function StudentStart() {
  return (
    <div>
      <WebGazer />
      {/* <ML_sound />
      <Face_detection /> */}
      <Questions /> 
    </div>
  );
}

export default StudentStart;

