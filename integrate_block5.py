import re

# We will read Home.tsx and integrate Block 5.
# Let's define the Block 5 component code first.

block5_jsx = """
      {/* ==================== БЛОК 5: На какие запросы ориентирован метод IRT? ==================== */}
      <motion.section
        id="requests-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-[1920px] flex flex-col items-center py-16 sm:py-20 px-6 sm:px-12 lg:px-16 space-y-12 overflow-hidden"
      >
        {/* Заголовок блока */}
        <div className="text-center max-w-[800px] space-y-4">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#1E2238] leading-[1.15] tracking-[-0.02em]">
            На какие <span className="text-[#4E5BA6]">запросы</span> <br className="sm:hidden" />
            ориентирован метод IRT?
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold leading-relaxed">
            Эти проблемы могут казаться разными, но часто за ними стоит <span className="text-[#1E2238] font-extrabold">один и тот же внутренний механизм</span>. Меняя один корневой механизм, часто разрешаются и другие запросы.
          </p>
        </div>

        {/* Контейнер слайдера */}
        <div className="w-full max-w-[1200px] relative">
          {/* Слайды */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <AnimatePresence mode="wait">
              {sliderCards.slice(currentSlideIndex * 3, currentSlideIndex * 3 + 3).map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_15px_45px_rgba(78,91,166,0.03)] border border-[#E2E8F0]/40 flex flex-col justify-between p-8 sm:p-10 text-white cursor-pointer group"
                >
                  {/* Фоновое изображение */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={card.bg} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Градиентное затемнение сверху для читаемости текста */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent z-10" />
                  </div>

                  {/* Текстовое содержимое */}
                  <div className="relative z-20 space-y-4">
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                      {card.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-white/90 font-semibold leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
                      {card.description}
                    </p>
                  </div>

                  {/* Декоративный элемент внизу */}
                  <div className="relative z-20 self-end">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#4E5BA6] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Стрелки управления слайдером внизу */}
          <div className="flex flex-row items-center justify-center gap-6 pt-12">
            <button
              onClick={handlePrevSlide}
              className="w-12 h-12 rounded-full bg-[#F4F7FC] border border-[#E2E8F0] flex items-center justify-center text-[#5A6082] hover:text-[#1E2238] hover:bg-[#E2E8F0]/40 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="text-[14px] font-extrabold text-[#1E2238]">
              <span className="text-[#4E5BA6]">0{currentSlideIndex + 1}</span>
              <span className="text-[#A0AEC0] mx-1">/</span>
              <span className="text-[#5A6082]">03</span>
            </div>

            <button
              onClick={handleNextSlide}
              className="w-12 h-12 rounded-full bg-[#F4F7FC] border border-[#E2E8F0] flex items-center justify-center text-[#5A6082] hover:text-[#1E2238] hover:bg-[#E2E8F0]/40 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.section>
"""

