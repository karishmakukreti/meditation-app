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
        const text = `Step 1: Grounding in the Present Moment. 
        Take a deep breath in… and slowly breathe out.
        Feel the gentle rhythm of your breath, the life force within you.
        Right now, in this moment, you are safe, loved, and at peace.`;

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';
        speech.rate = 0.9;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
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
                <p className="affirmation-text">
                    🌟 Step 1: Grounding in the Present Moment  
                    Take a deep breath in… and slowly breathe out.  
                    Feel the gentle rhythm of your breath, the life force within you.  
                    Right now, in this moment, you are safe, loved, and at peace.  
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
