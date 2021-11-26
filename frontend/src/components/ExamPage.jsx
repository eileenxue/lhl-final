import Chat_Home from "./Chat_Home";
import Questions from "./Questions";

import "./ExamPage.scss";
import FaceDetect from "./FaceDetect";

export default function ExamPage() {

  // Check if page is in focus or not
  const checkFocus = () => {
    if(document.hasFocus() === false){
      // Raise concern if user is not in focus
      console.log("User is not focus on the current page")
    }
  }
  setInterval(checkFocus, 1000);


  return (
    <div>
      <h1>Exam Page</h1>
      <div>
        <p>Instructions: </p>
        <ul>
          <li>Do not turn off your video or microphone during the exam.</li>
          <li>Do not click away from this page while your exam is in progress.</li>
          <li>You can communicate with the proctor through chat.</li>
          <li>Once you're ready, click "Start Exam"</li>
        </ul>
      </div>
      <div className="exam-page--wrapper">
        {/* Where the webcam and chat will be */}
        <div className="exam-page--left">
          <FaceDetect/>
          <Chat_Home/>
        </div>

        {/* Where the questions will be */}
        <div className="exam-page--right">
          <Questions/>
        </div>
      </div>
    </div>

  );
}