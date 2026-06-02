import pytesseract
from PIL import Image
import os

# Let's test different PSM (Page Segmentation Modes) for Card 1, 3, 7, 8, 9
img1 = Image.open("/home/ubuntu/upload/Снимокэкрана2026-06-02в17.58.16.png")
img3 = Image.open("/home/ubuntu/upload/Снимокэкрана2026-06-02в17.59.51.png")

w1, h1 = img1.size
w3, h3 = img3.size

# Card 1 (Column 0 of img1)
card1 = img1.crop((int(w1*0.02), int(h1*0.22), int(w1*0.33), int(h1*0.58)))
card1 = card1.convert('L').resize((card1.width * 3, card1.height * 3), Image.Resampling.LANCZOS)

# Card 3 (Column 2 of img1)
card3 = img1.crop((int(w1*0.68), int(h1*0.22), int(w1*0.98), int(h1*0.58)))
card3 = card3.convert('L').resize((card3.width * 3, card3.height * 3), Image.Resampling.LANCZOS)

# Card 7 (Column 0 of img3)
card7 = img3.crop((int(w3*0.02), int(h3*0.22), int(w3*0.33), int(h3*0.58)))
card7 = card7.convert('L').resize((card7.width * 3, card7.height * 3), Image.Resampling.LANCZOS)

# Card 8 (Column 1 of img3)
card8 = img3.crop((int(w3*0.35), int(h3*0.22), int(w3*0.65), int(h3*0.58)))
card8 = card8.convert('L').resize((card8.width * 3, card8.height * 3), Image.Resampling.LANCZOS)

# Card 9 (Column 2 of img3)
card9 = img3.crop((int(w3*0.68), int(h3*0.22), int(w3*0.98), int(h3*0.58)))
card9 = card9.convert('L').resize((card9.width * 3, card9.height * 3), Image.Resampling.LANCZOS)

cards = {"Card 1": card1, "Card 3": card3, "Card 7": card7, "Card 8": card8, "Card 9": card9}

for name, img in cards.items():
    print(f"=== {name} (PSM 4) ===")
    print(pytesseract.image_to_string(img, lang="rus", config="--psm 4").strip())
    print(f"=== {name} (PSM 6) ===")
    print(pytesseract.image_to_string(img, lang="rus", config="--psm 6").strip())
    print("-" * 40)
