import axios from "axios";
import { useState } from "react";

function Registration(db) {
  const [first_nameReg, setFirst_nameReg] = useState("");
  const [last_nameReg, setLast_nameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [is_proctorReg, setIs_proctorReg] = useState(false);
  const [passwordReg, setPasswordReg] = useState("");



  const register = () => {
    axios
      .post("/register", {
        first_name: first_nameReg,
        last_name: last_nameReg,
        email: emailReg,
        is_proctor: is_proctorReg,
        password: passwordReg,
      })
      .then((response) => console.log(`from post ${response}`));
  };

  const handleOnChange = () => {
    setIs_proctorReg(!is_proctorReg);
  };

  return (
      <div>
        <h1> Registration</h1>
        <label> First Name</label>
        <input
          type="text"
          onChange={(event) => {
            setFirst_nameReg(event.target.value);
          }}
        />
        <label> Last Name</label>
        <input
          type="text"
          onChange={(event) => {
            setLast_nameReg(event.target.value);
          }}
        />
        <label> Email</label>
        <input
          type="email"
          onChange={(event) => {
            setEmailReg(event.target.value);
          }}
        />
        <label> Proctor</label>
        <input
          type="checkbox"
          checked={is_proctorReg}
          onChange={handleOnChange}
        />
        <label> Password</label>
        <input
          type="text"
          onChange={(event) => {
            setPasswordReg(event.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>
  );
}

export default Registration;
