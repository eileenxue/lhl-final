import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";


function Login() {

const [user, setUser] = useState(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

const navigate = useNavigate()



  // handle api request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("pass", password);
      const res = await axios.post("/login", { email, password });
      setUser(res.data);
      console.log("response:", res.data);
      const id = res.data.id
      // navigate(`/chat/${id}`)
      const is_proctor = res.data.is_proctor;
      navigate(`/dashboard`, {state:{is_proctor}})
    } catch (err) {
      console.log(err);
    }
  };

  const seeQuestions = async (id) => {
    setSuccess(false);
    setError(false);
    try {
      await axios.get("/questions", {
        headers: { authorization: "Bearer " + user.accessToken },
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="App">

      

      {user ? (
        <div className="home">
          <span>
            Welcome to the <b>{user.is_proctor ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.first_name}</b>.
          </span>
          <span>checkout questions page :::</span>
          <button  onClick={() => seeQuestions(user.id)}>
            see? 
          </button>

          {error && (
            <span >
              You are not allowed to see anything as you are NOOOOOT proctor !
              
            </span>
          )}
          {success && (
            <span >
              you can see stuff as you are a proctor.
            </span>
          )}
        </div>
      ) : (
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
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      )}

    </div>
  );



}

export default Login;
