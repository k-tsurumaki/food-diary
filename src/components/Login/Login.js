import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const loginInWithGoogle = () => {
    // Googleでログイン
    signInWithPopup(auth, provider).then((results) => {
      // ローカルストレージに保存
      localStorage.setItem("isAuth", true);

      setIsAuth(true);
      
      // ログインするとHomeにリダイレクト
      navigate("/");
    });
  };
  return (
    <div>
      <p>ログイン</p>
      <button onClick={loginInWithGoogle}>googleでログイン</button>
    </div>
  );
};

export default Login;
