import {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link, NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';

const baseURL = 'http://localhost:3005';

export default function DashboardStudent(props) {

  const [user,setUser] = useState({});
  const [appointments, setAppointments] =useState([]);

  let navigate = useNavigate();

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
    // console.log("++++++++++++++:", parsedUser);
    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.accessToken}`;
    getAppointments();
  }, [])

  const getAppointments = async (e) => { 
    try {
      const res = await axios.get(`${baseURL}/api/dashboard`);
      console.log("in the getAppointments function : ", res.data)
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

    <h1>Dashboard proctor page </h1>
    <div>
      {user.first_name}
      <Link to="/monitor">check exam</Link>
    </div>
    </div>

  );
}