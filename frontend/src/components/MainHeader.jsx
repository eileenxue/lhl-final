import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import './MainHeader.scss';

export default function MainHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="info">
      <Toolbar>
        <Typography variant="h3" component={NavLink} sx={{ flexGrow: 1 }} to="/">
           👀
        </Typography>

        {/* When not logged in */}
        <Button color="inherit" component={NavLink} to="/login">Login</Button>
        <Button color="inherit" component={NavLink} to="/register">Register</Button>

        </Toolbar>
      </AppBar>
      <header>
        <nav>
          <div>Test Nav</div>
          <ul className="nav-list-right">
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Box>
  );
}