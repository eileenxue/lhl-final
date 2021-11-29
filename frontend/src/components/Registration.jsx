import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import './Registration.scss';

function Registration(db) {
  const [first_nameReg, setFirst_nameReg] = useState("");
  const [last_nameReg, setLast_nameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [is_proctorReg, setIs_proctorReg] = useState(false);
  const [passwordReg, setPasswordReg] = useState("");

  const baseURL = "http://localhost:3005";

  let navigate = useNavigate();

  const register = () => {
    axios
      .post(`${baseURL}/api/register`, {
        first_name: first_nameReg,
        last_name: last_nameReg,
        email: emailReg,
        is_proctor: is_proctorReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(`from registration post ${response}`);
        navigate("/login");
      });
  };

  const handleOnChange = () => {
    setIs_proctorReg(!is_proctorReg);
  };

  return (
    <div>
      <h1> Registration</h1>
      <form className="registration--form">
        <TextField
          required
          id="outlined-required"
          label="First Name"
          onChange={(event) => {
            setFirst_nameReg(event.target.value);
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          onChange={(event) => {
            setLast_nameReg(event.target.value);
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={(event) => {
            setEmailReg(event.target.value);
          }}
        />

        {/* <label> Proctor</label> */}
        {/* <input
          required
          type="checkbox"
          class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3"
          checked={is_proctorReg}
          onChange={handleOnChange}
        /> */}
        Proctor <Checkbox required checked={is_proctorReg} 
          onChange={handleOnChange}
       />


        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setPasswordReg(event.target.value);
          }}
        />
        <Button variant="outlined" type="submit" onClick={register}>
          Register
        </Button>
      </form>
    </div>
  );
}

export default Registration;
