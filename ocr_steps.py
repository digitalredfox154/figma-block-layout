import pytesseract
from PIL import Image, ImageEnhance

img_path = '/home/ubuntu/upload/Снимокэкрана2026-06-02в18.27.37.png'
img = Image.open(img_path)
w, h = img.size

# Left steps list is roughly from x = 0 to 0.45*w, and y from 0.28*h to 0.72*h.
steps_crop = img.crop((0, int(0.28*h), int(0.45*w), int(0.72*h)))
steps_crop = steps_crop.convert('L')
steps_crop = steps_crop.resize((steps_crop.width * 3, steps_crop.height * 3), Image.Resampling.LANCZOS)
steps_crop.save('/home/ubuntu/figma-block-layout/steps_crop.png')

text_steps = pytesseract.image_to_string(steps_crop, lang='rus')
print("--- STEPS LIST ---")
print(text_steps)
print("------------------")
