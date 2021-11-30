import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { NavLink, useLocation, Navigate, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import "./MainHeader.scss";

export default function MainHeader() {
  const [user, setUser] = useState({});

  const storedUser = localStorage.getItem("storedUser");

  useEffect(() => {
    const parsedUser = JSON.parse(storedUser);
    console.log("from nav bar", parsedUser);
    setUser(parsedUser);
  }, []);

  const handleLogout = function () {
    localStorage.removeItem("storedUser");
    window.location.href = "/login";
  };

  return (
    <header>
      <nav className="nav">
        <div className="nav--logo">
          <NavLink to="/">👀 ExamAI</NavLink>
        </div>
        {storedUser ? (
          <div className="nav--auth">
            <div className="nav--auth-left">
              <ul>
                {!user.is_proctor && (
                  <Fragment>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                  <NavLink to="/booking">Book Exams</NavLink>
                </li>
                </Fragment>
                )}

                {user.is_proctor && (
                  <li>
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                )}
                
                {/* <li>
                  <NavLink to="/resources">Resources</NavLink>
                </li> */}
              </ul>
            </div>
            <div className="nav--auth-right">
              <div className="nav--auth-name">Hello {user.first_name}!</div>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <ul className="nav--list-right">
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
