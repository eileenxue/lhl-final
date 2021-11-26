import Chat_Home from "./Chat_Home";
import Questions from "./Questions";

import "./ExamPage.scss";
import FaceDetect from "./FaceDetect";

export default function ExamPage() {
  return (
    <div>
      <h1>Exam Page </h1>
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