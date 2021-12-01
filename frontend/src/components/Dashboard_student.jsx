import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../setting";
import ExamResult from "./ExamResult";
import './Dashboard.scss';
import { Button } from "@mui/material";
import './Dashboard_student.scss'

export default function DashboardStudent(props) {
  console.log("API", API_URL);
  console.log("ENV", process.env.NODE_ENV);

  const [user, setUser] = useState({});
  const [tests, setTests] = useState([]);
  const [showalert, setShowalert] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [needLoadTests, setNeedLoadTests] = useState(true);

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
    
    if (needLoadTests) {
         axios.get(`${API_URL}dashboard/student/${parsedUser.id}`).then((result) => {
      console.log("testsssssssssss:", result.data.test);
      setTests(result.data.test);
      setNeedLoadTests(false);
    });
    }
  }, [tests, setTests, needLoadTests, setNeedLoadTests]);

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


  const isScore = function (dbScore) {
    if (dbScore) {return true } 
    return false;
  }


  const stringToDate = function (dbDate) {
    return dbDate.slice(0, 10);
  };

  const deleteAppointment = async (id) => {
    console.log("what is the id", id);
    const response = await axios.post(`${API_URL}delete/${id}`)
    .then((response) => {
      console.log("tests........ response", response); 
      return tests.filter((test) => {
          return test.id !== id;
        });
    });
    return await response;
  };

  const todayTest = tests.map(
    (test) => (
      <>
        {compareDates(new Date(), new Date(test.start_date)) === "same day" && 
          isScore(test.final_score) === false && 
        (
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

  const deleteTestAlert = (testId) => {
    setSelectedTest(testId);
    setShowalert(true)
  }

  const removeAppointment = async (testId) => {
    const updatedTests = await deleteAppointment(`${selectedTest}`);
    console.table(updatedTests);
    setTests(updatedTests);
    setNeedLoadTests(true);
    setShowalert(false);
  }

  const upcomingTest = tests.map(
    (test) => (
      <>
        { compareDates(new Date(), new Date(test.start_date)) === "upcoming events" && (
          <>
          <tr>
            <td>{stringToDate(test.start_date)}</td>
            <td>{test.type}</td>
            <td><Button variant="" component={Link} to={`/edit/${test.id}`}>Edit</Button></td>
            <td><Button variant="" color="error" onClick={() => deleteTestAlert(test.id)} >Delete</Button></td>
          </tr>
          { showalert &&         
          <div className="alert">
            <h1 className='alert-header'>Warning!</h1>
            <p className="alert-body">Are you sure you want to delete this exam?</p>
            <div className="alert-buttons">
              <Button className="alert-button error"  onClick={() => removeAppointment(selectedTest)}>Yes</Button>
              <Button className="alert-button" onClick={() => setShowalert(false)}>Cancel</Button> 
            </div>

          </div>
          }
         </>
        )}
      </>
    )
  );

  const previousTest = tests.map(
    (test) => (
      <>
        { ( compareDates(new Date(), new Date(test.start_date)) === "past events" ||
        isScore(test.final_score) === true) && 
        (
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
    <div className="dashboard">
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
                 {tests && upcomingTest}
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
