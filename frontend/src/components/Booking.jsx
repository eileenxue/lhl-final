import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { EMAIL_ID } from "../setting";

export default function Booking(props) {
  const [user, setUser] = useState({});
  const [booking, setBooking] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [date, setDate] = useState();
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
    // console.log("who is the user???", parsedUser);
  }, []);

  const convertToArray = (obj) => {
    let newArray = [];
    for (let o in obj) {
      // console.log(obj[o]);
      newArray.push(obj[o]);
    }
    setBookingList(newArray);
  };

  useEffect(() => {
    axios.get("http://localhost:3005/api/booking").then((result) => {
      // console.log("hereeeeee is the get result:", result.data);
      setBooking(result.data);
      convertToArray(result.data);
    });
  }, []);

  const createBooking = (data) => {
    // console.log("see see", data);
    axios
      .post("http://localhost:3005/api/booking", {
        student_id: data.student_id,
        test_id: data.test_id,
        start_date: data.start_date,
      })
      .then((result) => {
        // console.log("post result isss:", result);
        navigate(`/dashboard`);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  function sendEmail(e) {
    e.preventDefault();
    console.log(e.target);
    emailjs
      .sendForm("service_eguwnjj", "template_8q3umci", e.target, {
        EMAIL_ID,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>
        <p name="user_email"> {user.email}</p>
        <p name="user_firstname"> {user.first_name}</p>
        <div>Please choose a date</div>
        <DatePicker
          name="selected_date"
          selected={date}
          minDate={new Date()}
          onChange={(d) => setDate(d)}
        />
      </div>
      <table style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Exam Type</th>
            <th></th>
          </tr>
        </thead>
        {bookingList.map((booking) => {
          return (
            <tr>
              <td name="booking_type">{booking.type}</td>
              <td>
                <button
                  onClick={(e) => {
                    console.log("hellooooo");
                    // {sendEmail(e)};
                    createBooking({
                      student_id: user.id,
                      test_id: booking.id,
                      start_date: date,
                    });
                  }}
                >
                  Book
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
