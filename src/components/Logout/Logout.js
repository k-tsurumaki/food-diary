import React from "react";
import { signOut } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const logout = () => {
    // Googleでログイン
    signOut(auth, provider).then((results) => {
      // ローカルストレージの内容を消去
      localStorage.clear();

      setIsAuth(false);
      
      // ログアウトするとLoginにリダイレクト
      navigate("/login");
    });
  };
  return (
    <div>
      <p>ログアウトする</p>
      <button onClick={logout}>ログアウトする</button>
    </div>
  );
};

export default Logout;
