import { useState, useEffect } from "react";
import Counter from "./Counter";
import axios from 'axios';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3005"); // point to the backend url

function WebGazer() {



  const [eye, setEye] = useState("");
  const [user,setUser] =useState({});
  const [exam, setExam] =useState({});


  //send the message to the backend 

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
        eye,
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

  // const sendMessage = async () => {
  //   if (currentMessage !== "") {
  //     console.log(socket.id);
  //     const messageData = {
  //       // key: socket.id,
  //       // room: room,
  //       // author: username,
  //       message: currentMessage,
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };
  //     await socket.emit("send_message", messageData);
  //     setMessageList((list) => [...list, messageData]);
  //     setCurrentMessage("");
  //   }
  // };


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
          // console.log("nooooooooo");
          setEye("baaaaaaaad"); 
        } 
        else {
          // console.log('ok');
          setEye("");
      }
      
    })
      .begin();
  }, []);

  return (
    <div className="webgazer">
      {/* <h1> super exam </h1>
       <UserList />  */}
      {/* <p style={{ fontSize: "8em" }}>{eye}</p> */}
      < Counter />
    
    </div>
  );
}
export default WebGazer;