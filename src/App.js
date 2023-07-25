import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home/Home";
import CreatePost from "./components/CreatePost/CreatePost";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import Post from "./components/Post/Post";

function NavbarWrapper({ isAuth }) {
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  return <Navbar isAuth={isAuth} />;
}

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <div className="app">
        <NavbarWrapper isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/createpost"
            element={<CreatePost isAuth={isAuth} />}
          ></Route>
          <Route
            path="/post/:postId"
            element={<Post isAuth={isAuth} />}
          ></Route>
          <Route
            path="/login"
            element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
          ></Route>
          <Route
            path="/logout"
            element={<Logout setIsAuth={setIsAuth} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
