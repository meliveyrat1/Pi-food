import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import video from './landing page food.mp4';


//COMPONENTE FUNCIONAL
export default function LandingPage() {
  return (
    <div className="landing">
      <video src={video} autoPlay loop/>
      <div className="contiene">
        <Link to="/home">
          <span id="span1"></span>
          <button className="landing_button">HOME</button>
        </Link>
      </div>
      {/* <video muted autoPlay loop>
        <source src={videocomida} type="video/mp4" />
      </video>
      <div className="capa"></div> */}
    </div>
  );
}
