import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import os

# Directory to save Murlis
DOWNLOAD_FOLDER = "english_murlis_html"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Base URL structure
BASE_URL = "https://www.babamurli.com/01.%20Daily%20Murli/02.%20English/01.%20Eng%20Murli%20-%20Htm/"

# Generate murli URLs for a date range
def generate_urls(start_date, end_date):
    urls = []
    current = start_date
    while current <= end_date:
        formatted_date = current.strftime("%d.%m.%y")
        full_url = f"{BASE_URL}{formatted_date}-E.htm"
        urls.append((formatted_date, full_url))
        current += timedelta(days=1)
    return urls

# Download and save Murli HTML
def download_murli(date_str, url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            filename = f"{date_str}.html"
            filepath = os.path.join(DOWNLOAD_FOLDER, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(response.text)
            print(f"✅ Downloaded: {filename}")
        else:
            print(f"⚠️ {date_str} - Murli not found (status {response.status_code})")
    except Exception as e:
        print(f"❌ Failed to download {date_str}: {e}")

if __name__ == "__main__":
    # Set your desired date range here
    start = datetime.strptime("01.01.2024", "%d.%m.%Y")
    end = datetime.strptime("06.04.2025", "%d.%m.%Y")

    murli_links = generate_urls(start, end)
    for date_str, url in murli_links:
        download_murli(date_str, url)

