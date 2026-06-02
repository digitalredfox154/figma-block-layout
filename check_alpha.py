from PIL import Image
import os

files = [
    "Maskgroup.png",
    "Maskgroup(1).png",
    "Maskgroup(2).png",
    "Maskgroup(3).png",
    "Maskgroup(4).png",
    "Maskgroup(5).png",
    "Maskgroup(6).png",
    "Rectangle240649634.png",
    "Rectangle240649634(1).png"
]

for f in files:
    path = os.path.join("/home/ubuntu/webdev-static-assets", f)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{f}: mode={img.mode}, size={img.size}")
        if img.mode == "RGBA":
            # Check if there is actual transparency
            extrema = img.getextrema()
            print(f"  Alpha channel extrema: {extrema[3]}")
    else:
        print(f"{f} not found")
