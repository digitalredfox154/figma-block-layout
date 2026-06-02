import pytesseract
from PIL import Image

# Load the screenshot
img_path = '/home/ubuntu/upload/Снимокэкрана2026-06-02в18.17.57.png'
img = Image.open(img_path)
width, height = img.size

# Let's perform a simple OCR on the whole image first to see what Tesseract can find
text = pytesseract.image_to_string(img, lang='rus+eng')
print("=== WHOLE IMAGE OCR ===")
print(text)

# Let's crop regions for more precise text extraction
# 1. Title bar (Top center)
title_crop = img.crop((int(width * 0.1), int(height * 0.1), int(width * 0.9), int(height * 0.3)))
title_crop.save('/home/ubuntu/webdev-static-assets/b6_title.png')
title_text = pytesseract.image_to_string(title_crop, lang='rus')
print("\n=== TITLE OCR ===")
print(title_text)

# Let's write a loop to crop 5 key points around the center
# Point 1: Top Left (Energy)
# Point 2: Bottom Left (Control)
# Point 3: Bottom Center (Inner Peace)
# Point 4: Top Right (Confidence)
# Point 5: Bottom Right (Easy Decisions)

crops = {
    "1_energy": (0.05, 0.3, 0.4, 0.52),
    "2_control": (0.05, 0.52, 0.4, 0.75),
    "3_peace": (0.35, 0.65, 0.65, 0.98),
    "4_confidence": (0.6, 0.3, 0.95, 0.52),
    "5_decisions": (0.6, 0.52, 0.95, 0.75)
}

for name, coords in crops.items():
    crop_img = img.crop((int(width * coords[0]), int(height * coords[1]), int(width * coords[2]), int(height * coords[3])))
    crop_img.save(f'/home/ubuntu/webdev-static-assets/b6_{name}.png')
    
    # Resize for better OCR quality
    resized = crop_img.resize((crop_img.width * 3, crop_img.height * 3), Image.Resampling.LANCZOS)
    
    point_text = pytesseract.image_to_string(resized, lang='rus')
    print(f"\n=== POINT {name.upper()} OCR ===")
    print(point_text)
