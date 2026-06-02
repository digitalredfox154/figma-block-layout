import pytesseract
from PIL import Image, ImageOps, ImageFilter

img_path = '/home/ubuntu/webdev-static-assets/b6_title.png'
img = Image.open(img_path)

# Convert to grayscale, resize, and apply some filters
gray = ImageOps.grayscale(img)
resized = gray.resize((gray.width * 4, gray.height * 4), Image.Resampling.LANCZOS)
blurred = resized.filter(ImageFilter.GaussianBlur(1))
threshold = blurred.point(lambda x: 0 if x < 150 else 255, '1')

text = pytesseract.image_to_string(threshold, lang='rus')
print("=== PRECISE TITLE OCR ===")
print(text)
