import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Target, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Типы данных для историй клиентов
interface Story {
  id: number;
  text: string;
  avatarColor: string;
  author: string;
  sessions: string;
}

interface CategoryStories {
  [key: string]: Story[];
}

export default function Home() {
  // Активный таб во втором блоке
  const [activeTab, setActiveTab] = useState("Нет четкого запроса");

  // Список категорий (табов)
  const categories = [
    "Нет четкого запроса",
    "Деньги и реализация",
    "Психосоматика",
    "Отношения и секс",
    "Эмоции и состояния",
    "Острые запросы",
  ];

  // Рыбный текст историй клиентов для демонстрации (в точности повторяет визуальный паттерн "Описание Описание...")
  const placeholderText = "Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание";

  // Данные историй по категориям
  const storiesData: CategoryStories = {
    "Нет четкого запроса": [
      {
        id: 1,
        text: "Пришел с ощущением, что 'всё нормально, но ничего не радует'. В процессе терапии ИРТ удалось раскопать глубокое подавление собственных желаний с детства. Буквально за 3 сессии вернулся вкус к жизни, появилось понимание, куда двигаться дальше.",
        avatarColor: "bg-[#7A88D6]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
      {
        id: 2,
        text: "Не мог сформулировать проблему, просто было постоянное фоновое напряжение и тревога. Методы КПТ и гипноза в рамках ИРТ помогли локализовать телесный зажим. Напряжение ушло, дышать стало легче, сон полностью восстановился.",
        avatarColor: "bg-[#5C6BC0]",
        author: "Анонимно",
        sessions: "2 сессии",
      },
      {
        id: 3,
        text: "Думал, что мне уже ничего не поможет, так как не понимал, в чем конкретно причина упадка сил. Специалист ИРТ бережно вывел на ключевые триггеры. Невероятный метод, изменения начались уже после первой встречи.",
        avatarColor: "bg-[#8E99E6]",
        author: "Анонимно",
        sessions: "4 сессии",
      },
    ],
    "Деньги и реализация": [
      {
        id: 4,
        text: "Уперся в финансовый потолок и не мог вырасти в доходе больше года. Через работу со страхами и глубинными убеждениями в ИРТ осознал синдром самозванца. Сменил позиционирование, поднял чек, доход вырос в 1.8 раза за месяц.",
        avatarColor: "bg-[#4E5BA6]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
      {
        id: 5,
        text: "Постоянно откладывал запуск своего проекта, прокрастинировал неделями. ИРТ помог выявить страх публичной критики. Проработали за 2 сессии, проект запущен, первые клиенты уже получили результаты. Пропал страх проявляться.",
        avatarColor: "bg-[#7E8CE0]",
        author: "Анонимно",
        sessions: "2 сессии",
      },
      {
        id: 6,
        text: "Работа приносила только выгорание, но уйти в новое направление было панически страшно. Разобрали самый худший сценарий на сессиях. Появилась уверенность, уволился без тревоги, сейчас успешно прохожу переобучение.",
        avatarColor: "bg-[#6C7BC8]",
        author: "Анонимно",
        sessions: "5 сессий",
      },
    ],
    "Психосоматика": [
      {
        id: 7,
        text: "Полгода мучился от психогенного кашля, врачи разводили руками. На второй сессии ИРТ вышли на подавленную обиду и невысказанные слова близкому человеку. Кашель полностью прошел на следующий день после сессии. Чудо.",
        avatarColor: "bg-[#5C6BC0]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
      {
        id: 8,
        text: "Постоянные головные боли напряжения в конце рабочего дня. Таблетки давали временный эффект. В терапии связали боли с гиперответственностью и неумением расслабляться. Научился распределять нагрузку, боли отпустили.",
        avatarColor: "bg-[#7A88D6]",
        author: "Анонимно",
        sessions: "4 сессии",
      },
      {
        id: 9,
        text: "Синдром раздраженного кишечника обострялся перед любым важным событием. Проработали глубинный страх ошибки методами ДПДГ. СРК больше не беспокоит, спокойно выступаю на конференциях и провожу переговоры.",
        avatarColor: "bg-[#8E99E6]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
    ],
    "Отношения и секс": [
      {
        id: 10,
        text: "Постоянно наступала на одни и те же грабли в отношениях, выбирая холодных и избегающих партнеров. ИРТ помог переписать детский сценарий и проработать дефицит внимания. Сейчас в здоровых, теплых и поддерживающих отношениях.",
        avatarColor: "bg-[#8E99E6]",
        author: "Анонимно",
        sessions: "5 сессий",
      },
      {
        id: 11,
        text: "В браке пропала былая страсть, начались постоянные упреки и холодность. Прошли индивидуальную терапию ИРТ параллельно с партнером. Научились открыто говорить о желаниях без стыда. Сексуальная жизнь заиграла новыми красками.",
        avatarColor: "bg-[#4E5BA6]",
        author: "Анонимно",
        sessions: "4 сессии",
      },
      {
        id: 12,
        text: "Страх близости мешал строить долгосрочные отношения, сбегал при первых признаках серьезности. Проработали травму отвержения из прошлых отношений. Появился внутренний ресурс доверять людям и открываться без паники.",
        avatarColor: "bg-[#7E8CE0]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
    ],
    "Эмоции и состояния": [
      {
        id: 13,
        text: "Жил в состоянии постоянной апатии и эмоционального онемения, ничего не чувствовал. Терапия ИРТ помогла разблокировать подавленный гнев и выплакать старые потери. Вернулась радость, удивление, интерес к жизни и людям.",
        avatarColor: "bg-[#6C7BC8]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
      {
        id: 14,
        text: "Накрывали внезапные вспышки ярости из-за мелочей, страдали близкие и коллеги. Выявили истинную причину раздражения — нарушение личных границ. Научился экологично говорить 'нет' и отстаивать себя, вспышки прекратились.",
        avatarColor: "bg-[#5C6BC0]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
      {
        id: 15,
        text: "Постоянное чувство вины перед всеми: детьми, родителями, руководством. Казалось, что я везде недорабатываю. В ИРТ проработали интроекты должествования. Появилась здоровая самооценка и внутреннее спокойствие.",
        avatarColor: "bg-[#7A88D6]",
        author: "Анонимно",
        sessions: "2 сессии",
      },
    ],
    "Острые запросы": [
      {
        id: 16,
        text: "Переживала тяжелое расставание после 7 лет отношений, не могла спать, постоянно плакала. Метод ДПДГ (EMDR) в рамках ИРТ снизил эмоциональный накал травмы за одну сессию. Спустя 3 сессии смогла отпустить человека с благодарностью.",
        avatarColor: "bg-[#7E8CE0]",
        author: "Анонимно",
        sessions: "3 сессии",
      },
      {
        id: 17,
        text: "Панические атаки начались после аварии, боялся садиться за руль и даже заходить в метро. За 2 сессии ИРТ полностью убрали вегетативный симптом. Спокойно езжу на машине, паника больше ни разу не возвращалась.",
        avatarColor: "bg-[#8E99E6]",
        author: "Анонимно",
        sessions: "2 сессии",
      },
      {
        id: 18,
        text: "Острое горе после потери близкого человека затянулось на год, жизнь остановилась. Бережная интегральная терапия помогла пережить стадии утраты и найти новые смыслы жить дальше. Огромная благодарность терапевту.",
        avatarColor: "bg-[#4E5BA6]",
        author: "Анонимно",
        sessions: "5 сессий",
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#F4F7FC] p-4 sm:p-6 md:p-8 space-y-12 overflow-x-hidden">
      
      {/* ==================== БЛОК 1: Главный баннер (1920x752) ==================== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-[1920px] lg:h-[752px] min-h-[752px] rounded-[40px] bg-white overflow-hidden flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:py-12 xl:px-14 shadow-[0_20px_50px_rgba(78,91,166,0.03)]"
      >
        {/* Фоновое изображение из макета */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none z-0"
          style={{
            backgroundImage: "url('/manus-storage/Group2085665064_a3c9c4bc.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Мягкий градиентный оверлей слева */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[45%] bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none z-0" />

        {/* Верхняя контентная часть */}
        <div className="relative z-10 flex flex-col items-start mt-1 lg:mt-2">
          <div className="flex flex-col items-start space-y-4 lg:space-y-4 max-w-[720px]">
            <motion.h1
              variants={itemVariants}
              className="text-[30px] sm:text-[38px] lg:text-[42px] xl:text-[46px] font-extrabold text-[#1E2238] leading-[1.1] tracking-[-0.03em] font-sans"
            >
              Найдите <br />
              и устраните <br />
              <span className="text-[#4E5BA6] relative inline-block">
                первопричину
              </span> <br />
              проблем
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#5A6082] font-semibold max-w-[420px] leading-relaxed"
            >
              уже за 1-3-5 сессий вы увидите изменения и начнете{" "}
              <span className="text-[#1E2238] font-bold underline decoration-[#4E5BA6]/30 underline-offset-4">
                действовать по-новому
              </span>
            </motion.p>

            <motion.div variants={itemVariants} className="pt-0.5">
              <Button
                size="lg"
                className="h-[48px] px-8 bg-[#4E5BA6] hover:bg-[#3F4B93] text-white text-[14px] font-bold rounded-2xl shadow-[0_8px_20px_rgba(78,91,166,0.15)] hover:shadow-[0_12px_25px_rgba(78,91,166,0.25)] transition-all duration-300 transform active:scale-[0.98]"
              >
                Получить консультацию
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center gap-4 pt-1"
            >
              <div className="bg-white px-5 py-3 rounded-full shadow-[0_8px_20px_rgba(78,91,166,0.04)] border border-[#E2E8F0] flex items-center justify-center h-[42px]">
                <span className="text-[14px] sm:text-[15px] font-extrabold text-[#1E2238] tracking-tight whitespace-nowrap">
                  67% клиентам
                </span>
              </div>
              <p className="text-[12px] sm:text-[13px] text-[#5A6082] font-semibold leading-snug max-w-[280px]">
                <span className="text-[#1E2238] font-extrabold">достаточно 3х сессий</span> <br />
                для полного решения запроса
              </p>
            </motion.div>
          </div>
        </div>

        {/* Нижняя часть: Три карточки преимуществ */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-6 lg:mt-2 w-full"
        >
          {/* Карточка 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-[20px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-2.5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-8 h-8 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#1E2238] tracking-tight">
                Четкий запрос не обязателен
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#5A6082] font-medium leading-relaxed">
                ИРТ решает проблему even if you don't fully understand what is wrong or aren't ready to share details.
              </p>
            </div>
          </motion.div>

          {/* Карточка 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-[20px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-2.5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-8 h-8 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Target className="w-4 h-4" />
              </div>
            </div>
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
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-[20px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-2.5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-8 h-8 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Search className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#1E2238] tracking-tight">
                Найдите и устраните первопричину проблем
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#5A6082] font-medium leading-relaxed">
                ИРТ комбинирует научные методы психотерапии: КПТ, ДПДГ (EMDR), гипноз и другие.
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
          variants={itemVariants}
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
    </div>
  );
}
