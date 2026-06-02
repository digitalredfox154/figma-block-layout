import os
from PIL import Image

# Создаем директорию для иконок
os.makedirs("/home/ubuntu/figma-block-layout/client/public/quiz-icons", exist_ok=True)

# Скриншоты квиза и их пути
screenshots = {
    "q1": "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.43.50.png",
    "q2": "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.10.png",
    "q3": "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.20.png",
    "q4": "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.30.png",
    "q5": "/home/ubuntu/upload/Снимокэкрана2026-06-02в17.44.39.png",
}

# Мы напишем универсальный метод для поиска и вырезания иконок.
# На скриншотах варианты ответов расположены в виде сетки из карточек.
# Каждая карточка содержит текст слева и 3D-иконку в закругленном оранжевом/бежевом квадрате справа.
# Давайте напишем скрипт, который найдет эти оранжевые квадраты по цвету и вырежет их.
# Цвет фона иконок (оранжевый/бежевый): примерно RGB (250, 214, 178) или похожий.

def extract_icons_from_image(img_path, q_name):
    if not os.path.exists(img_path):
        print(f"File {img_path} does not exist.")
        return
    
    img = Image.open(img_path)
    width, height = img.size
    
    # Чтобы точно вырезать иконки, давайте сначала найдем все пиксели, близкие к цвету подложки иконки.
    # Цвет подложки: #F9D3B4 или RGB(249, 211, 180)
    # На некоторых скриншотах (например Q1) подложка иконок белая/прозрачная с тенью, а на Q2-Q5 она оранжевая.
    # Давайте сделаем точные кропы на основе пропорций экрана, так как скриншоты имеют одинаковый размер 2000x940 или около того.
    print(f"Processing {q_name}: size {width}x{height}")
    
    # Давайте сохраним кропы по фиксированным координатам, адаптированным под стандартный размер скриншота (1000x470 или 2000x940)
    # Q1: 6 вариантов (2 строки по 3 колонки)
    # Q2: 5 вариантов (2 строки: 3 в первой, 2 во второй)
    # Q3: 5 вариантов
    # Q4: 4 варианта (2 строки по 2 колонки)
    # Q5: 3 варианта (1 строка)
    
    # Для Q1 (С чем сталкиваетесь):
    # Иконки находятся внутри белых карточек.
    # Давайте напишем скрипт, который автоматически находит контуры или использует фиксированные сетки.
    # На самом деле, проще всего написать скрипт, который сканирует изображение и находит связные области оранжевого цвета (для Q2-Q5).
    # А для Q1 мы найдем области с серыми рамками или просто вырежем по сетке.
    
    # Давайте сначала сделаем простой анализ цветов, чтобы найти оранжевые плашки.
    # Оранжевый цвет плашки: R > 230, G: 190-225, B: 150-195
    orange_pixels = []
    for y in range(0, height, 5):
        for x in range(0, width, 5):
            r, g, b = img.getpixel((x, y))[:3]
            if r > 235 and 180 < g < 225 and 140 < b < 195:
                orange_pixels.append((x, y))
                
    # Группируем пиксели в кластеры (каждая плашка - отдельный кластер)
    clusters = []
    for x, y in orange_pixels:
        added = False
        for cluster in clusters:
            # Если пиксель близко к существующему кластеру, добавляем его
            cx, cy = cluster[0]
            if abs(cx - x) < 120 and abs(cy - y) < 120:
                cluster.append((x, y))
                added = True
                break
        if not added:
            clusters.append([(x, y)])
            
    # Фильтруем кластеры по размеру (чтобы убрать шум)
    valid_clusters = [cluster for cluster in clusters if len(cluster) > 10]
    
    # Находим границы каждого кластера и вырезаем плашку
    icon_idx = 1
    saved_paths = []
    
    # Сортируем кластеры по y, затем по x, чтобы иконки шли по порядку вариантов ответов
    valid_clusters.sort(key=lambda c: (c[0][1] // 50, c[0][0]))
    
    for cluster in valid_clusters:
        min_x = min(p[0] for p in cluster) - 10
        max_x = max(p[0] for p in cluster) + 10
        min_y = min(p[1] for p in cluster) - 10
        max_y = max(p[1] for p in cluster) + 10
        
        # Ограничиваем координаты
        min_x = max(0, min_x)
        min_y = max(0, min_y)
        max_x = min(width, max_x)
        max_y = min(height, max_y)
        
        # Вырезаем иконку (делаем квадратной)
        w = max_x - min_x
        h = max_y - min_y
        size = max(w, h)
        center_x = min_x + w // 2
        center_y = min_y + h // 2
        
        half = size // 2 + 5
        crop_box = (
            max(0, center_x - half),
            max(0, center_y - half),
            min(width, center_x + half),
            min(height, center_y + half)
        )
        
        cropped = img.crop(crop_box)
        # Масштабируем до стандартного размера 120x120
        cropped = cropped.resize((120, 120), Image.Resampling.LANCZOS)
        
        out_path = f"/home/ubuntu/figma-block-layout/client/public/quiz-icons/{q_name}_icon_{icon_idx}.png"
        cropped.save(out_path)
        saved_paths.append(out_path)
        print(f"  Saved icon {icon_idx} to {out_path} (box: {crop_box})")
        icon_idx += 1
        
    # Для Q1 у нас белые плашки, найдем их по другому принципу или жестким координатам.
    # Скриншот Q1 имеет размер, допустим, 2000x940. Давайте проверим его размер.
    if q_name == "q1":
        # На Q1 иконки в белых карточках с серыми тенями.
        # Давайте просто вырежем их по фиксированным пропорциям, так как сетка очень ровная.
        # Координаты для Q1 (при стандартном размере 2000x940):
        # 6 карточек: 2 строки по 3 колонки.
        # Давайте определим координаты иконок внутри белых карточек.
        # Каждая карточка содержит иконку справа.
        # Мы можем найти их, сканируя области с серым/голубоватым фоном 3D-иконки (они на сером круглом фоне).
        # Цвет фона иконок Q1: RGB(242, 230, 215) или около того (очень светлый бежевый/серый).
        # Давайте найдем их кластеризацией светлых пикселей, которые окружены белым фоном.
        # Но еще проще: найдем их по сетке.
        # Сетка карточек в Q1:
        # Строка 1: y примерно от 520 до 650 (при высоте 940)
        # Строка 2: y примерно от 680 до 810
        # Колонки: x1: 200-700, x2: 750-1250, x3: 1300-1800
        # Давайте напишем универсальный поиск для Q1 по цвету самих 3D-моделей (они имеют золотистые/голубые оттенки).
        # Или найдем серые рамки карточек.
        # На самом деле, на Q1 иконки находятся на светлых квадратных подложках.
        # Давайте найдем их, сканируя пиксели с цветом #F5E6D3 или RGB(245, 230, 211)
        beige_pixels = []
        for y in range(0, height, 5):
            for x in range(0, width, 5):
                r, g, b = img.getpixel((x, y))[:3]
                # Цвет подложки иконки на Q1: светлый бежево-серый
                if 230 < r < 252 and 215 < g < 240 and 195 < b < 225:
                    beige_pixels.append((x, y))
                    
        clusters_q1 = []
        for x, y in beige_pixels:
            added = False
            for cluster in clusters_q1:
                cx, cy = cluster[0]
                if abs(cx - x) < 150 and abs(cy - y) < 150:
                    cluster.append((x, y))
                    added = True
                    break
            if not added:
                clusters_q1.append([(x, y)])
                
        valid_clusters_q1 = [cluster for cluster in clusters_q1 if len(cluster) > 8]
        valid_clusters_q1.sort(key=lambda c: (c[0][1] // 100, c[0][0]))
        
        icon_idx = 1
        for cluster in valid_clusters_q1:
            min_x = min(p[0] for p in cluster) - 15
            max_x = max(p[0] for p in cluster) + 15
            min_y = min(p[1] for p in cluster) - 15
            max_y = max(p[1] for p in cluster) + 15
            
            w = max_x - min_x
            h = max_y - min_y
            size = max(w, h)
            center_x = min_x + w // 2
            center_y = min_y + h // 2
            
            half = size // 2 + 5
            crop_box = (
                max(0, center_x - half),
                max(0, center_y - half),
                min(width, center_x + half),
                min(height, center_y + half)
            )
            
            cropped = img.crop(crop_box)
            cropped = cropped.resize((120, 120), Image.Resampling.LANCZOS)
            out_path = f"/home/ubuntu/figma-block-layout/client/public/quiz-icons/{q_name}_icon_{icon_idx}.png"
            cropped.save(out_path)
            print(f"  Saved Q1 icon {icon_idx} to {out_path} (box: {crop_box})")
            icon_idx += 1

# Запускаем извлечение для всех скриншотов
for q_name, path in screenshots.items():
    extract_icons_from_image(path, q_name)

print("Icon extraction completed!")
