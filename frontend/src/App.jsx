import logo from "./logo.svg";
import "./App.css";
import UserList from "./components/UserList";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";
import Question from "./components/Question";
// import AppointmentList from './components/AppointmentList';
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [is_proctor, setIs_proctor] = useState(false);

  const login = (userId) => {
    axios.get("/api/login", { userId }).then((res) => setCurrentUser(res.data));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1> super exam </h1>
        <header>
          <nav>
            <Link to="/test">Test</Link>
            <Link to="/question">Question</Link>
            {!currentUser && <Link to="/login"> Login / Register </Link>}
          </nav>
        </header>

        {/* {!currentUser && (
          <button onClick={() => setCurrentUser({ first_name: "Bobby" })}>
  
            Login
          </button>
        )}
        {currentUser && <Dashboard />} */}

        <button onClick={() => setIs_proctor({ is_proctor: true })}>
          i am a proctor
        </button>


        {!is_proctor && (
          <section>
            id: 2, user_id: 2, is_proctor: false, start_date: "2021-11-20",
            test_id: 1
          </section>
        )}

        {is_proctor && (
          <section>
            id: 2, user_id: 2, is_proctor: false, start_date: "2021-11-20",
            test_id: 1, id: 3, user_id: 3, is_proctor: true, start_date:
            "2021-11-20", test_id: 2
          </section>
        )}
      </div>

      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
