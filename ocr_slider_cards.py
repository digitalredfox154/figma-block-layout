import pytesseract
from PIL import Image
import os

# Let's crop each image into 3 equal horizontal parts (for the 3 cards)
# and OCR the top part of each card.
# The card region typically starts from y_start to y_end, and x is split into 3 columns.

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
    
    # We want to crop the 3 cards.
    # The cards are in a row. Let's divide the width into 3 parts.
    # Card 1: x from 0.05 to 0.35, Card 2: x from 0.35 to 0.65, Card 3: x from 0.65 to 0.95
    # y is from 0.22 to 0.78
    
    y_start = int(h * 0.22)
    y_end = int(h * 0.78)
    
    col_width = int(w / 3)
    
    for idx, card_id in enumerate(card_ids):
        # We crop the card with some padding
        x_start = int(idx * col_width + w * 0.02)
        x_end = int((idx + 1) * col_width - w * 0.02)
        
        # We only need the top ~50% of the card where the text is (the bottom has the 3D render)
        card_text_end = y_start + int((y_end - y_start) * 0.55)
        
        card_img = img.crop((x_start, y_start, x_end, card_text_end))
        
        # Upscale and binarize or convert to grayscale for perfect OCR
        card_img = card_img.convert('L')
        card_img = card_img.resize((card_img.width * 4, card_img.height * 4), Image.Resampling.LANCZOS)
        
        text = pytesseract.image_to_string(card_img, lang="rus+eng")
        print(f"=== Card {card_id} ===")
        print(text.strip())
        print("-" * 30)
