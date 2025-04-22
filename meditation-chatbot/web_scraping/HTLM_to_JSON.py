import os
import json
from bs4 import BeautifulSoup
from pathlib import Path
import re
from textwrap import wrap

INPUT_FOLDER = "english_murlis_html"
OUTPUT_JSON = "murlis_chunked.json"
CHUNK_SIZE = 500  # Approximate characters per chunk

def clean_html_to_text(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    text = soup.get_text(separator="\n")
    text = re.sub(r'\n+', '\n', text)  # remove extra newlines
    return text.strip()

def chunk_text(text, chunk_size=CHUNK_SIZE):
    return wrap(text, chunk_size)

def process_murlis():
    all_chunks = []

    for file in Path(INPUT_FOLDER).glob("*.html"):
        date_str = file.stem
        with open(file, "r", encoding="utf-8") as f:
            html = f.read()
        cleaned_text = clean_html_to_text(html)
        chunks = chunk_text(cleaned_text)

        for idx, chunk in enumerate(chunks):
            all_chunks.append({
                "date": date_str,
                "chunk_id": idx + 1,
                "text": chunk
            })

    with open(OUTPUT_JSON, "w", encoding="utf-8") as out:
        json.dump(all_chunks, out, ensure_ascii=False, indent=2)
    print(f"✅ Saved {len(all_chunks)} chunks to {OUTPUT_JSON}")

if __name__ == "__main__":
    process_murlis()
