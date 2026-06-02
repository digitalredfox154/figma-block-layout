import pytesseract
from PIL import Image

img_path = '/home/ubuntu/upload/Снимокэкрана2026-06-02в18.27.37.png'
img = Image.open(img_path)
w, h = img.size

# The CTA is at the bottom: y from 0.75*h to h, x from 0.05*w to 0.95*w
cta_crop = img.crop((int(0.05*w), int(0.72*h), int(0.95*w), h))
cta_crop.save('/home/ubuntu/figma-block-layout/cta_block.png')

text_cta = pytesseract.image_to_string(cta_crop, lang='rus+eng')
print("--- CTA BLOCK ---")
print(text_cta)
print("-----------------")
