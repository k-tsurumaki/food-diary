import React from "react";
import { Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "./Navbar.css";
import AccountMenu from "../AccountMenu/AcountMenu";

const Navbar = ({ isAuth, setIsAuth, photoURL, setPhotoURL }) => {
  return (
    <nav>
      <Link to="/" className="appLink">
        {/* TODO：オリジナルのアイコンを作る */}
        <RestaurantIcon className="icon" />
        <h1 className="appName">Food Diary</h1>
      </Link>
      <div className="links">
        {/* 認証していれば表示する */}
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
            {/* <TemporaryDrawer anchor="right" anchorText="Search"/> */}
            <AccountMenu
              setIsAuth={setIsAuth}
              photoURL={photoURL}
              setPhotoURL={setPhotoURL}
            ></AccountMenu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
