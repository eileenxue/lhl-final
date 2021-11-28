import {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link, NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';
import WebGazer from './WebGazer';
import Counter from './Counter'; 

const baseURL = 'http://localhost:3005';

export default function WebGazer_calibration(props) {

  const [user,setUser] = useState({});
  const [appointments, setAppointments] =useState([]);

  const n = 8;

  return (
    <div>

 
    <div>

      <WebGazer /> 
      <Counter /> 
      <Counter /> 
      <Counter /> 
      <Counter /> 
      <Counter /> 
    </div>
    </div>

  );
}