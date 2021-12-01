import {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link, NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';
import './Dashboard.scss';

import Proctor_exam from './Proctor_exam';
import { Button } from '@mui/material';

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
      console.log("test:", (result.data.test));
    })
  }, [])


  const stringToDate = function (dbDate){
    return  dbDate.slice(0,10);
  }


  const appointmentsList = appointments.map((appointment) => ( 
    <tr> 
      <td>{stringToDate(appointment.start_date)}</td>
      <td>{appointment.type}</td>
      <td>021{appointment.student_id}</td>
      <td><Button variant="contained" color="primary" component={Link} to={`/monitor/${appointment.id}`}>View</Button></td>
    </tr>
  ));

  return (
    <div className="dashboard">
      <h1>Monitor Today's Exams</h1>
      <table className="dashboard--table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Exam Name</th>
            <th>Student ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList}
        </tbody>
      </table>
    </div>

  );
}