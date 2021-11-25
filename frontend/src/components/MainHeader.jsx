import { NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import './MainHeader.scss';

export default function MainHeader() {

  function RequireAuth() {
    let userLoggedin = localStorage.getItem("storedUser");
    let location = useLocation();
    if (!userLoggedin) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
  }

  let userLoggedin = localStorage.getItem("storedUser");

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
          { userLoggedin ? (
            <button
            onClick={() => {
              handleLogout();
            }}
          > Logout</button>
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