import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Meditation App</h1>
      <p>Enter an affirmation or select a meditation:</p>
      <button onClick={() => navigate("/meditation")}>Start Meditation</button>
    </div>
  );
}

export default Home;
