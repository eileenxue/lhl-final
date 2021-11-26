
import UserList from "./components/UserList";
import tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState, useEffect } from "react";
import Chat_Home from "./components/Chat_Home";
import Registration from "./components/Registration";
import Questions from "./components/Questions";
import Login from "./components/Login";
// import WebGazer from "./components/WebGazer";

import axios from "axios";
import MainHeader from "./components/MainHeader";
import Home from "./components/Home";
import FaceDetect from "./components/FaceDetect";

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
import StudentStart from './components/StudentStart'; 
import Proctor_exam  from "./components/Proctor_exam";


import ExamPage from "./components/ExamPage";
import AudioModel from "./components/AudioModel";



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

      {/* DECLARE ALL ROUTES HERE */}
      <Routes>
        <Route>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/exam" element={<ExamPage />} />

          <Route path="/chat/:id" element={<Chat_Home />}/>

          {/* Temporary: For testing components in public URL */}
          <Route path="/questions" element={<Questions />}/>
          {/* <Route path="/webgazer" element={<WebGazer />}/> */}
          <Route path="/facedetect" element={<FaceDetect/>}/>
          <Route path="/audiomodel" element={<AudioModel/>}/>
          

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardStudent />} />
            <Route path="/admin" element={<DashboardProctor />} />
            <Route path="/exam/start" element={<StudentStart />} />
            <Route path="/monitor" element={<Proctor_exam />} />
          </Route>
        </Route>
      </Routes>

      </main>

    </div>
  );
}

export default App;
