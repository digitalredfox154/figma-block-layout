import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Heart, Compass, Search, HelpCircle } from "lucide-react";

// Категории для второго блока (Истории клиентов)
const categories = [
  "Нет четкого запроса",
  "Деньги и реализация",
  "Психосоматика",
  "Отношения и секс",
  "Эмоции и состояния",
  "Острые запросы"
];

// Данные для историй клиентов (второй блок)
const storiesData: Record<string, Array<{ id: number; text: string; author: string; sessions: string; avatarColor: string }>> = {
  "Нет четкого запроса": [
    {
      id: 1,
      text: "Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#4E5BA6]"
    },
    {
      id: 2,
      text: "Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#7C8CE4]"
    },
    {
      id: 3,
      text: "Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#9FB2F0]"
    }
  ],
  "Деньги и реализация": [
    {
      id: 4,
      text: "Клиент пришел с запросом финансового потолка. После проработки старых деструктивных установок и страха проявления, доход вырос в 2 раза уже через месяц.",
      author: "Анонимно",
      sessions: "4 сессии",
      avatarColor: "bg-[#7C8CE4]"
    },
    {
      id: 5,
      text: "Не могла решиться уйти из найма и открыть свое дело. Устранили синдром самозванца, нашли внутренние опоры и уверенность для запуска своего проекта.",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#4E5BA6]"
    },
    {
      id: 6,
      text: "Постоянный саботаж и прокрастинация при выполнении важных задач. Обнаружили скрытые выгоды бездействия и переписали автоматическую реакцию.",
      author: "Анонимно",
      sessions: "5 сессий",
      avatarColor: "bg-[#9FB2F0]"
    }
  ],
  "Психосоматика": [
    {
      id: 7,
      text: "Хронический зажим в шее и плечах, врачи не находили физических причин. После высвобождения подавленного гнева и обид боль полностью ушла.",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#9FB2F0]"
    },
    {
      id: 8,
      text: "Постоянные панические атаки перед публичными выступлениями, сопровождающиеся удушьем. Нашли первопричину в детском опыте и устранили ее.",
      author: "Анонимно",
      sessions: "2 сессии",
      avatarColor: "bg-[#4E5BA6]"
    },
    {
      id: 9,
      text: "Проблемы со сном и постоянная тревожность в теле. Сменили фокус внимания и автоматические телесные реакции на внешние раздражители.",
      author: "Анонимно",
      sessions: "4 сессии",
      avatarColor: "bg-[#7C8CE4]"
    }
  ],
  "Отношения и секс": [
    {
      id: 10,
      text: "Повторяющийся сценарий в отношениях: созависимость и страх быть покинутой. Проработали детско-родительские травмы, выстроили личные границы.",
      author: "Анонимно",
      sessions: "5 сессий",
      avatarColor: "bg-[#4E5BA6]"
    },
    {
      id: 11,
      text: "Постоянные конфликты с партнером из-за недопонимания. Научились выражать свои истинные потребности без обвинений и манипуляций.",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#7C8CE4]"
    },
    {
      id: 12,
      text: "Потеря сексуального влечения к партнеру после нескольких лет брака. Нашли психологические блокировки и вернули эмоциональную близость.",
      author: "Анонимно",
      sessions: "4 сессии",
      avatarColor: "bg-[#9FB2F0]"
    }
  ],
  "Эмоции и состояния": [
    {
      id: 13,
      text: "Постоянное чувство вины и фоновая тревога без видимой причины. Обнаружили интроекты и чужие ожидания, вернули фокус на себя.",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#9FB2F0]"
    },
    {
      id: 14,
      text: "Апатия, отсутствие энергии и интереса к жизни. Нашли подавленные эмоции, которые забирали весь ресурс, и безопасно их прожили.",
      author: "Анонимно",
      sessions: "5 сессий",
      avatarColor: "bg-[#4E5BA6]"
    },
    {
      id: 15,
      text: "Вспышки неконтролируемой агрессии на близких. Осознали триггерные механизмы и интегрировали новую спокойную реакцию на раздражители.",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#7C8CE4]"
    }
  ],
  "Острые запросы": [
    {
      id: 16,
      text: "Переживание тяжелого развода и потеря смысла жизни. Помогли бережно прожить горевание, восстановить внутренние опоры и увидеть будущее.",
      author: "Анонимно",
      sessions: "4 сессии",
      avatarColor: "bg-[#7C8CE4]"
    },
    {
      id: 17,
      text: "Сильный стресс после потери работы и неопределенности. Устранили панику, вернули ясность мышления и уверенность в своих силах.",
      author: "Анонимно",
      sessions: "3 сессии",
      avatarColor: "bg-[#4E5BA6]"
    },
    {
      id: 18,
      text: "Экзистенциальный кризис среднего возраста. Переоценили ценности, нашли новые смыслы и источники вдохновения для следующего этапа жизни.",
      author: "Анонимно",
      sessions: "5 сессий",
      avatarColor: "bg-[#9FB2F0]"
    }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("Нет четкого запроса");

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col items-center py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8 space-y-16 overflow-x-hidden font-sans">
      
      {/* ==================== БЛОК 1: Главный баннер ==================== */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-[1920px] lg:h-[752px] min-h-[752px] rounded-[40px] bg-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 border border-[#E2E8F0]/60 shadow-[0_15px_50px_rgba(78,91,166,0.04)]"
      >
        {/* Фоновое изображение (3D кресла и мозг) */}
        <div 
          className="absolute inset-0 bg-no-repeat pointer-events-none hidden lg:block"
          style={{
            backgroundImage: `url('/manus-storage/Group2085665064_b30349a2.png')`,
            backgroundSize: "cover",
            backgroundPosition: "100% center",
            width: "100%",
            height: "100%",
          }}
        />

        {/* Фоновое изображение для мобильных устройств (уменьшено и снизу) */}
        <div 
          className="absolute bottom-0 right-0 left-0 h-[40%] bg-no-repeat bg-contain bg-bottom pointer-events-none lg:hidden opacity-80"
          style={{
            backgroundImage: `url('/manus-storage/Group2085665064_b30349a2.png')`,
          }}
        />

        {/* Верхняя текстовая и интерактивная часть */}
        <div className="relative z-10 max-w-full lg:max-w-[55%] xl:max-w-[48%] flex flex-col space-y-5 sm:space-y-6 mt-0">
          
          {/* Главный заголовок */}
          <h1 className="text-[36px] sm:text-[48px] lg:text-[40px] xl:text-[46px] font-extrabold text-[#1E2238] leading-[1.08] tracking-[-0.03em]">
            Найдите <br />
            и устраните <br />
            <span className="text-[#4E5BA6] relative">
              первопричину
            </span> <br />
            проблем
          </h1>

          {/* Подзаголовок */}
          <p className="text-[14px] sm:text-[15px] text-[#5A6082] font-semibold leading-relaxed max-w-[420px]">
            уже за 1–3–5 сессий вы увидите изменения и начнете <span className="text-[#1E2238] font-extrabold underline decoration-2 decoration-[#4E5BA6]/30 underline-offset-4">действовать по-новому</span>
          </p>

          {/* Кнопка призыва к действию */}
          <div className="pt-2">
            <Button 
              className="h-[54px] px-10 bg-[#4E5BA6] hover:bg-[#3F4B8C] text-white text-[15px] font-extrabold rounded-2xl shadow-[0_10px_25px_rgba(78,91,166,0.25)] hover:shadow-[0_15px_30px_rgba(78,91,166,0.35)] active:scale-[0.98] transition-all duration-300"
            >
              Получить консультацию
            </Button>
          </div>

          {/* Плашка со статистикой */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Белая капсула */}
            <div className="bg-white px-5 py-2.5 rounded-full border border-[#E2E8F0]/80 shadow-[0_4px_15px_rgba(78,91,166,0.03)] flex items-center justify-center self-start sm:self-auto h-[44px]">
              <span className="text-[14px] font-extrabold text-[#1E2238] whitespace-nowrap">
                67% клиентам
              </span>
            </div>
            {/* Поясняющий текст */}
            <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-extrabold leading-tight">
              достаточно 3х сессий <br className="hidden sm:inline" />
              для полного решения запроса
            </p>
          </div>
        </div>

        {/* Нижняя часть: Карточки преимуществ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mt-10 lg:mt-0"
        >
          {/* Карточка 1 */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-[28px] border border-[#E2E8F0]/80 shadow-[0_8px_30px_rgba(78,91,166,0.02)] flex flex-row items-start gap-4 transition-all duration-300"
          >
            {/* Контейнер иконки */}
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F0F4FA] border border-[#E2E8F0]/60 flex items-center justify-center shadow-sm">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E2E8F0]/30">
                <Heart className="w-4.5 h-4.5 text-[#4E5BA6]" />
              </div>
            </div>
            {/* Текст */}
            <div className="space-y-1">
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#1E2238] tracking-tight">
                Четкий запрос не обязателен
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#5A6082] font-medium leading-relaxed">
                ИРТ решает проблему даже если вы не до конца понимаете, что именно не так или не готовы делиться деталями.
              </p>
            </div>
          </motion.div>

          {/* Карточка 2 */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-[28px] border border-[#E2E8F0]/80 shadow-[0_8px_30px_rgba(78,91,166,0.02)] flex flex-row items-start gap-4 transition-all duration-300"
          >
            {/* Контейнер иконки */}
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F0F4FA] border border-[#E2E8F0]/60 flex items-center justify-center shadow-sm">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E2E8F0]/30">
                <Compass className="w-4.5 h-4.5 text-[#4E5BA6]" />
              </div>
            </div>
            {/* Текст */}
            <div className="space-y-1">
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#1E2238] tracking-tight">
                ИРТ подходит как для первого опыта терапии
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#5A6082] font-medium leading-relaxed">
                Так и для тех, кто имеет обширный опыт, все понимает о своей проблеме, но решить до конца не получается.
              </p>
            </div>
          </motion.div>

          {/* Карточка 3 */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-[28px] border border-[#E2E8F0]/80 shadow-[0_8px_30px_rgba(78,91,166,0.02)] flex flex-row items-start gap-4 transition-all duration-300"
          >
            {/* Контейнер иконки */}
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F0F4FA] border border-[#E2E8F0]/60 flex items-center justify-center shadow-sm">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E2E8F0]/30">
                <Search className="w-4.5 h-4.5 text-[#4E5BA6]" />
              </div>
            </div>
            {/* Текст */}
            <div className="space-y-1">
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#1E2238] tracking-tight">
                Найдите и устраните первопричину проблем
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#5A6082] font-medium leading-relaxed">
                IRT комбинирует научные методы психотерапии: КПТ, ДПДГ (EMDR), гипноз и другие.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ==================== БЛОК 2: Истории клиентов («Более 300 человек...») ==================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-[1920px] rounded-[40px] bg-[#F4F7FC] overflow-hidden flex flex-col items-center p-8 sm:p-12 lg:p-16 xl:py-16 xl:px-20 space-y-8"
      >
        {/* Заголовок и подзаголовок второго блока */}
        <div className="text-center space-y-2 max-w-[800px]">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-extrabold text-[#1E2238] leading-[1.1] tracking-[-0.02em]">
            Более <span className="text-[#4E5BA6]">300 человек</span> уже <br className="hidden sm:inline" />
            улучшили жизнь с IRT
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold uppercase tracking-wider">
            Анонимные истории наших клиентов
          </p>
        </div>

        {/* Табы (Категории) с горизонтальным скроллом на мобильных */}
        <div className="w-full max-w-[1100px] bg-[#E8ECF5]/60 p-1.5 rounded-3xl overflow-x-auto no-scrollbar flex flex-row items-center gap-1 sm:gap-2 border border-[#E2E8F0]">
          {categories.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`relative px-5 py-3 rounded-2xl text-[13px] sm:text-[14px] font-bold transition-all duration-300 whitespace-nowrap ${
                  isActive 
                    ? "text-[#1E2238] bg-white shadow-[0_4px_12px_rgba(78,91,166,0.06)]" 
                    : "text-[#5A6082] hover:text-[#1E2238] hover:bg-white/30"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Сетка карточек историй с плавной анимацией смены контента */}
        <div className="w-full max-w-[1280px] min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {storiesData[activeTab]?.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E2E8F0]/80 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between min-h-[280px] transition-all duration-300 group"
                >
                  {/* Текст истории */}
                  <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold leading-relaxed">
                    {story.text}
                  </p>

                  {/* Футер карточки (Анонимно + Сессии) */}
                  <div className="flex flex-row items-center justify-between pt-6 border-t border-[#F0F4FA] mt-6">
                    <div className="flex flex-row items-center gap-3">
                      <div className={`w-9 h-9 ${story.avatarColor} rounded-full flex items-center justify-center text-white shadow-sm`}>
                        <User className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[13px] sm:text-[14px] font-extrabold text-[#1E2238]">
                        {story.author}
                      </span>
                    </div>
                    <div className="bg-[#F0F4FA] px-4 py-2 rounded-full border border-[#E2E8F0]/60 flex items-center justify-center h-[34px]">
                      <span className="text-[12px] sm:text-[13px] font-extrabold text-[#4E5BA6] whitespace-nowrap">
                        {story.sessions}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Кнопка «Смотреть все» */}
        <motion.div 
          className="pt-4 w-full flex justify-center"
        >
          <Button
            variant="outline"
            className="h-[50px] px-12 border-[#4E5BA6]/30 hover:border-[#4E5BA6] text-[#4E5BA6] hover:bg-[#4E5BA6]/5 text-[14px] font-bold rounded-2xl transition-all duration-300"
          >
            Смотреть все
          </Button>
        </motion.div>
      </motion.section>

      {/* ==================== БЛОК 3: Сравнение классической терапии и IRT ==================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-[1920px] rounded-[40px] bg-white border border-[#E2E8F0]/60 shadow-[0_15px_50px_rgba(78,91,166,0.02)] flex flex-col items-center p-6 sm:p-12 lg:p-16 xl:py-16 xl:px-20 space-y-12"
      >
        {/* Заголовок блока сравнения */}
        <div className="text-center max-w-[1000px] space-y-3">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-extrabold text-[#1E2238] leading-[1.1] tracking-[-0.02em]">
            IRT — для тех, кто устал <br className="hidden sm:inline" />
            говорить о проблеме и хочет <br className="hidden sm:inline" />
            <span className="text-[#4E5BA6]">ВИДИМОГО результата</span>
          </h2>
        </div>

        {/* Карточки сравнения с разделителем VS */}
        <div className="w-full max-w-[1100px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative">
          
          {/* Классическая разговорная терапия */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="w-full lg:w-[45%] bg-white p-8 sm:p-10 rounded-[32px] border border-[#E2E8F0]/80 shadow-[0_10px_30px_rgba(78,91,166,0.01)] flex flex-col space-y-6 min-h-[420px]"
          >
            <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#1E2238] leading-tight">
              Классическая <br />
              разговорная терапия
            </h3>
            <ul className="space-y-4 text-[13px] sm:text-[14px] text-[#5A6082] font-semibold leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#A0AEC0] mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#A0AEC0]" />
                <span>Подробное и длительное обсуждение прошлого опыта</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A0AEC0] mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#A0AEC0]" />
                <span>Осознание причины деструктивной реакции психики на триггер</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A0AEC0] mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#A0AEC0]" />
                <span>Смирение с проблемой</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A0AEC0] mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#A0AEC0]" />
                <span>Обучение себя позитивному отношению к ней</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A0AEC0] mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#A0AEC0]" />
                <span>Приложение усилий для сдерживания нежелательной реакции</span>
              </li>
            </ul>
          </motion.div>

          {/* Разделитель VS */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-16 h-16 rounded-full bg-[#F4F7FC] items-center justify-center border border-[#E2E8F0] z-10">
            <span className="text-[24px] font-extrabold text-[#1E2238] tracking-tight">Vs</span>
          </div>
          
          {/* Разделитель VS для мобильных */}
          <div className="lg:hidden flex w-12 h-12 rounded-full bg-[#F4F7FC] items-center justify-center border border-[#E2E8F0] my-2">
            <span className="text-[18px] font-extrabold text-[#1E2238]">Vs</span>
          </div>

          {/* IRT терапия */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="w-full lg:w-[45%] bg-[#4E5BA6] p-8 sm:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(78,91,166,0.15)] flex flex-col space-y-6 min-h-[420px] text-white"
          >
            <h3 className="text-[20px] sm:text-[22px] font-extrabold leading-tight">
              IRT терапия
            </h3>
            <ul className="space-y-4 text-[13px] sm:text-[14px] text-white/90 font-semibold leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white" />
                <span>Минимум деталей прошлого опыта, <span className="font-extrabold text-white">работаем с конкретной автоматической реакцией</span> на раздражитель</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white" />
                <span>Создание и интеграция в бессознательное новой, желаемой вами реакции на раздражитель</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white" />
                <span>Старая автоматическая реакция без усилия воли <span className="font-extrabold text-white">заменяется на новую, желаемую реакцию</span></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white" />
                <span>Нет необходимости &quot;смиряться с проблемой&quot; т.к. старая реакция больше не воспроизводится</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Промежуточный вывод */}
        <p className="text-center text-[13px] sm:text-[14px] text-[#5A6082] font-semibold max-w-[720px] leading-relaxed pt-4">
          Обсуждение и анализ пережитого опыта <span className="text-[#1E2238] font-extrabold">дает понимание своих эмоциональных и поведенческих сценариев</span>, но не меняют их напрямую.
        </p>

        {/* Дополнительный сильный заголовок */}
        <div className="text-center max-w-[1000px] pt-8 border-t border-[#F0F4FA] w-full">
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#1E2238] leading-[1.2] tracking-[-0.02em]">
            Мы не обсуждаем проблемы годами, а находим и <br className="hidden sm:inline" />
            меняем механизм, <span className="text-[#4E5BA6]">который их создает</span>
          </h2>
        </div>

        {/* Три блока с иллюстрациями */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1100px] pt-4">
          
          {/* Блок 1: Песочные часы */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-[140px] h-[140px] rounded-[32px] overflow-hidden bg-[#F4F7FC] border border-[#E2E8F0]/40 flex items-center justify-center shadow-sm">
              <img 
                src="/manus-storage/hourglass_25277f7f.png" 
                alt="Песочные часы" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold leading-relaxed max-w-[280px]">
              Вы видите <span className="text-[#1E2238] font-extrabold">изменения уже за 1-5 сессий</span>, а не годы терапии
            </p>
          </div>

          {/* Блок 2: Пазлы */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-[140px] h-[140px] rounded-[32px] overflow-hidden bg-[#F4F7FC] border border-[#E2E8F0]/40 flex items-center justify-center shadow-sm">
              <img 
                src="/manus-storage/puzzles_b48d725c.png" 
                alt="Пазлы" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold leading-relaxed max-w-[280px]">
              Не нужно учиться &quot;справляться с проблемой&quot;, <span className="text-[#1E2238] font-extrabold">нежелательные реакции меняются без волевых усилий</span>
            </p>
          </div>

          {/* Блок 3: Якорь в бокале */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-[140px] h-[140px] rounded-[32px] overflow-hidden bg-[#F4F7FC] border border-[#E2E8F0]/40 flex items-center justify-center shadow-sm">
              <img 
                src="/manus-storage/anchor_9ace7ed1.png" 
                alt="Якорь в бокале" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold leading-relaxed max-w-[280px]">
              <span className="text-[#1E2238] font-extrabold">Устойчивые изменения</span> с минимальной вероятностью откатов
            </p>
          </div>

        </div>

      </motion.section>
    </div>
  );
}
