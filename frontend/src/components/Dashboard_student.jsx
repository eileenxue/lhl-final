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
      todayDate.getDate() === dbDate.getDate() && (tests.final_score === 0 )
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

  const todayTest = tests.map(
    (test) => (
      <>
        {compareDates(new Date(), new Date(test.start_date)) === "same day" && (
          <tr>
            <td>{stringToDate(test.start_date)}</td>
            <td>{test.type}</td>
            <td><Button variant="contained" component={Link} to={`/exam/${test.id}`}>start exam</Button></td>
          </tr>
        )}
      </>
    )

    // (test, index) => {
    // return (
    //   // Made up display component
    //   <ExamResult key={index} {...test} />
    // )}
  );

  const upcomingTest = tests.map(
    (test) => (
      <>
        { compareDates(new Date(), new Date(test.start_date)) == "upcoming events" && (
          <tr>
            <td>{stringToDate(test.start_date)}</td>
            <td>{test.type}</td>
            <td><Button variant="" component={Link} to={`/edit/${test.id}`}>Edit</Button></td>
            <td><Button variant="" color="error" onClick={() => {deleteAppointment(`${test.id}`);}}>Delete</Button></td>
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
      {/* <h1>{user.first_name}'s Student Dashboard </h1> */}
      <div className="dashboard--student-wrapper">
        <section>
          <article>
            <h2>Today's Exams</h2>
              <div className="table-wrapper">
                <table className="dashboard--table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Exam Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayTest} 
                  </tbody>
                </table>
              </div>
          </article>
        
          <article>
            <h2>Upcoming Exams</h2>
            <div className="table-wrapper">
            <table className="dashboard--table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Exam Name</th>
                  <th colSpan="2">Modify Booking</th>
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
                  <th>Exam Name</th>
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
