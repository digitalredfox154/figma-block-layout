from PIL import Image
import os

files = [
    "Maskgroup.png",
    "Maskgroup(1).png",
    "Maskgroup(2).png"
]

for f in files:
    path = os.path.join("/home/ubuntu/webdev-static-assets", f)
    if os.path.exists(path):
        img = Image.open(path)
        alpha = img.split()[-1]
        pixels = list(alpha.getdata())
        total_pixels = len(pixels)
        zero_alpha = pixels.count(0)
        low_alpha = sum(1 for p in pixels if p < 128)
        print(f"{f}: total={total_pixels}, completely transparent={zero_alpha} ({zero_alpha/total_pixels:.1%}), semi-transparent (<128)={low_alpha} ({low_alpha/total_pixels:.1%})")
