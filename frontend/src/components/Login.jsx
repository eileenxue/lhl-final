import axios from "axios";
import { useState, useHistory } from "react";
import DashboardProctor from "./Dashboard_proctor";
import DashboardStudent from "./Dashboard_student";
import { useNavigate } from "react-router-dom"; // hold the previous page you were in


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
      console.log(res.data)
      const user = JSON.stringify(res.data); 
      localStorage.setItem('storedUser', user);
      setUser(res.data);
      if (res.data.is_proctor){
        navigate('/admin')
      }
      else {navigate('/dashboard')}
      // localStorage.setItem('storedUser', JSON.stringtify(res.data));
      // if (res.data.is_proctor) {
      //   redirect to the proctor . // useHistory
      // } else {redirect to student }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = function () { 

  };

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
    <div className="App">

        <div className="login">
          <form onSubmit={e => e.preventDefault()  }>
            <span className="formTitle"> Login</span>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={()=>handleLogin() } >
              Login
            </button>

            

          </form>
        </div>
    </div>
  );
}

export default Login;
