from sentence_transformers import SentenceTransformer
import json
import numpy as np

# Load your chunked JSON
with open("murlis_chunked.json", "r", encoding="utf-8") as f:
    murli_chunks = json.load(f)

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')  # Good balance of speed & quality

# Generate embeddings
texts = [chunk["text"] for chunk in murli_chunks]
embeddings = model.encode(texts, show_progress_bar=True)

# Save for FAISS
np.save("murli_embeddings.npy", embeddings)
with open("murli_texts.json", "w", encoding="utf-8") as f:
    json.dump(texts, f, ensure_ascii=False)
