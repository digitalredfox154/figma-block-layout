import os
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

def preprocess_image(image_path):
    img = Image.open(image_path)
    # Переводим в градации серого
    gray = img.convert('L')
    # Увеличиваем контрастность
    enhancer = ImageEnhance.Contrast(gray)
    enhanced = enhancer.enhance(2.0)
    # Слегка размываем для удаления шумов, затем применяем пороговую фильтрацию
    # Но для Tesseract часто лучше просто передать увеличенное контрастное изображение
    return enhanced

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
        print(f"=== {name} ===")
        img = Image.open(path)
        print(f"Original size: {img.size}")
        
        # Сделаем OCR на предобработанном изображении
        processed = preprocess_image(path)
        text = pytesseract.image_to_string(processed, lang="rus")
        print(text)
        print("="*40)
