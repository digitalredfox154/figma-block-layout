import pytesseract
from PIL import Image
import os

# Let's write a python script to extract text with high accuracy from Card 1, 3, 7, 8, 9
# using a customized preprocessing pipeline.
# Card 1: "Финансовый или карьерный потолок"
# Card 3: "Прокрастинация и саботаж"
# Card 7: "Самообесценивание и самокритика"
# Card 8: "Психосоматические состояния"
# Card 9: "Цикличные события и сценарии"

# Let's run a script that does OCR on these cards with a slightly wider crop to capture the full text.

img1 = Image.open("/home/ubuntu/upload/Снимокэкрана2026-06-02в17.58.16.png")
img3 = Image.open("/home/ubuntu/upload/Снимокэкрана2026-06-02в17.59.51.png")

w1, h1 = img1.size
w3, h3 = img3.size

col_w1 = w1 / 3
col_w3 = w3 / 3

print("=== CARD 1 ===")
c1 = img1.crop((int(col_w1*0 + w1*0.01), int(h1*0.22), int(col_w1*1 - w1*0.01), int(h1*0.55)))
c1 = c1.convert('L').resize((c1.width*4, c1.height*4), Image.Resampling.LANCZOS)
print(pytesseract.image_to_string(c1, lang="rus"))

print("=== CARD 3 ===")
c3 = img1.crop((int(col_w1*2 + w1*0.01), int(h1*0.22), int(col_w1*3 - w1*0.01), int(h1*0.55)))
c3 = c3.convert('L').resize((c3.width*4, c3.height*4), Image.Resampling.LANCZOS)
print(pytesseract.image_to_string(c3, lang="rus"))

print("=== CARD 7 ===")
c7 = img3.crop((int(col_w3*0 + w3*0.01), int(h3*0.22), int(col_w3*1 - w3*0.01), int(h3*0.55)))
c7 = c7.convert('L').resize((c7.width*4, c7.height*4), Image.Resampling.LANCZOS)
print(pytesseract.image_to_string(c7, lang="rus"))

print("=== CARD 8 ===")
c8 = img3.crop((int(col_w3*1 + w3*0.01), int(h3*0.22), int(col_w3*2 - w3*0.01), int(h3*0.55)))
c8 = c8.convert('L').resize((c8.width*4, c8.height*4), Image.Resampling.LANCZOS)
print(pytesseract.image_to_string(c8, lang="rus"))

print("=== CARD 9 ===")
c9 = img3.crop((int(col_w3*2 + w3*0.01), int(h3*0.22), int(col_w3*3 - w3*0.01), int(h3*0.55)))
c9 = c9.convert('L').resize((c9.width*4, c9.height*4), Image.Resampling.LANCZOS)
print(pytesseract.image_to_string(c9, lang="rus"))
