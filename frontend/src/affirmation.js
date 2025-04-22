import React from "react";

const Affirmation = ({ text }) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h2>Daily Affirmation</h2>
      <p>{text}</p>
      <button onClick={speak}>🔊 Listen</button>
    </div>
  );
};

export default Affirmation;
