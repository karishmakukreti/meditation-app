import React, { useState, useEffect } from "react";
import { getAffirmation } from "../api/openaiService";
import { useSpeechSynthesis } from "react-speech-kit";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import meditationAnimation from "../assets/meditation.json"; // Place animation file here

function Meditation() {
  const [affirmation, setAffirmation] = useState("Loading affirmation...");
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    async function fetchAffirmation() {
      const generatedAffirmation = await getAffirmation();
      setAffirmation(generatedAffirmation);
    }
    fetchAffirmation();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", position: "relative" }}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        Relax & Meditate
      </motion.h1>

      {/* Display Animated Meditation Background */}
      <Lottie animationData={meditationAnimation} style={{ height: "300px", margin: "auto" }} />

      <motion.p
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}
      >
        {affirmation}
      </motion.p>

      <button
        onClick={() => speak({ text: affirmation })}
        style={{ marginTop: "20px", padding: "10px", cursor: "pointer" }}
      >
        Play Meditation
      </button>
    </div>
  );
}

export default Meditation;
