import {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function DashboardStudent(props) {

  const [user,setUser] = useState({});
  let navigate = useNavigate();

  useEffect(()=>{ 
    const storedUser = localStorage.getItem('storedUser');
    if (!storedUser) {
      navigate('/login') 
    }; 

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser); 

  }, [])



  return (
    <div>

    <h1>Dashboard student page </h1>
    <div>
      {user.first_name}
    </div>
    </div>

  );
}