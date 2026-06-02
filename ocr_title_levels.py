import pytesseract
from PIL import Image, ImageOps

img_path = '/home/ubuntu/webdev-static-assets/b6_title.png'
img = Image.open(img_path)
gray = ImageOps.grayscale(img)
resized = gray.resize((gray.width * 3, gray.height * 3), Image.Resampling.LANCZOS)

for th in [100, 120, 140, 160, 180]:
    binary = resized.point(lambda x: 0 if x < th else 255, '1')
    text = pytesseract.image_to_string(binary, lang='rus')
    print(f"--- THRESHOLD {th} ---")
    print(text)
