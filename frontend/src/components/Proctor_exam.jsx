import ScrollToBottom from "react-scroll-to-bottom";
import { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Chat from "./Chat";
import './Proctor_exam.scss'
import { API_URL } from "../setting";

const socket = io.connect("http://localhost:3005"); // point to the backend url

export default function Proctor_exam(props) {
  const [user, setUser] = useState({});
  const [MLmessages, setMLMessages] = useState([]);
  const [appointment, setAppointment] = useState({});

  // const [appointments, setAppointments] = useState([]);
  let { id } = useParams();


  console.log("props from proctor_exam", props);

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
      console.log("proctor received message?????????????", data);
      setMLMessages((list) => [...list, data]);
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
    axios.get(`${API_URL}exam/${id}`) 
    .then((result)=>{
      setAppointment(result.data.test[0])
      console.log("from proctor_exam page :", (result.data.test));
    })
  }, []);

  return (
    <div className="proctor-exam">
      <h1>Proctor Exam: {appointment.type} </h1>
      <div><strong>First Name:</strong> {appointment.first_name} <strong>Student ID:</strong> 021{appointment.student_id} </div>
      <div className="proctor-exam--wrapper">
          <Chat />
          <div className="proctor-exam--status-log">
            <div className="proctor-exam--status-header">Activity Monitor</div>
            <div className="proctor-exam--status-body">
              <ScrollToBottom className="message-container">
              {MLmessages.map((msg) => (
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
