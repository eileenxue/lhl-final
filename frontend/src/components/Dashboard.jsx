import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";



export default function Dashboard(props) {
  const { state } = useLocation();
  const [tests, setTests] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3005/api/tests')
    .then((result)=>{
      setTests(result)
    })
  }, []);
  console.log("here:", state.data);
  const student_dashboard = state.is_proctor ? <div>Proctor dashboard component</div> : <div>Student dashboard component</div>
  return (
    <div>
      { student_dashboard }
    </div>
    
  );
}