import os
from PIL import Image

path = "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.10.png"
if os.path.exists(path):
    img = Image.open(path)
    print(f"Q2 Size: {img.size}")
    # Выведем информацию о картинке
    # Сделаем кроп левой, средней и правой частей, чтобы понять структуру
    # Или просто сохраним уменьшенную копию, но мы можем проанализировать цвета.
    # Давайте посмотрим, сколько оранжевых областей мы нашли в extract_icons.py для q2.
    # В extract_icons.py было написано: "Q2: 5 вариантов (2 строки: 3 в первой, 2 во второй)"
    # Иконки q2_icon_1, q2_icon_2, q2_icon_3 были сохранены. Была ли q2_icon_4?
    # Давайте проверим файлы в /home/ubuntu/webdev-static-assets/quiz-icons/
    # Там были: q2_icon_1.png, q2_icon_2.png, q2_icon_3.png.
    # Значит, только 3 иконки извлеклись.
    # Давайте проверим, есть ли на Q2 другие иконки или карточки без иконок.
else:
    print("Q2 does not exist")
