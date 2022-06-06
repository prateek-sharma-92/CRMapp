import React from "react";
import Not from "../assets/404.svg";
import { useNavigate } from "react-router-dom";

function NotFound() {
  let navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <div className="d-flex justify-content-center align-items-center align-items-center vh-100">
      <div className="text-center">
        <h3>Hmm... This doesn't exist</h3>
        <p> Page does not exist</p>
        <img src={Not} alt="404" />
        <button onClick={goBack} className="btn btn-primary">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
