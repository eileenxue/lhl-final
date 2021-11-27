import ScrollToBottom from "react-scroll-to-bottom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Chat from "./Chat";
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
    <div>
      <h1>Dashboard proctor page </h1>
      <div>
        {/* {user.first_name} */}
        {messages.map((msg) => (
          <div>
            <h3> {msg.message}</h3>
            <small>{msg.timestamp}</small>
          </div>
        ))}
      </div>
          <Chat />
    </div>
  );
}
