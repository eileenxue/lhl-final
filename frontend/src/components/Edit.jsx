import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../setting";
import DatePicker from "react-datepicker";
import './Edit.scss';
// import Select from "react-dropdown-select";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';


import "react-datepicker/dist/react-datepicker.css";

const baseURL = "http://localhost:3005";

export default function DashboardStudent(props) {
  let [user, setUser] = useState({});
  let [tests, setTests] = useState([]);
  let [exam, setExam] = useState("");
  let [examId, setExamId] = useState();
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
      // console.log(result.data.test);
      setExam(result.data.test[0].type);
      setDate(new Date(result.data.test[0].start_date));
      setExamId(result.data.test[0].test_id);
    });

    axios.get(`${API_URL}tests`).then((result) => {
      // console.log("find all test types", result.data);
      setTests(result.data.testTypeList);
    });
  }, []);

  const edit = () => {
    axios
      .post(`${API_URL}edit/${id}`, {
        start_date: date,
        test_id: findTestId(exam),
      })
      .then((response) => {
        navigate("/dashboard");
      });
  };

  const findTestId = function (selectedExamName) {
    for (let i of tests) {
      if (i.type === selectedExamName) {
        console.log("findTestId function++++++++", i);
        setExamId(i.id);
        return i.id;
      }
    }
  };

  // select exam 

  const handleClose = () => {
    setAnchorEl(null);
  };

  const testType = tests.map((test) => (
    <MenuItem value={test.type}> {test.type}</MenuItem>
  ));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <div className="edit-page">
      <h1> Edit Your Booking</h1>
      <div className="edit-wrapper">
        <div>
          <h2>1. Confirm Exam</h2>
          <Select
            value={exam}
            onChange={(event) => {
              setExam(event.target.value);
            }}
            className="edit-exam-select"
          >
            {testType}
          </Select>
        </div>
        <div>
          <h2>2. Update Date</h2>
          <DatePicker selected={date}  minDate={new Date()} onChange={(d) => setDate(d)} className="edit-datepicker" /> 
        </div>
      </div>
      <div className="edit-button-box">
        <Button variant="contained" size="large" onClick={edit} className="edit-button"> Save </Button>
      </div>
    </div>
  );
}
