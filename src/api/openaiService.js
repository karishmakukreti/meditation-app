import axios from "axios";

const OPENAI_API_KEY = "your_openai_api_key_here"; // Replace with your API key

export const getAffirmation = async () => {
  const prompt = "Generate a short spiritual affirmation inspired by Brahma Kumaris meditation.";

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching affirmation:", error);
    return "You are a divine soul, filled with light and peace.";
  }
};
