import pytesseract
from PIL import Image
import os

files = [
    "Снимокэкрана2026-06-02в17.58.16.png",
    "Снимокэкрана2026-06-02в17.59.40.png",
    "Снимокэкрана2026-06-02в17.59.51.png"
]

for f in files:
    path = os.path.join("/home/ubuntu/upload", f)
    if os.path.exists(path):
        print(f"=== OCR for {f} ===")
        try:
            img = Image.open(path)
            # Resize for better OCR accuracy
            img = img.resize((img.width * 2, img.height * 2), Image.Resampling.LANCZOS)
            text = pytesseract.image_to_string(img, lang="rus+eng")
            print(text)
        except Exception as e:
            print(f"Error: {e}")
