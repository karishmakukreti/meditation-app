import React, { useEffect } from "react";

function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio("/meditation-music.mp3"); // Place this file in /public
    audio.loop = true;
    audio.play();
  }, []);

  return null; // No UI needed
}

export default BackgroundMusic;
