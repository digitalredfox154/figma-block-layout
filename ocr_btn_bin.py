import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

img = Image.open('/home/ubuntu/figma-block-layout/btn_raw.png')
img = img.convert('L')
img = img.resize((img.width * 5, img.height * 5), Image.Resampling.LANCZOS)

# Enhance contrast
enhancer = ImageEnhance.Contrast(img)
img = enhancer.enhance(3.0)

# Binarize
threshold = 120
img = img.point(lambda p: 255 if p > threshold else 0)
img.save('/home/ubuntu/figma-block-layout/btn_bin.png')

text_btn = pytesseract.image_to_string(img, lang='rus', config='--psm 6')
print("--- BUTTON BIN ---")
print(text_btn)
print("------------------")
