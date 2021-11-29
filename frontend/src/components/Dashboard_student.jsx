import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../setting";
import ExamResult from "./ExamResult";
import './Dashboard.scss';
import { Button } from "@mui/material";

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

  const compareDates = function (todayDate, dbDate) {
    // console.log(todayDate, dbDate );
    if (
      todayDate.getFullYear() === dbDate.getFullYear() &&
      todayDate.getMonth() === dbDate.getMonth() &&
      todayDate.getDate() === dbDate.getDate()
    ){
      return "same day"
    } else if ( 
      todayDate.getFullYear() < dbDate.getFullYear()   || 
      (todayDate.getFullYear() === dbDate.getFullYear() && 
      todayDate.getMonth() < dbDate.getMonth()) || 
      ( todayDate.getFullYear() === dbDate.getFullYear() && 
      todayDate.getMonth() ===  dbDate.getMonth() && 
      todayDate.getDate() < dbDate.getDate()
      )
    ){
      return "upcoming events"
    } else {
      return "past events"
    }
  };

  const stringToDate = function (dbDate) {
    return dbDate.slice(0, 10);
  };

  const todayTest = tests.map(
    (test) => (
      <div>
        {compareDates(new Date(), new Date(test.start_date)) === "same day" && (
          <Fragment>
            <p> Exam Name: {test.type} </p>
            <p> Date: {stringToDate(test.start_date)}</p>
            {/* this should be dynamic  */}
            <Link to={`/exam/${test.id}`}>start exam</Link>
          </Fragment>
        )}
      </div>
    )

    // (test, index) => {
    // return (
    //   // Made up display component
    //   <ExamResult key={index} {...test} />
    // )}
  );

  const deleteAppointment = (id) => {
    console.log("what is the id", id);
    axios.post(`${API_URL}delete/${id}`)
    .then((response) => {
      console.log("tests........ response", response); 

      setTests(
        tests.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  const upcomingTest = tests.map(
    (test) => (
      <>
        { compareDates(new Date(), new Date(test.start_date)) == "upcoming events" && (
          <tr>
            <td>{stringToDate(test.start_date)}</td>
            <td>{test.type}</td>
            <td><Button component={Link} to={`/edit/${test.id}`}>Edit</Button></td>
            <td><Button variant="outlined" color="error" onClick={() => {deleteAppointment(`${test.id}`);}}>Delete</Button></td>
          </tr>
        )}
      </>
    )
  );

  const previousTest = tests.map(
    (test) => (
      <>
        { compareDates(new Date(), new Date(test.start_date)) == "past events" && (
          <tr>
            <td>{stringToDate(test.start_date)}</td>
            <td>{test.type}</td>
            <td>{test.final_score * 100}%</td>
          </tr>
        )}
      </>
    )
  );

  return (
    <div className="dashboard--student">
      <h1>{user.first_name}'s Student Dashboard </h1>
      <div className="dashboard--student-wrapper">
        <section>
          <article>
            <h2>Today's Exam</h2>
            <small> {todayTest} </small>
          </article>
        
          <article>
            <h2>Upcoming Exams</h2>
            <div className="table-wrapper">
            <table className="dashboard--table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Exam Type</th>
                  <th colSpan="2">Modify Appointment</th>
                </tr>
              </thead>
              <tbody>
                {upcomingTest}
              </tbody>
            </table>
            </div>
          </article>
        </section>

        <section>
          <article>
            <h2>Results</h2>
            <div className="table-wrapper">
              <table className="dashboard--table">
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Exam Type</th>
                  <th>Score</th>
                </tr>
                </thead>
                <tbody>
                  {previousTest}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
