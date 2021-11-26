import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';
import axios from "axios";
import { API_URL } from '../setting';
import ExamResult from './ExamResult'

export default function DashboardStudent(props) {

console.log("API", API_URL);
console.log("ENV", process.env.NODE_ENV);

  const [user,setUser] = useState({});
  const [test, setTest] = useState([])
  let navigate = useNavigate();

  useEffect(()=>{ 
    const storedUser = localStorage.getItem('storedUser');
    if (!storedUser) {
      window.location.href = "/login";
    }; 
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    axios.get(`${API_URL}dashboard/student/${parsedUser.id}`) 
    .then((result)=>{
      setTest(result.data.test)
      console.log("test:", result.data.test);
    })
  }, [])

  const testsResults = test.map((test, index) => {
    return (
      // Made up display component
      <ExamResult key={index} {...test} /> 
    )
   })

  return (
    <div>
    <h1>Dashboard student page </h1>
    <div>
      {user.first_name}
      <Link to="/exam/start">start</Link>
      {/* {user.first_name} */}
      {testsResults}
    </div>
    </div>

  );
}