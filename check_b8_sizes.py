from PIL import Image
import os
import glob

for img_path in glob.glob("/home/ubuntu/webdev-static-assets/b8_*"):
    img = Image.open(img_path)
    print(f"{os.path.basename(img_path)}: size={img.size}, mode={img.mode}")
