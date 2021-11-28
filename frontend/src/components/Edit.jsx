import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../setting";
import DatePicker from "react-datepicker";
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

const baseURL = "http://localhost:3005";

export default function DashboardStudent(props) {
  let [user, setUser] = useState({});
  let [exam, setExam] = useState("");
  let [date, setDate] = useState();
  let { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("storedUser");
    if (!storedUser) {
      window.location.href = "/login";
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.is_proctor) {
      window.location.href = "/login";
    }
    setUser(parsedUser);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${parsedUser.accessToken}`;

    axios.get(`${API_URL}edit/${id}`).then((result) => {
      setExam = result.data.test[0].type; 
      setDate = result.data.test[0].start_date;
    });
  }, []);


  const edit = () => {
    axios
      .post(`${API_URL}edit/${id}`, {
        start_date: date,
      })
      .then((response) => {
        console.log(`from post ${response}`);
        navigate(`/dashboard`);
      });
  };


  return (
    <div>
      <h1> Edit your exam</h1>
      {/* <label> exam name</label>
      <input
        type="text" placeholder ={`${exam}`}
        onChange={(event) => {
          setExam(event.target.value);
        }}
      />
       <p> </p> */}
      <label> exam date</label>

      <DatePicker selected={date}  minDate={new Date()} onChange={(d) => setDate(d)} /> 

      <button onClick={edit} > Save </button>
    </div>
  );
}

