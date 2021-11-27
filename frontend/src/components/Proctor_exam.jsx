import ScrollToBottom from "react-scroll-to-bottom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Chat from "./Chat";
import './Proctor_exam.scss'
const socket = io.connect("http://localhost:3005"); // point to the backend url


export default function Proctor_exam(props) {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  // const receiveMessage = function() {
  //   // wait for the data to come in to send to the backend

  //   console.log("=========================: here comes the receive message function ",)
  //   try {
  //     axios.get("message")
  //     // .then (result => setMessages(result.data));
  //     .then (result => console.log(result.data));
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const joinRoom = () => {
    console.log("joined fancy proctor   ~~~~~~~~~~~~~~~~~~");
    socket.emit("join_room", "fancy");
  };

  useEffect(() => {
    joinRoom();
    socket.on("receive_message", (data) => {
      // console.log("received message?????????????", data);
      setMessages((list) => [...list, data]);
    });

    const storedUser = localStorage.getItem("storedUser");
    // if (!storedUser) {
    //   window.location.href = "/login";
    // };

    const parsedUser = JSON.parse(storedUser);

    setUser(parsedUser);
  
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${parsedUser.accessToken}`;
  }, []);

  return (
    <div className="proctor-exam">
      <h1>Proctor Exam: LHL101 </h1>
      <div><strong>First Name:</strong> Yanbin <strong>Student ID:</strong> 4593801</div>
      <div className="proctor-exam--wrapper">
          <Chat />
          <div className="proctor-exam--status-log">
            <div className="proctor-exam--status-header">Activity Monitor</div>
            <div className="proctor-exam--status-body">
              <ScrollToBottom className="message-container">
              {messages.map((msg) => (
                <div className="proctor-exam--status-msg">
                  <p> {msg.message}</p>
                  <small>{msg.timestamp}</small>
                </div>
              ))}
              </ScrollToBottom>
            </div>
          </div>
      </div>
    </div>
  );
}
