import re

file_path = '/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's prepare the Block 7 constants and data structure
block7_data = """
// --- Данные для Блока 7 (Как проходит первая сессия) ---
const block7Tags = [
  "Длительность сессии до 90 минут",
  "Онлайн-формат",
  "Подобранный под ваш запрос психолог"
];

const block7Steps = [
  {
    id: "01",
    title: "Знакомимся, подробно разбираем вашу ситуацию",
    desc: "и находим истинный запрос"
  },
  {
    id: "02",
    title: "Разберём ключевые события",
    desc: "и реакции, сформировавшие проблему"
  },
  {
    id: "03",
    title: "Наметим индивидуальную",
    desc: "стратегию работы"
  },
  {
    id: "04",
    title: "При желании и возможности — начинаем",
    desc: "терапевтическую работу уже в рамках первой встречи"
  }
];

const block7Results = [
  {
    id: 1,
    title: "Получите четкий план дальнейшей работы",
    img: "/manus-storage/Rectangle240649654_ff879bee.png"
  },
  {
    id: 2,
    title: "Тревога и чувство бессилия перед проблемой ослабнут или вовсе пропадут",
    img: "/manus-storage/Rectangle240649656_8d28dd1e.png"
  },
  {
    id: 3,
    title: "Поймете причины вашей проблемы/ нежелательной реакции и как ее решить",
    img: "/manus-storage/Rectangle240649658_e3e2f5f2.png"
  }
];
"""

# We'll insert block7_data near the top of the file or right after block6Points declaration.
# Let's find block6Points declaration in content.
block6_index = content.find('const block6Points')
if block6_index != -1:
    # Let's insert block7_data right before block6Points
    content = content[:block6_index] + block7_data + "\n" + content[block6_index:]
    print("Block 7 data structures inserted successfully near the top!")
else:
    # If not found, insert at the top of the file after the first few imports
    first_export = content.find('export default function Home')
    content = content[:first_export] + block7_data + "\n" + content[first_export:]
    print("Block 7 data structures inserted at the top of the file!")

# Let's prepare the Block 7 JSX
block7_jsx = """
      {/* ==================== БЛОК 7: Как проходит первая сессия ==================== */}
      <motion.section 
        id="block7-section"
        className="py-24 relative overflow-hidden bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="container relative z-10">
          
          {/* Заголовок и сетка содержимого */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Левая колонка: Заголовок, плашки и этапы */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#1E2238] leading-[1.1] mb-6 tracking-tight">
                  Как пройдёт<br />
                  ваша первая<br />
                  сессия в IRT?
                </h2>
                
                {/* Плашки с условиями */}
                <div className="flex flex-wrap gap-2.5">
                  {block7Tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-[#F1F5F9] text-[#5A6082] text-[13px] font-semibold rounded-full border border-[#E2E8F0] hover:bg-[#E2E8F0] hover:text-[#1E2238] transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Пошаговый список этапов */}
              <div className="flex flex-col gap-6">
                {block7Steps.map((step) => (
                  <div key={step.id} className="flex gap-4 items-start group">
                    <span className="text-[16px] font-black text-[#4E5BA6] bg-[#EEF2F6] px-2.5 py-1 rounded-lg group-hover:bg-[#4E5BA6] group-hover:text-white transition-colors duration-300">
                      {step.id}
                    </span>
                    <div className="flex-1">
                      <p className="text-[15px] leading-relaxed text-[#1E2238]">
                        <span className="font-extrabold">{step.title}</span>{" "}
                        <span className="text-[#5A6082]">{step.desc}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Центральная колонка: 3D-рендер стеклянного лабиринта */}
            <div className="lg:col-span-4 flex justify-center items-center relative min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 bg-radial-gradient from-[#4E5BA6]/5 to-transparent blur-3xl rounded-full" />
              <img 
                src="/manus-storage/Maskgroup(7)_a268838a.png" 
                alt="3D Glass Maze" 
                className="w-full max-w-[360px] lg:max-w-full h-auto object-contain relative z-10 drop-shadow-[0_16px_32px_rgba(78,91,166,0.08)] hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Правая колонка: 3 карточки результатов */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {block7Results.map((result) => (
                <div 
                  key={result.id}
                  className="flex gap-4 items-center bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] hover:shadow-[0_8px_24px_rgba(78,91,166,0.04)] hover:border-[#CBD5E1] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#E2E8F0] flex-shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                    <img src={result.img} alt={result.title} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[13.5px] font-bold text-[#1E2238] leading-snug">
                    {result.title}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Нижний блок: Призыв к действию (CTA) */}
          <div className="bg-[#F8FAFC] rounded-[32px] p-8 md:p-10 border border-[#E2E8F0] shadow-[0_16px_40px_rgba(78,91,166,0.03)] flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-center relative overflow-hidden group hover:border-[#CBD5E1] transition-all duration-500">
            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-[#4E5BA6]/5 blur-3xl rounded-full pointer-events-none group-hover:bg-[#4E5BA6]/10 transition-colors duration-500" />
            
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-[22px] md:text-[26px] font-extrabold text-[#1E2238] mb-2 leading-tight">
                Нажмите на кнопку и оставьте заявку,
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#5A6082] font-medium">
                чтобы назначить сессию и получить рекомендации по подготовке уже сегодня
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <button 
                onClick={() => {
                  const quizSection = document.getElementById('quiz-section') || document.getElementById('block4-section');
                  if (quizSection) {
                    quizSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-[#4E5BA6] hover:bg-[#3A4584] text-white font-extrabold text-[15px] rounded-full shadow-[0_8px_24px_rgba(78,91,166,0.25)] hover:shadow-[0_12px_32px_rgba(78,91,166,0.35)] active:scale-95 transition-all duration-300"
              >
                Записаться
              </button>
            </div>
          </div>

        </div>
      </motion.section>
"""

# Let's insert block7_jsx before the last closing tags.
# In Home.tsx, the last lines are:
#       </motion.section>
#
#
#     </div>
#   );
# }
# We can replace the last </motion.section> with block7_jsx appended.
last_section_end = content.rfind('</motion.section>')
if last_section_end != -1:
    insert_index = last_section_end + len('</motion.section>')
    content = content[:insert_index] + "\n\n" + block7_jsx + "\n" + content[insert_index:]
    print("Block 7 JSX inserted successfully near the end of the file!")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Integration complete!")
