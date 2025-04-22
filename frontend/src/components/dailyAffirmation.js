import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyAffirmation = () => {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    axios.get("https://www.affirmations.dev/")
      .then(response => setAffirmation(response.data.affirmation))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Today's Affirmation</h2>
      <p>{affirmation}</p>
    </div>
  );
};

export default DailyAffirmation;
