import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import CreatePost from "./components/CreatePost/CreatePost";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Post from "./components/Post/Post";

function NavbarWrapper({ isAuth, setIsAuth }) {
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  return <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />;
}

function ProtectedRoutes({ isAuth, setIsAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuth && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isAuth, navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/createpost"
        element={<CreatePost isAuth={isAuth} />}
      ></Route>
      <Route path="/post/:postId" element={<Post isAuth={isAuth} />}></Route>
      <Route
        path="/login"
        element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
      ></Route>
    </Routes>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <div className="app">
        <NavbarWrapper isAuth={isAuth} setIsAuth={setIsAuth} />
        <ProtectedRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
      </div>
    </Router>
  );
}

export default App;
