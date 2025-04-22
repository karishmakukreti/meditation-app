import streamlit as st
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
import google.generativeai as genai
import random

# ---------------------------
# CONFIG
# ---------------------------
st.set_page_config(page_title="Ask Baba - Chat", layout="centered")

# ---------------------------
# Load Resources
# ---------------------------
@st.cache_resource
def load_resources():
    with open("murli_texts.json", "r", encoding="utf-8") as f:
        texts_data = json.load(f)
    index = faiss.read_index("murli_faiss.index")
    embedder = SentenceTransformer("all-MiniLM-L6-v2")
    return texts_data, index, embedder

texts_data, index, embedder = load_resources()

# Configure Gemini
genai.configure(api_key="YOUR_GEMINI_API_KEY")  # Replace with your actual key
model = genai.GenerativeModel('gemini-1.5-pro')

# ---------------------------
# Helper Functions
# ---------------------------
def ask_baba_gemini(context, question):
    prompt = f"""
You are a divine spiritual guide speaking through Baba's Murlis.
Based on the context below, answer the question with wisdom, love, and clarity.

Context:
{context}

Question:
{question}

Answer:
"""
    response = model.generate_content(prompt)
    return response.text

def get_random_murli_quote():
    random_chunk = random.choice(texts_data)
    return random_chunk['text'], random_chunk['date']

# ---------------------------
# Initialize Session State
# ---------------------------
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
if "daily_blessing" not in st.session_state:
    quote, quote_date = get_random_murli_quote()
    st.session_state.daily_blessing = {"quote": quote, "date": quote_date}

# ---------------------------
# Streamlit UI
# ---------------------------
st.title("🌸 Ask Baba - Spiritual Chat (Gemini Powered) 🌸")

# 🌞 Daily Murli Blessing
st.markdown("### 🌞 Baba's Daily Blessing")
st.info(f"**\"{st.session_state.daily_blessing['quote']}\"**\n\n*— Murli Date: {st.session_state.daily_blessing['date']}*")

st.markdown("---")

# Chat Container
with st.container():
    for chat in st.session_state.chat_history:
        if chat["role"] == "user":
            st.markdown(f"**🧘‍♂️ You:** {chat['message']}")
        else:
            st.markdown(f"**🌼 Baba:** {chat['message']}")
            if "citation" in chat:
                st.caption(f"Murli Sources: {chat['citation']}")

# Input
with st.form("chat_form", clear_on_submit=True):
    user_question = st.text_input("Your Question", placeholder="Ask with your heart...")
    submitted = st.form_submit_button("Ask Baba")

if submitted and user_question.strip():
    # Embed & retrieve context
    question_vec = embedder.encode([user_question])
    D, I = index.search(np.array(question_vec), k=3)
    retrieved_chunks = [texts_data[i] for i in I[0]]
    context = "\n\n".join([chunk['text'] for chunk in retrieved_chunks])
    murli_dates = [chunk['date'] for chunk in retrieved_chunks]

    # Generate response
    with st.spinner("Connecting to Baba..."):
        baba_answer = ask_baba_gemini(context, user_question)

    # Save to chat history
    st.session_state.chat_history.append({"role": "user", "message": user_question})
    st.session_state.chat_history.append({
        "role": "baba",
        "message": baba_answer,
        "citation": ", ".join(murli_dates)
    })

# Reset Chat Button
st.sidebar.button("🧹 Start New Conversation", on_click=lambda: st.session_state.chat_history.clear())

st.markdown("---")
st.caption("Made with 💖 merging technology and spirituality - Powered by Gemini 1.5 Pro")
