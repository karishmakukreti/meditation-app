import React, { useRef } from 'react';
import meditationImage from "./assets/meditation-image.png"; // Ensure the image is inside src/assets

const Meditation = () => {
    const audioRef = useRef(null);

    // Play Music
    const handlePlayMusic = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    // Read Aloud Affirmation
    const readAffirmation = () => {
        const text = `My sweet child, I have always been with you.
        You are never alone. You have done well, and you will continue to shine.
        Surrender all your worries to me. Let me take care of everything.
        You are free. You are light. You are loved. You are deeply loved, always protected, and eternally connected to Baba.`;
    
        const speech = new SpeechSynthesisUtterance(text);
    
        // Delay execution to ensure voices are loaded
        setTimeout(() => {
            const voices = window.speechSynthesis.getVoices();
            
            // Select an Indian Female Voice
            speech.voice = voices.find(voice => voice.name.includes("Google English (India)")) 
                         || voices.find(voice => voice.name.includes("Microsoft Heera"))
                         || voices[0]; // Default to first available voice
    
            speech.rate = 0.9; // Slightly slower for a calming effect
            speech.pitch = 1.2; // Softer and more relaxing voice tone
    
            window.speechSynthesis.speak(speech);
        }, 200); // Delay to allow voices to load
    };
    

    return (
        <div className="meditation-container">
            {/* Meditation Image */}
            <img src={meditationImage} alt="Peaceful Meditation" className="meditation-img" />

            <div className="meditation-card">
                <h1 className="app-title">🧘 Welcome to My Meditation App</h1>
                <h2 className="section-title">Meditation Session</h2>
                <h3 className="timer-text">🕰 Meditation Timer: <span>4:26</span></h3>

                <h3 className="section-title">🌿 Daily Affirmation</h3>
                <p className="affirmation-text">My sweet child, I have always been with you.You are never alone. You have done well, and you will continue to shine. Surrender all your worries to me. Let me take care of everything. You are free. You are light. You are loved. You are deeply loved, always protected, and eternally connected to Baba.  
                </p>

                {/* Buttons */}
                <div className="button-group">
                    <button className="action-button read-button" onClick={readAffirmation}>
                        🎙 Read Aloud
                    </button>
                    <button className="action-button play-button" onClick={handlePlayMusic}>
                        🎵 Play Music
                    </button>
                </div>

                {/* Audio Player */}
                <audio ref={audioRef} controls loop className="audio-player">
                    <source src="/meditation-music.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
};

export default Meditation;
