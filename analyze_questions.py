import os
import pytesseract
from PIL import Image

def analyze_image(path, name):
    img = Image.open(path)
    width, height = img.size
    print(f"=== {name} ({width}x{height}) ===")
    
    # Сделаем OCR по половинкам или четвертям для лучшего распознавания
    # Левая колонка (вопросы/шапка) обычно занимает левые 30-40%
    # Правая колонка (варианты ответов) занимает правые 60-70%
    left_box = (0, 0, int(width * 0.35), height)
    right_box = (int(width * 0.35), 0, width, height)
    
    left_img = img.crop(left_box).resize((int(width * 0.35) * 2, height * 2), Image.Resampling.LANCZOS)
    right_img = img.crop(right_box).resize((int(width * 0.65) * 2, height * 2), Image.Resampling.LANCZOS)
    
    left_text = pytesseract.image_to_string(left_img, lang="rus")
    right_text = pytesseract.image_to_string(right_img, lang="rus")
    
    print("LEFT COLUMN (Title / Question):")
    print(left_text.strip())
    print("\nRIGHT COLUMN (Options):")
    print(right_text.strip())
    print("="*60 + "\n")

screenshots = [
    ("q2", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.10.png"),
    ("q3", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.20.png"),
    ("q4", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.30.png"),
    ("q5", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.39.png"),
    ("q6", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.53.png"),
    ("q7", "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.45.07.png")
]

for name, path in screenshots:
    if os.path.exists(path):
        analyze_image(path, name)
