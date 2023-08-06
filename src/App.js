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

function NavbarWrapper({ isAuth, setIsAuth, photoURL, setPhotoURL }) {
  const location = useLocation();
  // ログインページでは表示しない
  if (location.pathname === "/login") {
    return null;
  }
  return (
    <Navbar
      isAuth={isAuth}
      setIsAuth={setIsAuth}
      photoURL={photoURL}
      setPhotoURL={setPhotoURL}
    />
  );
}

function ProtectedRoutes({ isAuth, setIsAuth, photoURL, setPhotoURL }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ログインしてない場合はログインページにリダイレクト
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
        element={
          <Login
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            photoURL={photoURL}
            setPhotoURL={setPhotoURL}
          />
        }
      ></Route>
    </Routes>
  );
}

function App() {
  // ローカルストレージに保存
  // ・認証情報
  // ・アイコン画像へのパス
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [photoURL, setPhotoURL] = useState(localStorage.getItem("photoURL"));

  // console.log(photoURL);

  return (
    <Router>
      <div className="app">
        <NavbarWrapper
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          photoURL={photoURL}
          setPhotoURL={setPhotoURL}
        />
        <ProtectedRoutes
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          photoURL={photoURL}
          setPhotoURL={setPhotoURL}
        />
      </div>
    </Router>
  );
}

export default App;
