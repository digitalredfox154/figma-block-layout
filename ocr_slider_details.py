import pytesseract
from PIL import Image
import os

# Let's inspect the files and write a script to crop specific cards and print text.
# The files are:
# 1. Снимокэкрана2026-06-02в17.58.16.png (Cards 1, 2, 3)
# 2. Снимокэкрана2026-06-02в17.59.40.png (Cards 4, 5, 6)
# 3. Снимокэкрана2026-06-02в17.59.51.png (Cards 7, 8, 9)

# We can also do OCR on sub-regions of each image to get clean text.
# Let's write a script that does OCR on the top half of the images (where the card texts are)

images_info = [
    ("Снимокэкрана2026-06-02в17.58.16.png", "1_2_3"),
    ("Снимокэкрана2026-06-02в17.59.40.png", "4_5_6"),
    ("Снимокэкрана2026-06-02в17.59.51.png", "7_8_9")
]

for f, name in images_info:
    path = os.path.join("/home/ubuntu/upload", f)
    if os.path.exists(path):
        img = Image.open(path)
        w, h = img.size
        # Crop the text area of the cards (top ~60% of the image)
        crop_area = (0, int(h * 0.15), w, int(h * 0.85))
        cropped = img.crop(crop_area)
        # Resize to improve OCR
        cropped = cropped.resize((cropped.width * 3, cropped.height * 3), Image.Resampling.LANCZOS)
        text = pytesseract.image_to_string(cropped, lang="rus+eng")
        print(f"=== Cards {name} ===")
        print(text)
        print("\n" + "="*40 + "\n")
