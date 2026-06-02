import os
import pytesseract
from PIL import Image, ImageEnhance

def ocr_zoomed(image_path, name):
    img = Image.open(image_path)
    # Увеличиваем в 3 раза с качественным ресайзом
    img_large = img.resize((img.width * 3, img.height * 3), Image.Resampling.LANCZOS)
    
    # Делаем черно-белым и повышаем контраст
    gray = img_large.convert('L')
    enhancer = ImageEnhance.Contrast(gray)
    enhanced = enhancer.enhance(3.0)
    
    text = pytesseract.image_to_string(enhanced, lang="rus")
    print(f"=== Zoomed OCR for {name} ===")
    print(text)
    print("="*50)

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
        ocr_zoomed(path, name)
