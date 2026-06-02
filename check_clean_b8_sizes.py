from PIL import Image

files = [
    "Maskgroup(10)_e50cdeec.png",
    "Group2087331273_452a962d.png",
    "Group2087331124(1)_53a5d187.png",
    "Rectangle240649662_d7faf38f.png"
]

for f in files:
    path = f"/home/ubuntu/figma-block-layout/client/public/manus-storage/{f}"
    # Wait, the files might be in /home/ubuntu/webdev-static-assets/ or /home/ubuntu/figma-block-layout/client/public/manus-storage/
    # Let's check both
    import os
    possible_paths = [
        f"/home/ubuntu/figma-block-layout/client/public/manus-storage/{f}",
        f"/home/ubuntu/webdev-static-assets/{f}",
        f"/home/ubuntu/upload/{f.split('_')[0]}.png"
    ]
    for p in possible_paths:
        if os.path.exists(p):
            img = Image.open(p)
            w, h = img.size
            print(f"{f}: path={p}, size={w}x{h}, aspect={w/h:.4f} (h/w={h/w:.4f})")
            break
