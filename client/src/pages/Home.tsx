import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Heart, Compass, Search, HelpCircle , ArrowLeft, ArrowRight} from "lucide-react";

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

  // Состояния для интерактивного квиза (Блок 4)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    q1: "",
    q2: "",
    q2_other_text: "",
    q3: "",
    q4: "",
    q5: "",
    q6_text: "",
    name: "",
    phone: "",
    messenger: "",
    agree_personal: true,
    agree_marketing: true
  });

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


  const handleSelect = (question: string, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isCurrentStepValid = () => {
    if (currentStep === 0) return !!answers.q1;
    if (currentStep === 1) {
      if (answers.q2 === "q2_other") return !!answers.q2_other_text.trim();
      return !!answers.q2;
    }
    if (currentStep === 2) return !!answers.q3;
    if (currentStep === 3) return !!answers.q4;
    if (currentStep === 4) return !!answers.q5;
    if (currentStep === 5) return true; // Свободный ввод необязателен, но можно ввести
    return false;
  };

  const handleSubmitQuiz = () => {
    // В статическом шаблоне показываем красивый toast-уведомление через sonner
    import("sonner").then(({ toast }) => {
      toast.success("Заявка успешно отправлена!", {
        description: `${answers.name}, мы свяжемся с вами в ${answers.messenger === 'telegram' ? 'Telegram' : answers.messenger === 'whatsapp' ? 'WhatsApp' : 'ВКонтакте'} в течение 15 минут.`,
        duration: 5000,
      });
    });
    // Сбрасываем квиз
    setCurrentStep(0);
    setAnswers({
      q1: "",
      q2: "",
      q2_other_text: "",
      q3: "",
      q4: "",
      q5: "",
      q6_text: "",
      name: "",
      phone: "",
      messenger: "",
      agree_personal: true,
      agree_marketing: true
    });
  };


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

      {/* ==================== БЛОК 4: Интерактивный квиз ==================== */}
      <motion.section
        id="quiz-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-[1920px] rounded-[40px] bg-white border border-[#E2E8F0]/60 shadow-[0_15px_50px_rgba(78,91,166,0.02)] flex flex-col p-6 sm:p-12 lg:p-16 xl:py-16 xl:px-20 space-y-12"
      >
        {/* Шапка квиза: Заголовок слева, бонусы справа */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-8 border-b border-[#F0F4FA]">
          {/* Левая часть: Заголовок */}
          <div className="max-w-[620px] space-y-3">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#1E2238] leading-[1.15] tracking-[-0.02em]">
              Узнайте, как <span className="text-[#4E5BA6]">IRT</span> может помочь именно с вашим запросом
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#5A6082] font-semibold">
              Ответьте на 5 простых вопросов и получите:
            </p>
          </div>

          {/* Правая часть: Бонусы */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Бонус 1 */}
            <div className="bg-[#F4F7FC] border border-[#E2E8F0]/60 rounded-2xl p-4 flex flex-row items-center gap-3.5 sm:w-[190px] h-[72px]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0]/30 flex items-center justify-center text-[#4E5BA6] font-extrabold text-[15px] shadow-sm flex-shrink-0">
                50%
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-extrabold text-[#1E2238] leading-tight">Скидка 50%</span>
                <span className="text-[11px] text-[#5A6082] font-semibold leading-tight">на первую сессию</span>
              </div>
            </div>

            {/* Бонус 2 */}
            <div className="bg-[#F4F7FC] border border-[#E2E8F0]/60 rounded-2xl p-4 flex flex-row items-center gap-3.5 sm:w-[190px] h-[72px]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0]/30 flex items-center justify-center text-[#4E5BA6] shadow-sm flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-extrabold text-[#1E2238] leading-tight">Персональную</span>
                <span className="text-[11px] text-[#5A6082] font-semibold leading-tight">программу работы</span>
              </div>
            </div>

            {/* Бонус 3 */}
            <div className="bg-[#F4F7FC] border border-[#E2E8F0]/60 rounded-2xl p-4 flex flex-row items-center gap-3.5 sm:w-[190px] h-[72px]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0]/30 flex items-center justify-center text-[#4E5BA6] shadow-sm flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-extrabold text-[#1E2238] leading-tight">Подходящего</span>
                <span className="text-[11px] text-[#5A6082] font-semibold leading-tight">вам терапевта</span>
              </div>
            </div>
          </div>
        </div>

        {/* Тело квиза со стейт-машиной */}
        <div className="w-full max-w-[1100px] mx-auto min-h-[480px] flex flex-col justify-between relative">
          
          {/* Прогресс бар */}
          {currentStep < 6 && (
            <div className="w-full space-y-3 mb-8">
              <div className="flex flex-row justify-between items-center text-[13px] sm:text-[14px] font-extrabold text-[#1E2238]">
                <span>Вопрос {currentStep + 1} из 6</span>
                <span className="text-[#4E5BA6]">{Math.round(((currentStep) / 6) * 100)}% готово</span>
              </div>
              <div className="w-full h-2 bg-[#F0F4FA] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / 6) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="h-full bg-[#4E5BA6] rounded-full"
                />
              </div>
            </div>
          )}

          {/* Анимация смены шагов */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="w-full"
              >
                {/* Шаг 1: С чем вы сейчас сталкиваетесь */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#1E2238] tracking-tight">
                      С чем вы сейчас сталкиваетесь?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: "q1_1", text: "Повторяющиеся жизненные ситуации, которые не устраивают", icon: "/manus-storage/q1_icon_1_f423d513.png" },
                        { id: "q1_2", text: "Сильный стресс или кризисная ситуация", icon: "/manus-storage/q1_icon_2_fd61a1e6.png" },
                        { id: "q1_3", text: "Постоянная тревога, напряжение или нежелательная эмоциональная реакция", icon: "/manus-storage/q1_icon_3_d505fa03.png" },
                        { id: "q1_4", text: "Я хочу разобраться в себе и своих реакциях", icon: "/manus-storage/q1_icon_4_3008f267.png" },
                        { id: "q1_5", text: "У меня есть зависимость от ПАВ", icon: "/manus-storage/q1_icon_5_52e527ce.png" },
                        { id: "q1_6", text: "У меня диагностированное психическое отклонение / расстройство", icon: "/manus-storage/q1_icon_6_c9cabe2b.png" }
                      ].map((opt) => {
                        const isSelected = answers.q1 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q1", opt.id)}
                            className={`p-5 rounded-[24px] border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 group cursor-pointer ${
                              isSelected 
                                ? "border-[#4E5BA6] bg-[#4E5BA6]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4E5BA6]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#F4F7FC] border border-[#E2E8F0]/50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                              <img src={opt.icon} alt="icon" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#1E2238] leading-snug mt-4">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Шаг 2: Что беспокоит вас сильнее всего */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#1E2238] tracking-tight">
                      Что беспокоит вас сильнее всего?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: "q2_1", text: "Отношения", icon: "/manus-storage/q2_icon_1_5db4be9e.png" },
                        { id: "q2_2", text: "Самооценка и внутренние состояния", icon: "/manus-storage/q2_icon_2_411ccb0d.png" },
                        { id: "q2_3", text: "Деньги / реализация / карьера", icon: "/manus-storage/q2_icon_3_01493ee3.png" },
                        { id: "q2_4", text: "Сложные жизненные решения", icon: null },
                        { id: "q2_other", text: "Другая ситуация", icon: null }
                      ].map((opt) => {
                        const isSelected = answers.q2 === opt.id;
                        return (
                          <div key={opt.id} className="flex flex-col space-y-3">
                            <button
                              onClick={() => handleSelect("q2", opt.id)}
                              className={`p-5 rounded-[24px] border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 group cursor-pointer w-full ${
                                isSelected 
                                  ? "border-[#4E5BA6] bg-[#4E5BA6]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                  : "border-[#E2E8F0] bg-white hover:border-[#4E5BA6]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                              }`}
                            >
                              <div className="w-12 h-12 rounded-xl bg-[#F4F7FC] border border-[#E2E8F0]/50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                                {opt.icon ? (
                                  <img src={opt.icon} alt="icon" className="w-full h-full object-contain" />
                                ) : (
                                  <HelpCircle className="w-6 h-6 text-[#4E5BA6]" />
                                )}
                              </div>
                              <span className="text-[13px] sm:text-[14px] font-bold text-[#1E2238] leading-snug mt-4">
                                {opt.text}
                              </span>
                            </button>
                            
                            {opt.id === "q2_other" && isSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                              >
                                <input
                                  type="text"
                                  placeholder="Напишите, что вас беспокоит..."
                                  value={answers.q2_other_text || ""}
                                  onChange={(e) => setAnswers(prev => ({ ...prev, q2_other_text: e.target.value }))}
                                  className="w-full h-[50px] px-4 rounded-xl border border-[#4E5BA6] bg-white text-[13px] sm:text-[14px] font-semibold text-[#1E2238] focus:outline-none shadow-sm"
                                />
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Шаг 3: Как давно вас беспокоит ваша проблема */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#1E2238] tracking-tight">
                      Как давно вас беспокоит ваша проблема?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: "q3_1", text: "До 3 месяцев", icon: "/manus-storage/q3_icon_1_33f23e6b.png" },
                        { id: "q3_2", text: "3-12 месяцев", icon: "/manus-storage/q3_icon_2_2a812480.png" },
                        { id: "q3_3", text: "1-3 года", icon: "/manus-storage/q3_icon_3_3baae4e9.png" },
                        { id: "q3_4", text: "4-10 лет", icon: "/manus-storage/q3_icon_4_0363c6d2.png" },
                        { id: "q3_5", text: "Более 10 лет / почти всю жизнь", icon: "/manus-storage/q3_icon_5_20518fb3.png" }
                      ].map((opt) => {
                        const isSelected = answers.q3 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q3", opt.id)}
                            className={`p-5 rounded-[24px] border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 group cursor-pointer ${
                              isSelected 
                                ? "border-[#4E5BA6] bg-[#4E5BA6]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4E5BA6]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#F4F7FC] border border-[#E2E8F0]/50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                              <img src={opt.icon} alt="icon" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#1E2238] leading-snug mt-4">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Шаг 4: Пробовали ли вы раньше работать с психологом */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#1E2238] tracking-tight">
                      Пробовали ли вы раньше работать с психологом?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
                      {[
                        { id: "q4_1", text: "Никогда", icon: "/manus-storage/q4_icon_1_e8564905.png" },
                        { id: "q4_2", text: "Опыт краткосрочной терапии (до 10 сессий)", icon: "/manus-storage/q4_icon_2_73b64749.png" },
                        { id: "q4_3", text: "Опыт длительной классической психотерапии (еженедельные встречи)", icon: "/manus-storage/q4_icon_3_9252ccb8.png" },
                        { id: "q4_4", text: "Обширный опыт в различных подходах и методиках", icon: "/manus-storage/q4_icon_4_fb2fe7cd.png" }
                      ].map((opt) => {
                        const isSelected = answers.q4 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q4", opt.id)}
                            className={`p-5 sm:p-6 rounded-[24px] border text-left flex flex-row items-center gap-4 sm:gap-5 min-h-[100px] transition-all duration-300 group cursor-pointer ${
                              isSelected 
                                ? "border-[#4E5BA6] bg-[#4E5BA6]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4E5BA6]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#F4F7FC] border border-[#E2E8F0]/50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                              <img src={opt.icon} alt="icon" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#1E2238] leading-snug">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Шаг 5: Как вы сейчас воспринимаете свою ситуацию */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#1E2238] tracking-tight">
                      Как вы сейчас воспринимаете свою ситуацию?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: "q5_1", text: "Понимаю причину, но не могу ничего поменять", icon: "/manus-storage/q5_icon_1_da33f7f1.png" },
                        { id: "q5_2", text: "Могу себя контролировать, но сталкиваюсь с откатами", icon: "/manus-storage/q5_icon_2_134a38df.png" },
                        { id: "q5_3", text: "Ощущение, что что-то не так", icon: "/manus-storage/q5_icon_3_3bfc7675.png" }
                      ].map((opt) => {
                        const isSelected = answers.q5 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q5", opt.id)}
                            className={`p-5 rounded-[24px] border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 group cursor-pointer ${
                              isSelected 
                                ? "border-[#4E5BA6] bg-[#4E5BA6]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4E5BA6]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#F4F7FC] border border-[#E2E8F0]/50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                              <img src={opt.icon} alt="icon" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#1E2238] leading-snug mt-4">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Шаг 6: Опишите что именно вас беспокоит */}
                {currentStep === 5 && (
                  <div className="space-y-6 max-w-[800px] mx-auto">
                    <div className="space-y-2">
                      <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#1E2238] tracking-tight">
                        Опишите что именно вас беспокоит
                      </h3>
                      <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold">
                        и какой результат/реакцию вы бы хотели получить в результате
                      </p>
                    </div>
                    <div className="w-full">
                      <textarea
                        rows={6}
                        placeholder="Ответ в свободной форме..."
                        value={answers.q6_text || ""}
                        onChange={(e) => setAnswers(prev => ({ ...prev, q6_text: e.target.value }))}
                        className="w-full p-5 rounded-[24px] border border-[#E2E8F0] bg-white text-[13px] sm:text-[14px] font-semibold text-[#1E2238] focus:border-[#4E5BA6] focus:outline-none shadow-sm placeholder:text-[#A0AEC0] leading-relaxed resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Шаг 7 (Финал): Как нам с вами связаться */}
                {currentStep === 6 && (
                  <div className="space-y-8 max-w-[540px] mx-auto text-center">
                    <div className="space-y-2">
                      <h3 className="text-[24px] sm:text-[28px] font-extrabold text-[#1E2238] tracking-tight">
                        Как нам с вами связаться?
                      </h3>
                      <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-semibold">
                        Введите ваши данные, чтобы зафиксировать скидку и получить программу
                      </p>
                    </div>

                    <div className="space-y-4 text-left">
                      {/* Имя */}
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-extrabold text-[#1E2238] uppercase tracking-wider">Ваше имя</label>
                        <input
                          type="text"
                          placeholder="Иван"
                          value={answers.name || ""}
                          onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full h-[54px] px-5 rounded-2xl border border-[#E2E8F0] bg-white text-[14px] font-bold text-[#1E2238] focus:border-[#4E5BA6] focus:outline-none shadow-sm"
                        />
                      </div>

                      {/* Телефон */}
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-extrabold text-[#1E2238] uppercase tracking-wider">Введите номер телефона</label>
                        <input
                          type="tel"
                          placeholder="+7 (999) 000-00-00"
                          value={answers.phone || ""}
                          onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full h-[54px] px-5 rounded-2xl border border-[#E2E8F0] bg-white text-[14px] font-bold text-[#1E2238] focus:border-[#4E5BA6] focus:outline-none shadow-sm"
                        />
                      </div>

                      {/* Мессенджер */}
                      <div className="space-y-2.5 pt-2">
                        <label className="text-[12px] font-extrabold text-[#1E2238] uppercase tracking-wider block">В каком мессенджере хотите забрать скидку и программу?</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: "telegram", label: "Telegram", color: "hover:border-[#229ED9] hover:bg-[#229ED9]/5" },
                            { id: "whatsapp", label: "WhatsApp", color: "hover:border-[#25D366] hover:bg-[#25D366]/5" },
                            { id: "vk", label: "ВКонтакте", color: "hover:border-[#0077FF] hover:bg-[#0077FF]/5" }
                          ].map((m) => {
                            const isSelected = answers.messenger === m.id;
                            return (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => setAnswers(prev => ({ ...prev, messenger: m.id }))}
                                className={`h-[50px] rounded-xl border text-[13px] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                                  isSelected 
                                    ? "border-[#4E5BA6] bg-[#4E5BA6]/5 text-[#4E5BA6]" 
                                    : `border-[#E2E8F0] bg-white text-[#5A6082] ${m.color}`
                                }`}
                              >
                                {m.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Чекбоксы согласия */}
                      <div className="space-y-3 pt-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={answers.agree_personal === true}
                            onChange={(e) => setAnswers(prev => ({ ...prev, agree_personal: e.target.checked }))}
                            className="mt-1 w-4 h-4 rounded border-[#E2E8F0] text-[#4E5BA6] focus:ring-[#4E5BA6]"
                          />
                          <span className="text-[11px] sm:text-[12px] text-[#5A6082] font-medium leading-normal group-hover:text-[#1E2238] transition-colors">
                            Даю согласие на обработку персональных данных в соответствии с <span className="underline decoration-[#5A6082]/30">политикой обработки персональных данных</span>
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={answers.agree_marketing === true}
                            onChange={(e) => setAnswers(prev => ({ ...prev, agree_marketing: e.target.checked }))}
                            className="mt-1 w-4 h-4 rounded border-[#E2E8F0] text-[#4E5BA6] focus:ring-[#4E5BA6]"
                          />
                          <span className="text-[11px] sm:text-[12px] text-[#5A6082] font-medium leading-normal group-hover:text-[#1E2238] transition-colors">
                            Даю согласие на получение рекламных и информационных рассылок
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Кнопка отправки */}
                    <div className="pt-4">
                      <Button
                        onClick={handleSubmitQuiz}
                        disabled={!answers.phone || !answers.name || !answers.messenger || !answers.agree_personal}
                        className="w-full h-[54px] bg-[#4E5BA6] hover:bg-[#3F4B8C] text-white text-[15px] font-extrabold rounded-2xl shadow-[0_10px_25px_rgba(78,91,166,0.25)] hover:shadow-[0_15px_30px_rgba(78,91,166,0.35)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        Получить консультацию
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Кнопки навигации квиза */}
          {currentStep < 6 && (
            <div className="flex flex-row items-center justify-between pt-8 border-t border-[#F0F4FA] mt-8">
              <Button
                variant="outline"
                disabled={currentStep === 0}
                onClick={handlePrev}
                className="h-[50px] px-8 border-[#E2E8F0] text-[#5A6082] hover:text-[#1E2238] hover:bg-[#F4F7FC] text-[14px] font-bold rounded-xl transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                Назад
              </Button>

              <Button
                disabled={!isCurrentStepValid()}
                onClick={handleNext}
                className="h-[50px] px-10 bg-[#4E5BA6] hover:bg-[#3F4B8C] text-white text-[14px] font-bold rounded-xl shadow-[0_4px_15px_rgba(78,91,166,0.15)] hover:shadow-[0_6px_20px_rgba(78,91,166,0.25)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {currentStep === 5 ? "К контактам" : "Далее"}
              </Button>
            </div>
          )}

        </div>
      </motion.section>

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
                  className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_15px_45px_rgba(78,91,166,0.03)] border border-[#E2E8F0]/40 flex flex-col justify-between p-8 sm:p-10 text-[#1E2238] cursor-pointer group"
                >
                  {/* Фоновое изображение */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={card.bg} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Текстовое содержимое */}
                  <div className="relative z-20 space-y-3">
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold leading-tight tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-[#5A6082] font-semibold leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Декоративный элемент внизу */}
                  <div className="relative z-20 self-end">
                    <div className="w-10 h-10 rounded-full bg-[#1E2238]/5 backdrop-blur-sm border border-[#1E2238]/10 flex items-center justify-center group-hover:bg-[#4E5BA6] group-hover:text-white group-hover:border-[#4E5BA6] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-[#1E2238] group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5" />
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
              className="w-10 h-10 rounded-full bg-[#4E5BA6] hover:bg-[#3A4584] text-white flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer shadow-[0_4px_12px_rgba(78,91,166,0.2)]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div className="text-[13px] font-extrabold text-[#1E2238] flex items-center">
              <span className="text-[#4E5BA6]">0{currentSlideIndex + 1}</span>
              <span className="text-[#A0AEC0] mx-1.5 font-normal">/</span>
              <span className="text-[#5A6082]">03</span>
            </div>

            <button
              onClick={handleNextSlide}
              className="w-10 h-10 rounded-full bg-[#4E5BA6] hover:bg-[#3A4584] text-white flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer shadow-[0_4px_12px_rgba(78,91,166,0.2)]"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
