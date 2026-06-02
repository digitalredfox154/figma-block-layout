import re

# Read the current Home.tsx content
with open('/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the data structure for Block 6
block6_data = """
// Данные для Блока 6 (93% клиентов отмечают эти изменения)
const block6Points = [
  {
    id: 'energy',
    title: 'Энергия для действий и изменений',
    desc: 'Освобождается ресурс, который раньше уходил на внутреннее напряжение и повторяющиеся переживания.',
    img: '/manus-storage/battery_20876c5f.png',
    position: 'top-left', // Для позиционирования на десктопе
  },
  {
    id: 'control',
    title: 'Контроль над собой',
    desc: 'Снижение эмоционального заряда. Вы реагируете спокойнее на тот же самый триггер.',
    img: '/manus-storage/joystick_896f8cb3.png',
    position: 'bottom-left',
  },
  {
    id: 'peace',
    title: 'Внутреннее спокойствие',
    desc: 'Вы чувствуете больше спокойствия и меньше физического и психического напряжения, появляется ощущение тишины, уменьшаются навязчивые мысли.',
    img: '/manus-storage/yin_yang_0769f60d.png',
    position: 'bottom-center',
  },
  {
    id: 'confidence',
    title: 'Больше уверенности в себе',
    desc: 'Появляется ощущение устойчивости и уверенности, которое не зависит от внешних обстоятельств.',
    img: '/manus-storage/pyramid_b0f14d38.png',
    position: 'top-right',
  },
  {
    id: 'decisions',
    title: 'Легче принимать решения',
    desc: 'Решения больше не сопровождаются внутренним сопротивлением, сомнениями или внутренними конфликтами.',
    img: '/manus-storage/y_split_714d4a6d.png',
    position: 'bottom-right',
  }
];
"""

# Let's insert the data structure right before the Home component definition
# We'll search for 'export default function Home()'
home_match = re.search(r'export\s+default\s+function\s+Home\(\)', content)
if home_match:
    insert_pos = home_match.start()
    content = content[:insert_pos] + block6_data + "\n" + content[insert_pos:]

# Now let's define the JSX code for Block 6
block6_jsx = """
      {/* Блок 6: 93% клиентов IRT отмечают эти изменения с первых сессий */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container max-w-[1200px] mx-auto px-4">
          
          {/* Верхняя плашка с заголовком */}
          <div className="flex justify-center mb-16 md:mb-24">
            <div className="bg-[#4E5BA6] text-white px-8 md:px-16 py-6 md:py-8 rounded-[32px] md:rounded-[40px] shadow-[0_10px_30px_rgba(78,91,166,0.15)] text-center max-w-[900px] w-full">
              <h2 className="text-[22px] md:text-[32px] font-extrabold leading-[1.2] tracking-[-0.02em] font-display">
                93% клиентов IRT отмечают эти<br className="hidden md:block" /> изменения с первых сессий
              </h2>
            </div>
          </div>

          {/* Интерактивная карта изменений */}
          {/* Десктопная версия с центральным логотипом и связями */}
          <div className="hidden lg:block relative w-full h-[650px] mx-auto">
            
            {/* Центральный логотип-фон */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] flex items-center justify-center opacity-80 pointer-events-none select-none z-0">
              <img 
                src="/manus-storage/irt_logo_bg_7167bc32.png" 
                alt="IRT Logo Background" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Соединительные линии (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4E5BA6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4E5BA6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Линия к Top-Left (Энергия) */}
              <path d="M 500,280 Q 380,240 280,280" fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="280" cy="280" r="4" fill="#4E5BA6" />
              
              {/* Линия к Bottom-Left (Контроль) */}
              <path d="M 500,320 Q 380,360 250,460" fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="250" cy="460" r="4" fill="#4E5BA6" />
              
              {/* Линия к Bottom-Center (Спокойствие) */}
              <path d="M 500,380 L 500,480" fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="500" cy="480" r="4" fill="#4E5BA6" />
              
              {/* Линия к Top-Right (Уверенность) */}
              <path d="M 700,280 Q 820,240 920,280" fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="920" cy="280" r="4" fill="#4E5BA6" />
              
              {/* Линия к Bottom-Right (Решения) */}
              <path d="M 700,320 Q 820,360 950,460" fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="950" cy="460" r="4" fill="#4E5BA6" />
            </svg>

            {/* Карточки пунктов (Десктопное позиционирование) */}
            
            {/* 1. Энергия (Top-Left) */}
            <div className="absolute top-[50px] left-0 w-[340px] z-20 group">
              <div className="flex gap-4 items-start bg-white p-4 rounded-2xl hover:shadow-[0_12px_30px_rgba(78,91,166,0.08)] transition-all duration-300">
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F7FC]">
                  <img src="/manus-storage/battery_20876c5f.png" alt="battery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-1.5 leading-tight">Энергия для<br />действий и изменений</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed">Освобождается ресурс, который раньше уходил на внутреннее напряжение и повторяющиеся переживания.</p>
                </div>
              </div>
            </div>

            {/* 2. Контроль (Bottom-Left) */}
            <div className="absolute bottom-[100px] left-0 w-[340px] z-20 group">
              <div className="flex gap-4 items-start bg-white p-4 rounded-2xl hover:shadow-[0_12px_30px_rgba(78,91,166,0.08)] transition-all duration-300">
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F7FC]">
                  <img src="/manus-storage/joystick_896f8cb3.png" alt="joystick" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-1.5 leading-tight">Контроль над<br />собой</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed">Снижение эмоционального заряда. Вы реагируете спокойнее на тот же самый триггер.</p>
                </div>
              </div>
            </div>

            {/* 3. Внутреннее спокойствие (Bottom-Center) */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[440px] z-20 group">
              <div className="flex flex-col items-center text-center bg-white p-5 rounded-2xl hover:shadow-[0_12px_30px_rgba(78,91,166,0.08)] transition-all duration-300">
                <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F7FC] mb-3">
                  <img src="/manus-storage/yin_yang_0769f60d.png" alt="yin yang" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-1.5 leading-tight">Внутреннее спокойствие</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed max-w-[380px] mx-auto">Вы чувствуете больше спокойствия и меньше физического и психического напряжения, появляется ощущение тишины, уменьшаются навязчивые мысли.</p>
                </div>
              </div>
            </div>

            {/* 4. Больше уверенности (Top-Right) */}
            <div className="absolute top-[50px] right-0 w-[340px] z-20 group">
              <div className="flex gap-4 items-start bg-white p-4 rounded-2xl hover:shadow-[0_12px_30px_rgba(78,91,166,0.08)] transition-all duration-300">
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F7FC]">
                  <img src="/manus-storage/pyramid_b0f14d38.png" alt="pyramid" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-1.5 leading-tight">Больше<br />уверенности в себе</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed">Появляется ощущение устойчивости и уверенности, которое не зависит от внешних обстоятельств.</p>
                </div>
              </div>
            </div>

            {/* 5. Легче принимать решения (Bottom-Right) */}
            <div className="absolute bottom-[100px] right-0 w-[340px] z-20 group">
              <div className="flex gap-4 items-start bg-white p-4 rounded-2xl hover:shadow-[0_12px_30px_rgba(78,91,166,0.08)] transition-all duration-300">
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F7FC]">
                  <img src="/manus-storage/y_split_714d4a6d.png" alt="y split" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-1.5 leading-tight">Легче принимать<br />решения</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed">Решения больше не сопровождаются внутренним сопротивлением, сомнениями или внутренними конфликтами.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Мобильная и планшетная версия (Вертикальный стек) */}
          <div className="lg:hidden flex flex-col gap-6 max-w-[500px] mx-auto relative">
            {block6Points.map((point) => (
              <div 
                key={point.id} 
                className="flex gap-4 items-start bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] hover:shadow-[0_8px_24px_rgba(78,91,166,0.05)] transition-all duration-300"
              >
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-[#E2E8F0] flex items-center justify-center">
                  <img src={point.img} alt={point.title} className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-2 leading-tight">{point.title}</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.section>
"""

# Let's insert Block 6 JSX code right before the final closing tag of Home component
# We find the final return JSX block
# Let's look at the end of the return statement in Home.tsx:
# We want to insert it right before the last `</div>` of the outer container
# Let's find `</div>\n    </div>\n  );\n}` at the end of the file.
final_pattern = r'</div>\s*</div>\s*\);\s*}'
match = re.search(final_pattern, content)
if match:
    # We want to insert block6_jsx before the last </div> (which is the closing tag of the outer div)
    # The return block looks like:
    # return (
    #   <div className="min-h-screen bg-[#F4F7FC]">
    #     ...
    #     {/* Block 5 */}
    #     <motion.section id="requests-section" ...>...</motion.section>
    #     [INSERT HERE]
    #   </div>
    # );
    # }
    
    # Let's find the very last </div> before the return closes.
    # A safer way is to find the end of requests-section section and insert right after it.
    requests_section_end = content.rfind('</motion.section>')
    if requests_section_end != -1:
        insert_index = requests_section_end + len('</motion.section>')
        content = content[:insert_index] + "\n" + block6_jsx + "\n" + content[insert_index:]
else:
    # If the double div pattern didn't match, let's do a direct replacement of the tail of the file
    tail_pattern = r'</motion.section>\s*</div>\s*\);\s*}'
    if re.search(tail_pattern, content):
        content = re.sub(tail_pattern, "</motion.section>\n\n" + block6_jsx + "\n\n    </div>\n  );\n}", content)

# Write the integrated content back to Home.tsx
with open('/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Block 6 integrated successfully into Home.tsx!")
