// React and Development 
import { useState, useEffect } from "react";
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

import axios from "axios";

import tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";

// Components
import Chat from './components/Chat';
import Registration from "./components/Registration";
import Questions from "./components/Questions";
import Booking from "./components/Booking";
import Login from "./components/Login";
// import WebGazer from "./components/WebGazer";
import MainHeader from "./components/MainHeader";
import Home from "./components/Home";
import FaceDetect from "./components/FaceDetect";
import DashboardProctor from "./components/Dashboard_proctor";
import DashboardStudent from "./components/Dashboard_student";
import Proctor_exam  from "./components/Proctor_exam";
import ExamPage from "./components/ExamPage";
import AudioModel from "./components/AudioModel";
import ExamPrimary from "./components/ExamPrimary";
import Edit from './components/Edit';
import AboutUs from "./components/AboutUs";
import MainFooter from "./components/MainFooter";
// import WebGazer_calibration from "./components/WebGazer_calibration";


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

  

  return (
    <div className="App">
      <MainHeader/>
      <main>
        {/* <WebGazer_calibration /> */}

      {/* DECLARE ALL ROUTES HERE */}
      <Routes>
        <Route>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<AboutUs />}/>

          <Route path="/chat/:id" element={<Chat />}/>

          {/* Temporary: For testing components in public URL */}
          <Route path="/questions" element={<Questions />}/>
          <Route path="/booking" element={<Booking />}/>
          <Route path="/booking/:id" element={<Booking />}/>
          <Route path="/examprimary" element={<ExamPrimary />}/>
          {/* <Route path="/webgazer" element={<WebGazer />}/> */}
          <Route path="/facedetect" element={<FaceDetect/>}/>
          <Route path="/audiomodel" element={<AudioModel/>}/>
          

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardStudent />} />
            <Route path="/admin" element={<DashboardProctor />} />
            <Route path="/exam/:id" element={<ExamPage />} />
            <Route path="/monitor/:id" element={<Proctor_exam />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Route>
      </Routes>

      </main>
      <MainFooter/>

    </div>
  );
}

export default App;
