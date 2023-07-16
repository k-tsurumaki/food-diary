import React from "react";
import { Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { auth } from "../../firebase";
import "./Navbar.css";

const Navbar = ({ isAuth }) => {
  return (
    <nav>
      <Link to="/">
        <RestaurantIcon className="icon" />
      </Link>
      <div className="links">
        <Link to="/">
          <HomeIcon />
          Home
        </Link>
        {!isAuth ? (
          <Link to="/login">
            <LoginIcon />
            Login
          </Link>
        ) : (
          <>
            <Link to="/createpost">
              <PostAddIcon />
              Post
            </Link>
            <Link to="/logout">
              <LogoutIcon />
              Logout
            </Link>
            {/* <Avatar alt="Travis Howard" src={auth.currentUser.photoURL} /> */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
