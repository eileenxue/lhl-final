import {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios'

export default function Proctor_exam(props) {

  const [user,setUser] =useState({});
  const [messages, setMessages] = useState([]);

  const receiveMessage = function() {
    // wait for the data to come in to send to the backend 

    console.log("=========================: here comes the receive message function ",)
    try {

      axios.get("message")
      .then (result => setMessages(result.data));
    } catch (error) {
      console.log(error)
    }
  }

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
    receiveMessage();
  }, [])

  return (
    <div>
    
    <h1>Dashboard proctor  page </h1>
    <div>
      {user.first_name}
      {/* {messages.map(msg => )} */}

    </div>
    </div>

  );
};

