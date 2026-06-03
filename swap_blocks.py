import re

path = "/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Locate Block 14
# Starts with: {/* Блок 14: Узнайте больше о методе IRT и Наши соцсети */}
# Ends with the first </motion.section> after it.
block14_start_marker = "{/* Блок 14: Узнайте больше о методе IRT и Наши соцсети */}"
block14_start_idx = content.find(block14_start_marker)
if block14_start_idx == -1:
    print("Block 14 start marker not found!")
    exit(1)

# Find the end of Block 14 section
block14_end_marker = "</motion.section>"
block14_end_idx = content.find(block14_end_marker, block14_start_idx)
if block14_end_idx == -1:
    print("Block 14 end not found!")
    exit(1)
block14_end_idx += len(block14_end_marker)

# Extract Block 14 content
block14_content = content[block14_start_idx:block14_end_idx]

# Locate Block 15
block15_start_marker = "{/* Блок 15: Тарифы */}"
block15_start_idx = content.find(block15_start_marker)
if block15_start_idx == -1:
    print("Block 15 start marker not found!")
    exit(1)

# Remove Block 14 from its original position
# We must be careful to remove it cleanly, including its leading whitespace/newlines if possible
# Let's find the exact boundaries
cleaned_content = content[:block14_start_idx] + content[block14_end_idx:]

# Since we removed Block 14, Block 15's start index will shift
block15_start_idx_new = cleaned_content.find(block15_start_marker)

# Insert Block 14 right before Block 15
final_content = (
    cleaned_content[:block15_start_idx_new] +
    block14_content + "\n\n      " +
    cleaned_content[block15_start_idx_new:]
)

with open(path, "w", encoding="utf-8") as f:
    f.write(final_content)

print("Blocks swapped successfully!")
