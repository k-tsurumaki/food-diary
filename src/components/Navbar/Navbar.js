import React from "react";
import { Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Navbar.css";

const Navbar = ({ isAuth }) => {
  return (
    <nav>
      <Link to="/" className="appLink">
        <RestaurantIcon className="icon" />
        <h1 className="appName">
          Food Diary
        </h1>
      </Link>
      <div className="links">
        {isAuth && (
          <>
            <Link to="/">
              <HomeIcon />
              Home
            </Link>
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
