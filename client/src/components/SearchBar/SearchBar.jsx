import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("Please insert a name");
    } else {
      dispatch(getRecipesByName(name.toLocaleLowerCase()));
      setName("");
    }
  }

  return (
    <div>
      <input
        id="inputName"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="buttonSearch"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        SEARCH
      </button>
    </div>
  );
}
