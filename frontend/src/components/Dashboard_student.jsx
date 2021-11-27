import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../setting";
import ExamResult from "./ExamResult";
import moment from "moment";

export default function DashboardStudent(props) {
  // console.log("API", API_URL);
  // console.log("ENV", process.env.NODE_ENV);

  const [user, setUser] = useState({});
  const [test, setTest] = useState([]);

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
      setTest(result.data.test);
      console.log("test:", result.data.test);
    });
  }, []);

  let today = moment(new Date()).format("YYYY-MM-DD");
  console.log("today is: ", today);

  const todayTest = test.map(
    test => (
        <div>
          <p> exam type: {test.type} </p>
          <p> exam date: {test.start_date}</p>
          {/* this should be dynamic  */}
          <Link to="/exam">start exam</Link>
        </div>
    )
    // (test, index) => {
    // return (
    //   // Made up display component
    //   <ExamResult key={index} {...test} />
    // )}
  );

  // const upcomingTest = test.map(
  //   (test) => (
  //     <div>
  //       {test.start_date > today ? (
  //         <div>
  //           <p> exam type: {test.type} </p>
  //           <p> exam date: {test.start_date}</p>
  //           {/* this should be dynamic  */}
  //         </div>
  //       ) : (
  //         <b>NOT SAME DAY</b>
  //       )}
  //     </div>
  //   )
  // return (
  //   // Made up display component
  //   <ExamResult key={index} {...test} />
  // )
  // );

  return (
    <div>
      <h1>Dashboard student page </h1>
      <div>
        {user.first_name}
        {/* {user.first_name} */}
        <h3> today's exam: </h3>
        <small> {todayTest} </small>
        {/* <h3> upcoming exam:</h3>
        <small> {upcomingTest} </small> */}
      </div>
    </div>
  );
}
