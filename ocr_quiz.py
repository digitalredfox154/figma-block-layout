import os
import pytesseract
from PIL import Image

screenshots = [
    ("q1", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.43.50.png"),
    ("q2", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.10.png"),
    ("q3", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.20.png"),
    ("q4", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.30.png"),
    ("q5", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.39.png"),
    ("q6", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.53.png"),
    ("q7", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.45.07.png")
]

for name, path in screenshots:
    if os.path.exists(path):
        print(f"=== OCR for {name} ({os.path.basename(path)}) ===")
        try:
            text = pytesseract.image_to_string(Image.open(path), lang="rus")
            print(text)
        except Exception as e:
            print(f"Error: {e}")
        print("\n" + "="*50 + "\n")
    else:
        print(f"File {path} does not exist.")
