import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../setting";
import ExamResult from "./ExamResult";

export default function DashboardStudent(props) {
  console.log("API", API_URL);
  console.log("ENV", process.env.NODE_ENV);

  const [user, setUser] = useState({});
  const [tests, setTests] = useState([]);

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
    axios.get(`${API_URL}dashboard/student/${parsedUser.id}`).then((result) => {
      setTests(result.data.test);
      console.log("test:", result.data.test);
    });
  }, []);



  const compareDates = function (todayDate, dbDate){
    return  (todayDate.getFullYear() == dbDate.getFullYear() && 
    todayDate.getMonth() == dbDate.getMonth() && 
    todayDate.getDate() == dbDate.getDate());
  }

  const stringToDate = function (dbDate){
    return  dbDate.slice(0,10);
  }

  const todayTest = tests.map(
    test => 
   
        <div>
          {compareDates(new Date(),  new Date(test.start_date)) &&
          <Fragment>
            <p> exam type: {test.type} </p>
            <p> exam date: {stringToDate(test.start_date)}</p>
            {/* this should be dynamic  */}
            <Link to="/exam">start exam</Link>
          </Fragment>
            }
        </div>
    
    // (test, index) => {
    // return (
    //   // Made up display component
    //   <ExamResult key={index} {...test} />
    // )}
  );

  const deleteAppointment = (id) => {
    axios.delete(`${API_URL}delete/${id}`)
    .then(response => {
              setTests(tests.list.filter((val)=> {return val.id != id}))
  }) 
}

  const upcomingTest = tests.map(
    test => 
        <div>
          {!compareDates(new Date(),  new Date(test.start_date)) &&
          <Fragment>
            <p> exam type: {test.type} </p>
            <p> exam date: {stringToDate(test.start_date)}</p>
            <Link to={`/edit/${test.id}`}> Edit</Link>
            <button onClick={() => {deleteAppointment(test.id)} }> Delete </button>
          </Fragment>
            }
        </div>
    
    // (test, index) => {
    // return (
    //   // Made up display component
    //   <ExamResult key={index} {...test} />
    // )}
  );


  return (
    <div>
      <h1>Dashboard student page </h1>
      <div>
        {user.first_name}
        {/* {user.first_name} */}
        <h3> today's exam: </h3>
        <small> {todayTest} </small>
        <h3> upcoming exam:</h3>
        <small> {upcomingTest} </small> 
        
      </div>
    </div>
  );
}
