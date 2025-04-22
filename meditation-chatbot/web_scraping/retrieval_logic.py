from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
from transformers import pipeline

# Load
texts = json.load(open("murli_texts.json"))
index = faiss.read_index("murli_faiss.index")
embedder = SentenceTransformer("all-MiniLM-L6-v2")
generator = pipeline("text2text-generation", model="google/flan-t5-base")

def ask_baba(question):
    question_vec = embedder.encode([question])
    D, I = index.search(np.array(question_vec), k=3)
    context = " ".join([texts[i] for i in I[0]])
    prompt = f"Context: {context}\n\nQuestion: {question}\nAnswer:"
    response = generator(prompt, max_length=200)[0]['generated_text']
    return response

# Try it
print(ask_baba("What does Baba say about peace of mind?"))
