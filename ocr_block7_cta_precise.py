import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

img_path = '/home/ubuntu/upload/Снимокэкрана2026-06-02в18.27.37.png'
img = Image.open(img_path)
w, h = img.size

# Crop the left half of the bottom white CTA card (where the main text is)
cta_text_crop = img.crop((int(0.08*w), int(0.78*h), int(0.65*w), int(0.98*h)))
cta_text_crop = cta_text_crop.convert('L')
cta_text_crop = cta_text_crop.resize((cta_text_crop.width * 3, cta_text_crop.height * 3), Image.Resampling.LANCZOS)
cta_text_crop.save('/home/ubuntu/figma-block-layout/cta_text_precise.png')

text_cta_precise = pytesseract.image_to_string(cta_text_crop, lang='rus')
print("--- CTA TEXT PRECISE ---")
print(text_cta_precise)
print("------------------------")

# Crop the button on the right
btn_crop = img.crop((int(0.65*w), int(0.78*h), int(0.92*w), int(0.98*h)))
btn_crop = btn_crop.convert('L')
btn_crop = btn_crop.resize((btn_crop.width * 3, btn_crop.height * 3), Image.Resampling.LANCZOS)
btn_crop.save('/home/ubuntu/figma-block-layout/btn_precise.png')

text_btn = pytesseract.image_to_string(btn_crop, lang='rus')
print("--- BUTTON TEXT ---")
print(text_btn)
print("-------------------")
