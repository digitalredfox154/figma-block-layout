import re

path = "/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's define the new Block 6 JSX with perfect coordinates, right-aligned cards, and correct imports/variables
block6_jsx = """      {/* Блок 6: 93% клиентов IRT отмечают эти изменения с первых сессий */}
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
          {/* Десктопная версия с центральным логотипом и связями (активна от xl) */}
          <div className="hidden xl:block relative w-[1100px] h-[600px] mx-auto">
            
            {/* Центральный логотип-фон */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] flex items-center justify-center opacity-80 pointer-events-none select-none z-0">
              <img 
                src="/manus-storage/irt_logo_bg_7167bc32.png" 
                alt="IRT Logo Background" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Соединительные линии (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1100 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4E5BA6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#4E5BA6" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              
              {/* Линия к Top-Left (Энергия) - от (400, 280) к (48, 136) */}
              <path d="M 400,280 Q 200,200 48,136" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="48" cy="136" r="4" fill="#4E5BA6" />
              <circle cx="400" cy="280" r="3" fill="#4E5BA6" opacity="0.5" />
              
              {/* Линия к Bottom-Left (Контроль) - от (400, 320) к (48, 386) */}
              <path d="M 400,320 Q 200,350 48,386" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="48" cy="386" r="4" fill="#4E5BA6" />
              <circle cx="400" cy="320" r="3" fill="#4E5BA6" opacity="0.5" />
              
              {/* Линия к Bottom-Center (Спокойствие) - от (550, 380) к (550, 460) */}
              <path d="M 550,380 L 550,460" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="550" cy="460" r="4" fill="#4E5BA6" />
              <circle cx="550" cy="380" r="3" fill="#4E5BA6" opacity="0.5" />
              
              {/* Линия к Top-Right (Уверенность) - от (700, 280) к (1052, 136) */}
              <path d="M 700,280 Q 900,200 1052,136" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="1052" cy="136" r="4" fill="#4E5BA6" />
              <circle cx="700" cy="280" r="3" fill="#4E5BA6" opacity="0.5" />
              
              {/* Линия к Bottom-Right (Решения) - от (700, 320) к (1052, 386) */}
              <path d="M 700,320 Q 900,350 1052,386" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="1052" cy="386" r="4" fill="#4E5BA6" />
              <circle cx="700" cy="320" r="3" fill="#4E5BA6" opacity="0.5" />
            </svg>

            {/* Карточки пунктов (Десктопное позиционирование) */}
            
            {/* 1. Энергия (Top-Left) */}
            <div className="absolute top-[40px] left-0 w-[340px] z-20 group">
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

            {/* 4. Больше уверенности (Top-Right) - Symmetrical text on left, icon on right */}
            <div className="absolute top-[40px] right-0 w-[340px] z-20 group">
              <div className="flex gap-4 items-start justify-end bg-white p-4 rounded-2xl hover:shadow-[0_12px_30px_rgba(78,91,166,0.08)] transition-all duration-300">
                <div className="text-right">
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-1.5 leading-tight">Больше<br />уверенности в себе</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed">Появляется ощущение устойчивости и уверенности, которое не зависит от внешних обстоятельств.</p>
                </div>
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F7FC]">
                  <img src="/manus-storage/pyramid_b0f14d38.png" alt="pyramid" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* 5. Легче принимать решения (Bottom-Right) - Symmetrical text on left, icon on right */}
            <div className="absolute bottom-[100px] right-0 w-[340px] z-20 group">
              <div className="flex gap-4 items-start justify-end bg-white p-4 rounded-2xl hover:shadow-[0_12px_30px_rgba(78,91,166,0.08)] transition-all duration-300">
                <div className="text-right">
                  <h3 className="text-[16px] font-extrabold text-[#1E2238] mb-1.5 leading-tight">Легче принимать<br />решения</h3>
                  <p className="text-[13px] text-[#5A6082] leading-relaxed">Решения больше не сопровождаются внутренним сопротивлением, сомнениями или внутренними конфликтами.</p>
                </div>
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F7FC]">
                  <img src="/manus-storage/y_split_714d4a6d.png" alt="y split" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>

          </div>

          {/* Мобильная и планшетная версия (Вертикальный стек) (активна до xl) */}
          <div className="xl:hidden flex flex-col gap-6 max-w-[600px] mx-auto relative">
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
      </motion.section>"""

# Find and replace the block6 section in Content
pattern = r"\{\/\* Блок 6: 93% клиентов IRT отмечают эти изменения с первых сессий \*\/.*?<\/motion\.section>"
content_modified, count = re.subn(pattern, block6_jsx, content, flags=re.DOTALL)

if count > 0:
    with open(path, "w", encoding="utf-8") as f:
        f.write(content_modified)
    print("Block 6 updated successfully with perfect coordinates and right-aligned symmetry!")
else:
    print("Could not find Block 6 section in Home.tsx")
