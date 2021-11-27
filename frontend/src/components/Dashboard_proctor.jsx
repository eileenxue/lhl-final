import {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link, NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';

const baseURL = 'http://localhost:3005';

export default function DashboardStudent(props) {

  const [user,setUser] = useState({});
  const [appointments, setAppointments] =useState([]);

  useEffect(()=>{ 
    const storedUser = localStorage.getItem('storedUser');
    if (!storedUser) {
      window.location.href = "/login";
    }; 
    const parsedUser = JSON.parse(storedUser); 

    if (!parsedUser.is_proctor) {
      window.location.href = "/login";
    }
    setUser(parsedUser); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.accessToken}`;
    axios.get(`${baseURL}/api/dashboard/admin/${parsedUser.id}`) 
    .then((result)=>{
      setAppointments(result.data.test)
      // console.log("test:", (result.data.test));
    })
  }, [])

  const appointmentsList = appointments.map(appointment => 
    ( 
    <div> 
      <p> student id: {appointment.student_id} </p>
      <p> exam type: {appointment.type} </p>
      <p> exam date: {appointment.start_date}</p>
      {/* this should be dynamic  */}
      <Link to="/monitor">check exam</Link>
    </div>
  ))

  return (
    <div>

    <h1>Dashboard proctor page: {user.first_name} </h1>
    <h2>view today's exams </h2>
    <div>

      {appointmentsList}
    </div>
    </div>

  );
}