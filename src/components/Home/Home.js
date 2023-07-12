import React from "react";
import Timeline from "../Timeline/Timeline";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css"

const Home = () => {
  return (
    <div className="homePage">
      <Timeline />
      <Sidebar />
    </div>
  );
};

export default Home;
