import axios from "axios";
import { useState, useHistory } from "react";
import { useNavigate } from "react-router-dom"; // hold the previous page you were in

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import './Login.scss';

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [is_proctor, setIs_proctor] = useState(false);

  let navigate = useNavigate();

  // handle api request

  const handleLogin = async (e) => {
    // alert ('whatttttebver')
    console.log("===================== react login", email, password);
    // e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      console.log(res.data);
      const user = JSON.stringify(res.data);
      localStorage.setItem("storedUser", user);
      setUser(res.data);
      if (res.data.is_proctor) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
      // localStorage.setItem('storedUser', JSON.stringtify(res.data));
      // if (res.data.is_proctor) {
      //   redirect to the proctor . // useHistory
      // } else {redirect to student }

      // ********************************* main *********************************
      // console.log("response:", res.data);
      // let id = res.data.id
      // navigate(`/chat/${id}`)
      // ********************************* main *********************************

    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = function () {};

  // const storedUser = JSON.parse(localStorage.getItem('stlocalStorageoredUser'));

  const seeQuestions = async (id) => {
    // setSuccess(false);

    // setError(false);
    setIs_proctor(false);
    try {
      await axios.get("/dashboard", {
        // headers: { authorization: "Bearer " + storedUser.accessToken },
        headers: { authorization: "Bearer " + user.accessToken },
      });
      // setDash
      setIs_proctor(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="login">
        <h1>👋 Welcome back!</h1>
        {/* <p>Don't have an account yet? Register here.</p> */}
        <form className="login--form" onSubmit={(e) => e.preventDefault()}>
          <TextField
            required
            id="outlined-required"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            variant="outlined" 
            type="submit" 
            onClick={() => handleLogin()}> Login
          </Button>
        </form>
      </div>
  );
}

export default Login;
