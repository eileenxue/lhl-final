import axios from "axios";
import { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      setUser(res.data);
      // localStorage.setItem('storedUser', JSON.stringtify(res.data));
      // if (res.data.is_proctor) {
      //   redirect to the proctor . // useHistory
      // } else {redirect to student }
    } catch (err) {
      console.log(err);
    }
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
      {user ? (
        // if there is a current user
        <div className="home">
          <span>
            Welcome to the <b>{user.is_proctor ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.first_name}</b>.
          </span>
          {/* <span>checkout questions page :::</span> */}
          <button onClick={() => seeQuestions(user.id)}>see?</button>

          {!is_proctor && (
            // when student
            <DashboardStudent />
            // <span>
            //   You are not allowed to see anything as you are NOOOOOT proctor !
            // </span>
          )}

          {is_proctor && (
            // when proctor
            // <span>you can see stuff as you are a proctor.</span>
            <DashboardProctor />
          )}
        </div>
      ) : (
        // if there is not a current user
        <div className="login">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" onClick={() => navigate("/questions")}>
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
