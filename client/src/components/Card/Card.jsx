import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ title, image, diets, id }) {
  return (
    <Link to={`/recipes/${id}`}>
    
    <div className="card">
      
    <h3 className="card_info1">{title} <h5 className="card_info2">Diets: {diets}</h5></h3>
    
    {/* <h2 className="title">Recipe Name</h2> */}
      {/* <div className="card_info">
       
        <h3 className="card_info1">{title}</h3>
      </div>
      <div className="card_info2">
        <h5 className="diets">Diets: {diets}</h5>
      </div> */}
      <div className="card_img">
        <img src={image} alt="img not found" width="365px" height="245px" />
      </div>
     
    </div>
    
    </Link>
  );
}