# Let's define the slide cards data structure
slider_cards_data = """
  // Данные для слайдера Блока 5
  const sliderCards = [
    {
      id: "slide_1",
      title: "Финансовый или карьерный потолок",
      description: "Прикладываете усилия, пробуете разные стратегии и инструменты, но снова упираетесь в один и тот же уровень дохода или возможностей",
      bg: "/manus-storage/Maskgroup_937416c2.png"
    },
    {
      id: "slide_2",
      title: "Повторяющиеся сценарии в отношениях",
      description: "Отношения начинаются по похожему сценарию и/или заканчиваются одинаково: эмоциональной зависимостью, разочарованием и страхом, что это повторится снова",
      bg: "/manus-storage/Maskgroup(1)_855aaee6.png"
    },
    {
      id: "slide_3",
      title: "Прокрастинация и саботаж",
      description: "Вы понимаете, что именно нужно сделать для изменений в жизни, но снова откладываете действия или возвращаетесь к привычному сценарию",
      bg: "/manus-storage/Maskgroup(2)_fdb91b97.png"
    },
    {
      id: "slide_4",
      title: "Некомфортные повторяющиеся реакции",
      description: "Сильная тревога, вспышки раздражения, страх, обида, сжатие/замирание или другие реакции, которые возникают слишком резко и ухудшают жизнь",
      bg: "/manus-storage/Maskgroup(3)_845c1170.png"
    },
    {
      id: "slide_5",
      title: "Нет ощущения радости и удовлетворения",
      description: "Состояние, когда сложно радоваться, чувствовать интерес или даже злиться, будто часть эмоций выключена",
      bg: "/manus-storage/Rectangle240649634_5289c515.png"
    },
    {
      id: "slide_6",
      title: "Навязчивые мысли и внутренний шум",
      description: "Мысли постоянно возвращаются к одним и тем же переживаниям, ситуациям или страхам, не позволяя по-настоящему отпустить их и почувствовать спокойствие",
      bg: "/manus-storage/Maskgroup(4)_5da7b42f.png"
    },
    {
      id: "slide_7",
      title: "Самообесценивание и самокритика",
      description: "Ощущение, что вы сами себя останавливаете: сомнения, страх ошибок, внутренний критик или ощущение, что «не получится». Кажется, что вы всегда немного недотягиваете",
      bg: "/manus-storage/Maskgroup(5)_af47e20f.png"
    },
    {
      id: "slide_8",
      title: "Психосоматические состояния",
      description: "Физические симптомы, которые могут быть связаны с эмоциональным напряжением и внутренними переживаниями",
      bg: "/manus-storage/Maskgroup(6)_4f5187ca.png"
    },
    {
      id: "slide_9",
      title: "Цикличные события и сценарии",
      description: "Схожие конфликты, трудности или кризисы возникают снова и снова, даже если внешние обстоятельства меняются",
      bg: "/manus-storage/Rectangle240649634(1)_d5e9d7e7.png"
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % 3);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + 3) % 3);
  };
"""

with open("/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx", "r") as f:
    content = f.read()

# 1. We need to add ArrowLeft, ArrowRight to the lucide-react imports if they are not already there.
# Let's find lucide-react imports
import_match = re.search(r'import\s+{[^}]+}\s+from\s+["\']lucide-react["\']', content)
if import_match:
    import_str = import_match.group(0)
    # Add ArrowLeft, ArrowRight if they are not there
    new_imports = []
    if "ArrowLeft" not in import_str:
        new_imports.append("ArrowLeft")
    if "ArrowRight" not in import_str:
        new_imports.append("ArrowRight")
    
    if new_imports:
        # Insert them inside the curly braces
        updated_import = import_str.replace("}", ", " + ", ".join(new_imports) + "}")
        content = content.replace(import_str, updated_import)
        print("Updated lucide-react imports.")

# 2. Insert the state variables and sliderCards data inside Home() component
# Let's find the start of Home() component and insert right after useState hooks.
# Let's search for "export default function Home()"
home_start_match = re.search(r'export\s+default\s+function\s+Home\(\)\s*{', content)
if home_start_match:
    # Let's insert the data and state right after the match or right after answers state
    answers_match = re.search(r'const\s+\[answers,\s+setAnswers\]\s*=\s*useState[^;]+;', content)
    if answers_match:
        insert_pos = answers_match.end()
        content = content[:insert_pos] + "\n" + slider_cards_data + content[insert_pos:]
        print("Inserted slider data and state.")

# 3. Insert Block 5 JSX right before the final closing elements
# The file ends with:
#       </motion.section>
# 
#     </div>
#   );
# }
# Let's replace the end of the file to include Block 5.
end_pattern = r'</motion.section>\s*</div>\s*\);\s*}'
if re.search(end_pattern, content):
    # Let's insert Block 5 right after Block 4 (which is the last motion.section)
    content = re.sub(end_pattern, "</motion.section>\n" + block5_jsx + "\n    </div>\n  );\n}", content)
    print("Inserted Block 5 JSX.")

with open("/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx", "w") as f:
    f.write(content)

print("Integration complete!")
