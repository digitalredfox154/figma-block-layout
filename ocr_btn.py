import pytesseract
from PIL import Image

img_path = '/home/ubuntu/upload/Снимокэкрана2026-06-02в18.27.37.png'
img = Image.open(img_path)
w, h = img.size

# Button is roughly at x: 0.68*w to 0.9*w, y: 0.83*h to 0.93*h
btn_crop = img.crop((int(0.67*w), int(0.82*h), int(0.91*w), int(0.93*h)))
btn_crop.save('/home/ubuntu/figma-block-layout/btn_raw.png')

# Let's do simple OCR with Russian
text_btn = pytesseract.image_to_string(btn_crop, lang='rus')
print("--- BUTTON RAW ---")
print(text_btn)
print("------------------")
