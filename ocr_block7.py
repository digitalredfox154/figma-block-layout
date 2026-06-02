import pytesseract
from PIL import Image

img_path = '/home/ubuntu/upload/Снимокэкрана2026-06-02в18.27.37.png'
img = Image.open(img_path)

# Let's crop different areas to extract text clearly.
# The image size is likely 1200x500 or similar. Let's get its dimensions first.
w, h = img.size
print(f"Image size: {w}x{h}")

# 1. Let's do OCR on the whole image first to see what we can find.
text_all = pytesseract.image_to_string(img, lang='rus+eng')
print("--- ALL TEXT ---")
print(text_all)
print("----------------")
