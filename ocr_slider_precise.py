import pytesseract
from PIL import Image
import os

# Let's crop Card 1, 7, 8, 9 with slightly different vertical ranges to capture the full titles and descriptions cleanly.
img1 = Image.open("/home/ubuntu/upload/Снимокэкрана2026-06-02в17.58.16.png")
img3 = Image.open("/home/ubuntu/upload/Снимокэкрана2026-06-02в17.59.51.png")

# Card 1 is column 0 of img1
w1, h1 = img1.size
card1 = img1.crop((int(w1*0.02), int(h1*0.22), int(w1*0.33), int(h1*0.55)))
card1 = card1.convert('L').resize((card1.width * 4, card1.height * 4), Image.Resampling.LANCZOS)
print("=== CARD 1 PRECISE ===")
print(pytesseract.image_to_string(card1, lang="rus"))

# Card 7, 8, 9 are columns 0, 1, 2 of img3
w3, h3 = img3.size
col_w3 = w3 / 3

for i, card_id in enumerate([7, 8, 9]):
    card = img3.crop((int(i*col_w3 + w3*0.02), int(h3*0.22), int((i+1)*col_w3 - w3*0.02), int(h3*0.55)))
    card = card.convert('L').resize((card.width * 4, card.height * 4), Image.Resampling.LANCZOS)
    print(f"=== CARD {card_id} PRECISE ===")
    print(pytesseract.image_to_string(card, lang="rus"))
