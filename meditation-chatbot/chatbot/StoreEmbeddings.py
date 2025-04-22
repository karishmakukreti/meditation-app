import faiss
import numpy as np

# Load embeddings
embeddings = np.load("murli_embeddings.npy")

# Create FAISS index
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

# Save the index
faiss.write_index(index, "murli_faiss.index")
print("✅ FAISS index created and saved.")
