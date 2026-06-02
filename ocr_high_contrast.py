import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
import os

files_info = [
    ("Снимокэкрана2026-06-02в17.58.16.png", [1, 2, 3]),
    ("Снимокэкрана2026-06-02в17.59.40.png", [4, 5, 6]),
    ("Снимокэкрана2026-06-02в17.59.51.png", [7, 8, 9])
]

for filename, card_ids in files_info:
    path = os.path.join("/home/ubuntu/upload", filename)
    if not os.path.exists(path):
        continue
    img = Image.open(path)
    w, h = img.size
    col_width = int(w / 3)
    
    for idx, card_id in enumerate(card_ids):
        # Let's crop the text area of the card carefully
        x_start = int(idx * col_width + w * 0.02)
        x_end = int((idx + 1) * col_width - w * 0.02)
        
        y_start = int(h * 0.22)
        y_end = int(h * 0.52) # Keep it to text only
        
        card_img = img.crop((x_start, y_start, x_end, y_end))
        
        # Apply filters to make white text on colored background extremely readable
        card_img = card_img.convert('L')
        card_img = card_img.resize((card_img.width * 5, card_img.height * 5), Image.Resampling.LANCZOS)
        
        # Enhance contrast
        enhancer = ImageEnhance.Contrast(card_img)
        card_img = enhancer.enhance(3.0)
        
        # Binarize
        card_img = card_img.point(lambda x: 0 if x < 150 else 255, '1')
        
        text = pytesseract.image_to_string(card_img, lang="rus")
        print(f"=== Card {card_id} ===")
        print(text.strip())
        print("-" * 30)
