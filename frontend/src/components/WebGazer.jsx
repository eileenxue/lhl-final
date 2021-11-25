import { useState, useEffect } from "react";
import Counter from "./Counter";
import axios from 'axios';

const baseURL = 'http://localhost:3005';

function WebGazer() {
  const [eye, setEye] = useState("");
  const [user,setUser] =useState({});
  const [exam, setExam] =useState({});

  const sendMessage = async function(message) {
    // appointment_id we are writing 
    // 
    try {
      const payLoad = {
        // examid == 1
        exam_id: 1, 
        student_id: user.id,
        message
      }

      const {data} = await axios.post("URL",payLoad)

      // create routes to accept the message at the backend. 
      // in the proctor page, will grab that message to the front
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{ 
    const storedUser = localStorage.getItem('storedUser');
    if (!storedUser) {
      window.location.href = "/login";
    }; 

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.is_proctor ) {
      alert ("proctors are not allowed to view the exam")
      window.location.href = "/admin";
    }; 

    setUser(parsedUser); 
    // console.log("++++++++++++++:", parsedUser);
    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.accessToken}`;

  

    // getExam(); 
  }, [])



  const getExam = async (e) => { 
    try {
      const res = await axios.get(`${baseURL}/api/dashboard`);
      console.log("in the getExam function : ", res.data); 
      const exam = res.data; 
      if (exam.student_id !== user.id) {
        // navigate to login / dashboard 
      }
      setExam(res.data);
    } catch (err) { 
      // if no exam, go to dashboard 
      console.log(err);
    }
  };



  useEffect(() => {
    const webgazer = window.webgazer;

    window.saveDataAcrossSession = true;

    let left_cutoff = window.innerWidth / 8;
    let right_cutoff = window.innerWidth - window.innerWidth / 8;
    let top_cutoff = window.innerHeight / 8;
    let bottom_cutoff = window.innerWidth - window.innerHeight / 8;

    
    webgazer
      .setGazeListener((data, timestamp) => {
        if (data == null) return; 
        if (
          data.x < left_cutoff ||
          data.x > right_cutoff ||
          data.y < top_cutoff ||
          data.y > bottom_cutoff
        ) { 
          console.log("nooooooooo");
          setEye("baaaaaaaad"); 
        } else {
          console.log('ok');
          setEye("nice");
      }
    })
      .begin();
  }, []);

  return (
    <div className="App">
      {/* <h1> super exam </h1>
       <UserList />  */}
      <p style={{ fontSize: "8em" }}>{eye}</p>
      < Counter />
    </div>
  );
}
export default WebGazer;