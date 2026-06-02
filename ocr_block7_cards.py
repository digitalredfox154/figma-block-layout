import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

img_path = '/home/ubuntu/upload/Снимокэкрана2026-06-02в18.27.37.png'
img = Image.open(img_path)
w, h = img.size

# Let's crop the right side cards where the 3 results are located.
# Right cards are roughly from x = 0.65*w to w, and y from 0.1*h to 0.7*h.
right_crop = img.crop((int(0.65*w), int(0.05*h), w, int(0.75*h)))
right_crop.save('/home/ubuntu/figma-block-layout/right_cards.png')

# Let's do OCR with different configs
text_right = pytesseract.image_to_string(right_crop, lang='rus+eng')
print("--- RIGHT CARDS ---")
print(text_right)
print("-------------------")
