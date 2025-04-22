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
        const text = `Meditation focused on peace, self-reflection, and surrendering with powerful affirmations.  
Grounding in the Present Moment 
Sit in a comfortable position. Gently close your eyes.  
Take a deep breath in… hold for a moment and slowly exhale.  
Feel your body relaxing with each breath.  
Let go of any tension in your shoulders, face, and hands.  
Be fully present in this moment.  

Slowing Down the Mind 
Focus on your natural breath, flowing in and out.  
With each inhale, feel calmness entering your body.  
With each exhale, release any stress, any worries.  
Allow your thoughts to slow down, becoming light like clouds passing in the sky.  

Connecting to Divine Light 
Imagine a soft, golden light above you, gentle and warm.  
This light is presence, always guiding and protecting you.  
Visualize this light slowly descending, surrounding you like a cocoon of peace.  
You feel safe, deeply loved, and completely at ease.  

Self-Reflection and Letting Go
Reflect on your life’s journey—the challenges, the joys, the lessons.  
Every experience has shaped you, bringing you to this moment.  
There is nothing to regret, nothing to fear.  
You are exactly where you are meant to be.  
Surrender all worries, all uncertainties.  

Affirmation: 
"I trust that everything is unfolding perfectly"

Feel a deep sense of relief, knowing you don’t have to control everything.    

Expanding Inner Peace 
This golden light now fills your entire being.  
Feel it flowing into every cell, releasing any heaviness.  
Your heart is light. Your mind is clear.  
There is nothing to do, nowhere to go—just be in this moment of pure stillness.  

Affirmation: 
"I am peaceful, I am light, I am free." 

Receiving Message 
In this stillness, imagine presence near you.  
Feel His gentle, reassuring energy.  
You are always protected. You are never alone. Let go of all fear. You are pure, powerful, and deeply loved."  

Allow His words to sink into your heart.  

Returning with Lightness 
Slowly bring awareness back to your body.  
Feel your breath, soft and steady.  
Wiggle your fingers and toes gently.  
Take a final deep breath, inhaling peace, exhaling gratitude.  
When you are ready, open your eyes softly.  

Affirmation: 
"I carry light within me. I am calm, I am strong, I am guided."  

Sit in this peaceful energy for a few moments before moving back into your day.`;
    
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
                <p className="affirmation-text">Meditation focused on peace, self-reflection, and surrendering with powerful affirmations.  
Grounding in the Present Moment 
Sit in a comfortable position. Gently close your eyes.  
Take a deep breath in… hold for a moment and slowly exhale.  
Feel your body relaxing with each breath.  
Let go of any tension in your shoulders, face, and hands.  
Be fully present in this moment.  

Slowing Down the Mind 
Focus on your natural breath, flowing in and out.  
With each inhale, feel calmness entering your body.  
With each exhale, release any stress, any worries.  
Allow your thoughts to slow down, becoming light like clouds passing in the sky.  

Connecting to  Divine Light 
Imagine a soft, golden light above you, gentle and warm.  
This light is  presence, always guiding and protecting you.  
Visualize this light slowly descending, surrounding you like a cocoon of peace.  
You feel safe, deeply loved, and completely at ease.  

Self-Reflection and Letting Go
Reflect on your life’s journey—the challenges, the joys, the lessons.  
Every experience has shaped you, bringing you to this moment.  
There is nothing to regret, nothing to fear.  
You are exactly where you are meant to be.  
Surrender all worries, all uncertainties to .  

Affirmation: 
"I trust that everything is unfolding perfectly"

Feel a deep sense of relief, knowing you don’t have to control everything.    

Expanding Inner Peace 
This golden light now fills your entire being.  
Feel it flowing into every cell, releasing any heaviness.  
Your heart is light. Your mind is clear.  
There is nothing to do, nowhere to go—just be in this moment of pure stillness.  

Affirmation: 
"I am peaceful, I am light, I am free." 

Receiving Message 
In this stillness, imagine presence near you.  
Feel His gentle, reassuring energy.  
You are always protected. You are never alone. Let go of all fear. You are pure, powerful, and deeply loved."  

Allow His words to sink into your heart.  

Returning with Lightness 
Slowly bring awareness back to your body.  
Feel your breath, soft and steady.  
Wiggle your fingers and toes gently.  
Take a final deep breath, inhaling peace, exhaling gratitude.  
When you are ready, open your eyes softly.  

Affirmation: 
"I carry light within me. I am calm, I am strong, I am guided."  

Sit in this peaceful energy for a few moments before moving back into your day. 
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
