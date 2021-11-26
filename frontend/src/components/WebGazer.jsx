import { useState, useEffect } from "react";
import Counter from "./Counter";
import axios from 'axios';


function WebGazer() {
  const [eye, setEye] = useState("");
  const [user,setUser] =useState({});
  const [exam, setExam] =useState({});


  //send the message to the backend 

  const sendMessage = function() {
    // wait for the data to come in to send to the backend 
    const timestamp = new Date();

    console.log("=========================: here comes the function ",)
    try {
      const payLoad = {
        // currently hard coded examid == 1
        appointment_id: 1, 
        student_id: user.id,
        eye,
        timestamp: timestamp
      }
      axios.post("/message", payLoad)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{ 
    const storedUser = localStorage.getItem('storedUser');
    // if (!storedUser) {
    //   window.location.href = "/login";
    // }; 

    const parsedUser = JSON.parse(storedUser);

    // if (!parsedUser.is_proctor) {
    //   window.location.href = "/login";
    // }
    setUser(parsedUser); 
    // console.log("++++++++++++++:", parsedUser);
    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.accessToken}`;
    // getAppointments();
  }, []);


  useEffect(()=>{ 
    if (eye) { sendMessage() }
  }, [eye]);




  useEffect(() => {
    const webgazer = window.webgazer;

    window.saveDataAcrossSession = true;

    let left_cutoff = window.innerWidth / 8;
    let right_cutoff = window.innerWidth - window.innerWidth / 8;
    let top_cutoff = window.innerHeight / 8;
    let bottom_cutoff = window.innerWidth - window.innerHeight / 8;

    
    webgazer
      .setGazeListener((data, timestamp) => {
        if (data == null) return; 
        if (
          data.x < left_cutoff ||
          data.x > right_cutoff ||
          data.y < top_cutoff ||
          data.y > bottom_cutoff
        ) { 
          console.log("nooooooooo");
          setEye("baaaaaaaad"); 
        } 
        else {
          console.log('ok');
          setEye("");
      }
      
    })
      .begin();
  }, []);

  return (
    <div className="App">
      {/* <h1> super exam </h1>
       <UserList />  */}
      <p style={{ fontSize: "8em" }}>{eye}</p>
      < Counter />
    
    </div>
  );
}
export default WebGazer;