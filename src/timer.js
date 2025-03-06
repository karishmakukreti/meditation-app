import React, { useState, useEffect } from "react";

const Timer = ({ initialTime = 300 }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div>
      <h2>Meditation Timer</h2>
      <h1>{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
