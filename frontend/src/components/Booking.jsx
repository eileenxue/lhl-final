import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import './Booking.scss';
import { Button } from '@mui/material';







export default function Booking(props) {
  const [user, setUser] = useState({});
  const [booking, setBooking] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [date, setDate] = useState();
  const [datePopup, setDatePopup] = useState(false);
  const [showalert, setShowalert] = useState(false);

  let navigate = useNavigate();
  

  const getFormattedDate = (date) => {
    const newDate = new Date(date);

    var year = newDate.getFullYear();

    var month = (1 + newDate.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = newDate.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("storedUser");
    if (!storedUser) {
      window.location.href = "/login";
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, []);

  const convertToArray = (obj) => {
    let newArray = [];
    for (let o in obj) {
      console.log(obj[o]);
      newArray.push(obj[o]);
    }
    setBookingList(newArray);
  };

  useEffect(() => {
    axios.get("http://localhost:3005/api/booking").then((result) => {
      console.log("hereeeeee is the get result:", result.data);
      setBooking(result.data);
      convertToArray(result.data);
    });
  }, []);

  const createBooking = (data) => {    
    console.log("see see", data);
    if(!data.student_id || !data.start_date || !data.test_id){
      // return alert('Please choose a date before booking');          
      setShowalert(true);
      return;
    }
   
    
    axios
      .post("http://localhost:3005/api/booking", {
        student_id: data.student_id,
        test_id: data.test_id,
        start_date: data.start_date,
      })
      .then((result) => {
        console.log("post result isss:", result);
        navigate(`/dashboard`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="booking-container">
      {/* <div>Instructions</div> */}
      <h1>New Exam Appointment</h1>
      <div className="booking-wrapper">
        <div className="booking-date">
          <h2>1. Choose a date</h2>
          <DatePicker placeholderText="See available dates" selected={date} minDate={new Date()} onChange={(d) => setDate(d)} className="booking-datepicker" /> 
        </div>
        {datePopup &&
        <div className="alert">
            <h2 className='alert-header'>Warning!</h2>
            <p className="alert-body">Please choose a date before booking</p>
            <div className="alert-buttons">              
              <Button className="alert-button" onClick={() => setDatePopup(false)}>Okay</Button> 
            </div>
        </div>
        }
        { showalert &&         
            <div className="alert">
              <h2 className='alert-header'>Warning!</h2>
              <p className="alert-body">Please select a date first!</p>
              <div className="alert-buttons">
                <Button className="alert-button" onClick={() => setShowalert(false)}>Close</Button> 
              </div>
            </div>
        }
        <div className="booking-list">
          <h2>2. Select an exam</h2>
          { bookingList.map((booking) => {
          return (             
          <div className="booking-list-item">
            <div>{booking.type}</div>
            <Button variant="contained" className="booking-button"
                          onClick={() => {
                console.log("hellooooo")
              createBooking({
                student_id: user.id,
                test_id: booking.id,
                start_date: date
              })}}>Book</Button>
          </div>
          )
          })} 
        </div>


      {/* <div>
        <label className="booking-label">Please choose a date</label>
        <DatePicker
          selected={date}
          minDate={new Date()}
          onChange={(d) => setDate(d)}
          className="booking-datepicker"
        />
      </div>
    
      <div className="booking-list">
        <label className="booking-label">Exam Type</label>
        {bookingList.map((booking) => {
          return (
            <div className="booking-list-item">
              <div>{booking.type}</div>
              <button
                className="booking-button"
                onClick={() => {
                  console.log("hellooooo");
                  createBooking({
                    student_id: user.id,
                    test_id: booking.id,
                    start_date: date,
                  });
                }}
              >
                Book
              </button>
            </div>
          );
        })}*/}
      </div> 
    </div>
  );
}
