import React from "react";
import { Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';

import "./Navbar.css";

const Navbar = ({ isAuth }) => {
  return (
    <nav>
      <RestaurantIcon className="icon" />
      <div className="links">
        <Link to="/">
          <HomeIcon />
          Home
        </Link>
        <Link to="/createpost">
          <PostAddIcon />
          Post
        </Link>
        {!isAuth ? (
          <Link to="/login">
            <LoginIcon />
            Login
          </Link>
        ) : (
          <Link to="/logout">
            <LogoutIcon />
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
