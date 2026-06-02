with open("/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 1160 <= i <= 1250:
        if "opacity" in line or "text-" in line or "bg-" in line:
            print(f"{i+1}: {line.strip()}")
