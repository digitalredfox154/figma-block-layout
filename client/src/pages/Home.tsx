import { useState, useEffect } from "react";
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


// Данные для Блока 6 (93% клиентов отмечают эти изменения)

// --- Данные для Блока 8 (Всё для вашего комфорта и спокойствия) ---
const block8Cards = [
  {
    id: 1,
    desc: "Например, если вы не готовы их разглашать или у вас NDA",
    bgImg: "/manus-storage/b8_card1_full_c9b1bc77.png",
    isDark: true
  },
  {
    id: 2,
    desc: "Поэтому не заканчиваем сессии строго через 60 минут.",
    bgImg: "/manus-storage/b8_card2_full_67208aef.png",
    isDark: false
  },
  {
    id: 3,
    desc: "",
    bgImg: "/manus-storage/b8_card3_full_c346d4a6.png",
    isDark: true
  },
  {
    id: 4,
    desc: "",
    bgImg: "/manus-storage/b8_card4_full_db6bb665.png",
    isDark: false
  }
];

// --- Данные для Блока 9 (Отзывы клиентов) ---
const block9Reviews = [
  {
    id: 1,
    rating: 5,
    text: "Пришел в IRT с проблемой прокрастинации и выгорания. Не мог начать новые проекты больше полугода. Уже после второй сессии почувствовал, как спало внутреннее напряжение, пропал страх ошибки. Сейчас активно работаю и чувствую себя отлично!",
    tag: "Терапия",
    author: "Анонимно"
  },
  {
    id: 2,
    rating: 5,
    text: "Прошла диагностику, чтобы разобраться в причинах постоянной тревожности. Специалист очень бережно провел сессию, разложил все по полочкам и помог составить четкий план действий. Огромное спасибо за профессионализм!",
    tag: "Диагностика",
    author: "Анонимно"
  },
  {
    id: 3,
    rating: 5,
    text: "Метод IRT действительно работает невероятно быстро. Раньше годами ходила на разговорную терапию, но проблемы с самооценкой возвращались. Здесь за 3 сессии мы полностью убрали триггерные реакции. Ощущение свободы потрясающее.",
    tag: "Терапия",
    author: "Анонимно"
  },
  {
    id: 4,
    rating: 5,
    text: "Обратилась с запросом на постоянные конфликты в отношениях. Удалось найти и проработать глубинный паттерн поведения, который тянулся из детства. Отношения с партнером вышли на совершенно новый, доверительный уровень.",
    tag: "Терапия",
    author: "Анонимно"
  }
];

// --- Данные для Блока 10 (Маршрут к новым эмоциям) ---
const block10Steps = [
  {
    id: 1,
    title: "Вы отвечаете на",
    boldText: "7 простых вопросов",
    img: "/manus-storage/Rectangle_240649678_e7a0d03a.png"
  },
  {
    id: 2,
    title: "Мы подбираем лучшего",
    boldText: "терапевта для решения вашей ситуации",
    img: "/manus-storage/Rectangle_240649677_14fefd1a.png"
  },
  {
    id: 3,
    title: "Вы получаете",
    boldText: "персональный план после диагностики",
    img: "/manus-storage/Rectangle_240649676_7e5d3a83.png"
  },
  {
    id: 4,
    title: "Оплачиваете подходящее",
    boldText: "вам количество сессий",
    img: "/manus-storage/Rectangle_240649675_a35e1c8f.png"
  },
  {
    id: 5,
    title: "С радостью занимаетесь",
    boldText: "с психологом IRT",
    img: "/manus-storage/Rectangle_240649674_43c807f7.png"
  },
  {
    id: 6,
    title: "Наслаждаетесь новой",
    boldText: "версией себя и желаемыми результатами в жизни",
    img: "/manus-storage/Rectangle_240649673_c01521bc.png"
  }
];

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
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        className="relative w-full max-w-[1920px] lg:h-[752px] min-h-[752px] rounded-[40px] overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 border border-[#E2E8F0]/60 shadow-[0_15px_50px_rgba(78,91,166,0.04)]"
      >
        {/* Фоновое изображение на всю ширину экрана (3D кресла и мозг) */}
        <div 
          className="absolute inset-0 bg-no-repeat pointer-events-none hidden lg:block"
          style={{
            backgroundImage: `url('/manus-storage/hero_bg_new_5af05b8a.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "100%",
            height: "100%",
          }}
        />

        {/* Фоновое изображение для мобильных устройств (уменьшено и снизу) */}
        <div 
          className="absolute bottom-0 right-0 left-0 h-[40%] bg-no-repeat bg-cover bg-center pointer-events-none lg:hidden opacity-80"
          style={{
            backgroundImage: `url('/manus-storage/hero_bg_new_5af05b8a.png')`,
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
            className="bg-white/40 backdrop-blur-md p-5 sm:p-6 rounded-[28px] border border-white/30 shadow-[0_8px_30px_rgba(78,91,166,0.02)] flex flex-row items-start gap-4 transition-all duration-300"
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
            className="bg-white/40 backdrop-blur-md p-5 sm:p-6 rounded-[28px] border border-white/30 shadow-[0_8px_30px_rgba(78,91,166,0.02)] flex flex-row items-start gap-4 transition-all duration-300"
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
            className="bg-white/40 backdrop-blur-md p-5 sm:p-6 rounded-[28px] border border-white/30 shadow-[0_8px_30px_rgba(78,91,166,0.02)] flex flex-row items-start gap-4 transition-all duration-300"
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
        <div className="w-full max-w-[1000px] flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12 relative">
          
          {/* Классическая разговорная терапия */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="w-full lg:w-[46%] bg-white p-8 sm:p-10 rounded-[28px] border border-[#E2E8F0] shadow-sm flex flex-col space-y-6 min-h-[420px]"
          >
            <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#1E2238] leading-tight">
              Классическая <br />
              разговорная терапия
            </h3>
            <ul className="space-y-4 text-[13px] sm:text-[14px] text-[#5A6082] font-medium leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-[#CBD5E1] bg-white" />
                <span>Подробное и длительное обсуждение прошлого опыта</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-[#CBD5E1] bg-white" />
                <span>Осознание причины деструктивной реакции психики на триггер</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-[#CBD5E1] bg-white" />
                <span>Смирение с проблемой</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-[#CBD5E1] bg-white" />
                <span>Обучение себя позитивному отношению к ней</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-[#CBD5E1] bg-white" />
                <span>Приложение усилий для сдерживания нежелательной реакции</span>
              </li>
            </ul>
          </motion.div>

          {/* Разделитель VS */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10">
            <span className="text-[44px] font-medium text-[#1E2238] tracking-tight font-sans italic opacity-80">Vs</span>
          </div>
          
          {/* Разделитель VS для мобильных */}
          <div className="lg:hidden flex items-center justify-center my-2">
            <span className="text-[32px] font-medium text-[#1E2238] italic opacity-80">Vs</span>
          </div>

          {/* IRT терапия */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="w-full lg:w-[46%] bg-[#6285B5] p-8 sm:p-10 rounded-[28px] shadow-sm flex flex-col space-y-6 min-h-[420px] text-white"
          >
            <h3 className="text-[20px] sm:text-[22px] font-extrabold leading-tight text-white">
              IRT терапия
            </h3>
            <ul className="space-y-4 text-[13px] sm:text-[14px] text-white/90 font-medium leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-white/60 bg-white" />
                <span>Минимум деталей прошлого опыта, <span className="font-extrabold text-white">работаем с конкретной автоматической реакцией</span> на раздражитель</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-white/60 bg-white" />
                <span>Создание и интеграция в бессознательное новой, желаемой вами реакции на раздражитель</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-white/60 bg-white" />
                <span>Старая автоматическая реакция без усилия воли <span className="font-extrabold text-white">заменяется на новую, желаемую реакцию</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full border border-white/60 bg-white" />
                <span>Нет необходимости &quot;смиряться с проблемой&quot; т.к. старая реакция больше не воспроизводится</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Промежуточный вывод */}
        <div className="text-center text-[14px] sm:text-[15px] text-[#1E2238] font-medium max-w-[850px] leading-relaxed pt-4 space-y-1">
          <p>Обсуждение и анализ пережитого опыта <span className="font-extrabold">дает понимание своих эмоциональных</span></p>
          <p><span className="font-extrabold">и поведенческих сценариев, но не меняют их напрямую.</span></p>
        </div>

        {/* Дополнительный сильный заголовок */}
        <div className="text-center max-w-[1000px] pt-8 border-t border-[#F0F4FA] w-full">
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#1E2238] leading-[1.2] tracking-[-0.02em]">
            Мы не обсуждаем проблемы годами, а находим и <br className="hidden sm:inline" />
            меняем механизм, <span className="text-[#4E5BA6]">который их создает</span>
          </h2>
        </div>

        {/* Три блока с иллюстрациями */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-[1000px] pt-4">
          
          {/* Блок 1: Песочные часы */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-[120px] h-[120px] rounded-[28px] overflow-hidden bg-[#4176B4] flex items-center justify-center shadow-md">
              <img 
                src="/manus-storage/hourglass_25277f7f.png" 
                alt="Песочные часы" 
                className="w-[85%] h-[85%] object-contain"
              />
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#1E2238] font-medium leading-relaxed max-w-[280px]">
              Вы видите <span className="font-extrabold">изменения уже за <br />1-5 сессий</span>, а не годы терапии
            </p>
          </div>

          {/* Блок 2: Пазлы */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-[120px] h-[120px] rounded-[28px] overflow-hidden bg-[#4176B4] flex items-center justify-center shadow-md">
              <img 
                src="/manus-storage/puzzles_b48d725c.png" 
                alt="Пазлы" 
                className="w-[85%] h-[85%] object-contain"
              />
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#1E2238] font-medium leading-relaxed max-w-[280px]">
              Не нужно учиться &quot;справляться <br />с проблемой&quot;, <span className="font-extrabold">нежелательные <br />реакции меняются без <br />волевых усилий</span>
            </p>
          </div>

          {/* Блок 3: Якорь в бокале */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-[120px] h-[120px] rounded-[28px] overflow-hidden bg-[#4176B4] flex items-center justify-center shadow-md">
              <img 
                src="/manus-storage/anchor_9ace7ed1.png" 
                alt="Якорь в бокале" 
                className="w-[85%] h-[85%] object-contain"
              />
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#1E2238] font-medium leading-relaxed max-w-[280px]">
              <span className="font-extrabold">Устойчивые изменения</span> <br />с минимальной вероятностью <br />откатов
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
        className="relative w-full max-w-[1920px] rounded-[40px] overflow-hidden flex flex-col p-6 sm:p-12 lg:p-16 xl:py-16 xl:px-20 space-y-12"
        style={{
          backgroundImage: `url('/manus-storage/quiz_bg_new_c1536441.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Шапка квиза: Заголовок слева, бонусы справа */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-8 border-b border-[#E2E8F0]/20">
          {/* Левая часть: Заголовок */}
          <div className="max-w-[580px] space-y-3">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-normal text-[#1E2238] leading-[1.3] tracking-[-0.01em] font-unbounded">
              Узнайте, как IRT может помочь именно с <span className="text-[#4E5BA6] font-medium">вашим запросом</span>
            </h2>
          </div>

          {/* Правая часть: Бонусы */}
          <div className="flex flex-col space-y-3 w-full lg:w-auto">
            <p className="text-[14px] sm:text-[15px] text-[#1E2238] font-normal leading-normal">
              Ответьте на <span className="font-bold">5 простых вопросов</span> и получите:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Бонус 1 */}
              <div className="bg-white border border-[#E2E8F0]/20 rounded-[16px] px-5 py-3.5 flex flex-row items-center gap-3.5 sm:w-[230px] h-[78px] shadow-[0_4px_20px_rgba(78,91,166,0.03)]">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <img src="/manus-storage/bonus_icon_1_6464b9fb.png" alt="Скидка" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[13px] font-bold text-[#1E2238] leading-tight">
                    Скидку 50%
                  </span>
                  <span className="text-[11.5px] text-[#5A6082] font-normal leading-tight">на первую сессию</span>
                </div>
              </div>

              {/* Бонус 2 */}
              <div className="bg-white border border-[#E2E8F0]/20 rounded-[16px] px-5 py-3.5 flex flex-row items-center gap-3.5 sm:w-[230px] h-[78px] shadow-[0_4px_20px_rgba(78,91,166,0.03)]">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <img src="/manus-storage/bonus_icon_2_2cab107c.png" alt="Программа" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[13px] font-bold text-[#1E2238] leading-tight">
                    Персональную
                  </span>
                  <span className="text-[11.5px] text-[#5A6082] font-normal leading-tight">программу терапевтической работы</span>
                </div>
              </div>

              {/* Бонус 3 */}
              <div className="bg-white border border-[#E2E8F0]/20 rounded-[16px] px-5 py-3.5 flex flex-row items-center gap-3.5 sm:w-[260px] h-[78px] shadow-[0_4px_20px_rgba(78,91,166,0.03)]">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <img src="/manus-storage/bonus_icon_3_e1044371.png" alt="Терапевт" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[11.5px] text-[#5A6082] font-normal leading-tight">
                    Терапевта, подходящего под ваш запрос, с <span className="font-bold text-[#1E2238]">релевантными кейсами</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Тело квиза со стейт-машиной */}
        <div className="w-full max-w-[1100px] mx-auto min-h-[480px] flex flex-col justify-between relative bg-white rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(78,91,166,0.05)] border border-[#E2E8F0]/50">
          
          {/* Прогресс бар */}
          {currentStep < 6 && (
            <div className="w-full space-y-4 mb-8">
              <div className="flex flex-row items-center gap-3">
                <span className="px-3 py-1 bg-[#4f5b93] text-white text-[12px] font-extrabold rounded-full">
                  Вопрос {currentStep + 1}
                </span>
                <div className="flex gap-1.5 flex-grow">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full flex-grow transition-all duration-300 ${
                        idx <= currentStep ? "bg-[#4f5b93]" : "bg-[#F0F4FA]"
                      }`}
                    />
                  ))}
                </div>
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
                    <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#1E2238] tracking-tight leading-tight">
                      С чем вы сейчас сталкиваетесь?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: "q1_1", text: "Повторяющиеся жизненные ситуации, которые не устраивают", icon: "/manus-storage/q1_cropped_icon_1_e92a1b6a.png" },
                        { id: "q1_2", text: "Сильный стресс или кризисная ситуация", icon: "/manus-storage/q1_cropped_icon_2_3fdaef7f.png" },
                        { id: "q1_3", text: "Постоянная тревога, напряжение или нежелательная эмоциональная реакция", icon: "/manus-storage/q1_cropped_icon_3_82535eb6.png" },
                        { id: "q1_4", text: "Я хочу разобраться в себе и своих реакциях", icon: "/manus-storage/q1_cropped_icon_4_707e5628.png" },
                        { id: "q1_5", text: "У меня есть зависимость от ПАВ", icon: "/manus-storage/q1_cropped_icon_5_0980a3a2.png" },
                        { id: "q1_6", text: "У меня диагностированное психическое отклонение / расстройство", icon: "/manus-storage/q1_cropped_icon_6_e5cb220f.png" }
                      ].map((opt) => {
                        const isSelected = answers.q1 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q1", opt.id)}
                            className={`pl-5 pr-0 py-0 rounded-[24px] border text-left flex flex-row items-center justify-between min-h-[96px] sm:min-h-[104px] transition-all duration-300 group cursor-pointer overflow-hidden ${
                              isSelected 
                                ? "border-[#4f5b93] bg-[#4f5b93]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4f5b93]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="flex flex-row items-center gap-3.5 pr-3 py-3.5 flex-grow">
                              <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                isSelected ? "border-[#4f5b93] bg-[#4f5b93]" : "border-[#CBD5E1] bg-white"
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-[12.5px] sm:text-[13.5px] font-bold text-[#1E2238] leading-tight tracking-tight">
                                {opt.text}
                              </span>
                            </div>
                            <div className="w-[96px] sm:w-[104px] self-stretch flex-shrink-0 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                              <img src={opt.icon} alt="icon" className="w-full h-full object-cover" />
                            </div>
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
                        { id: "q2_1", text: "Отношения", icon: "/quiz-icons/q2_icon_1.png" },
                        { id: "q2_2", text: "Самооценка и внутренние состояния", icon: "/quiz-icons/q2_icon_2.png" },
                        { id: "q2_3", text: "Деньги / реализация / карьера", icon: "/quiz-icons/q2_icon_3.png" },
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
                                  ? "border-[#4f5b93] bg-[#4f5b93]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                  : "border-[#E2E8F0] bg-white hover:border-[#4f5b93]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                              }`}
                            >
                              <div className="w-14 h-14 rounded-2xl bg-[#fbeee3] flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                                {opt.icon ? (
                                  <img src={opt.icon} alt="icon" className="w-full h-full object-contain" />
                                ) : (
                                  <HelpCircle className="w-6 h-6 text-[#4f5b93]" />
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
                                  className="w-full h-[50px] px-4 rounded-xl border border-[#4f5b93] bg-white text-[13px] sm:text-[14px] font-semibold text-[#1E2238] focus:outline-none shadow-sm"
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
                        { id: "q3_1", text: "До 3 месяцев", icon: "/quiz-icons/q3_icon_1.png" },
                        { id: "q3_2", text: "3-12 месяцев", icon: "/quiz-icons/q3_icon_2.png" },
                        { id: "q3_3", text: "1-3 года", icon: "/quiz-icons/q3_icon_3.png" },
                        { id: "q3_4", text: "4-10 лет", icon: "/quiz-icons/q3_icon_4.png" },
                        { id: "q3_5", text: "Более 10 лет / почти всю жизнь", icon: "/quiz-icons/q3_icon_5.png" }
                      ].map((opt) => {
                        const isSelected = answers.q3 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q3", opt.id)}
                            className={`p-5 rounded-[24px] border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 group cursor-pointer ${
                              isSelected 
                                ? "border-[#4f5b93] bg-[#4f5b93]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4f5b93]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="w-14 h-14 rounded-2xl bg-[#fbeee3] flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300 shadow-sm">
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
                        { id: "q4_1", text: "Никогда", icon: "/quiz-icons/q4_icon_1.png" },
                        { id: "q4_2", text: "Опыт краткосрочной терапии (до 10 сессий)", icon: "/quiz-icons/q4_icon_2.png" },
                        { id: "q4_3", text: "Опыт длительной классической психотерапии (еженедельные встречи)", icon: "/quiz-icons/q4_icon_3.png" },
                        { id: "q4_4", text: "Обширный опыт в различных подходах and методиках", icon: "/quiz-icons/q4_icon_4.png" }
                      ].map((opt) => {
                        const isSelected = answers.q4 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q4", opt.id)}
                            className={`p-5 sm:p-6 rounded-[24px] border text-left flex flex-row items-center gap-4 sm:gap-5 min-h-[100px] transition-all duration-300 group cursor-pointer ${
                              isSelected 
                                ? "border-[#4f5b93] bg-[#4f5b93]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4f5b93]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="w-14 h-14 rounded-2xl bg-[#fbeee3] flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-sm">
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
                        { id: "q5_1", text: "Понимаю причину, но не могу ничего поменять", icon: "/quiz-icons/q5_icon_1.png" },
                        { id: "q5_2", text: "Могу себя контролировать, но сталкиваюсь с откатами", icon: "/quiz-icons/q5_icon_2.png" },
                        { id: "q5_3", text: "Ощущение, что что-то не так", icon: "/quiz-icons/q5_icon_3.png" }
                      ].map((opt) => {
                        const isSelected = answers.q5 === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect("q5", opt.id)}
                            className={`p-5 rounded-[24px] border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 group cursor-pointer ${
                              isSelected 
                                ? "border-[#4f5b93] bg-[#4f5b93]/5 shadow-[0_8px_25px_rgba(78,91,166,0.06)]" 
                                : "border-[#E2E8F0] bg-white hover:border-[#4f5b93]/50 hover:shadow-[0_8px_20px_rgba(78,91,166,0.03)]"
                            }`}
                          >
                            <div className="w-14 h-14 rounded-2xl bg-[#fbeee3] flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300 shadow-sm">
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
                        className="w-full p-5 rounded-[24px] border border-[#E2E8F0] bg-white text-[13px] sm:text-[14px] font-semibold text-[#1E2238] focus:border-[#4f5b93] focus:outline-none shadow-sm placeholder:text-[#A0AEC0] leading-relaxed resize-none"
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
                          className="w-full h-[54px] px-5 rounded-2xl border border-[#E2E8F0] bg-white text-[14px] font-bold text-[#1E2238] focus:border-[#4f5b93] focus:outline-none shadow-sm"
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
                          className="w-full h-[54px] px-5 rounded-2xl border border-[#E2E8F0] bg-white text-[14px] font-bold text-[#1E2238] focus:border-[#4f5b93] focus:outline-none shadow-sm"
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
                                    ? "border-[#4f5b93] bg-[#4f5b93]/5 text-[#4f5b93]" 
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
                            className="mt-1 w-4 h-4 rounded border-[#E2E8F0] text-[#4f5b93] focus:ring-[#4f5b93]"
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
                            className="mt-1 w-4 h-4 rounded border-[#E2E8F0] text-[#4f5b93] focus:ring-[#4f5b93]"
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
                        className="w-full h-[54px] bg-[#4f5b93] hover:bg-[#3d4875] text-white text-[15px] font-extrabold rounded-2xl shadow-[0_10px_25px_rgba(79,91,147,0.25)] hover:shadow-[0_15px_30px_rgba(79,91,147,0.35)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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
                className="h-[50px] px-10 bg-[#4f5b93] hover:bg-[#3d4875] text-white text-[14px] font-bold rounded-xl shadow-[0_4px_15px_rgba(79,91,147,0.15)] hover:shadow-[0_6px_20px_rgba(79,91,147,0.25)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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
      </motion.section>


      {/* ==================== БЛОК 7: Как проходит первая сессия ==================== */}
      <motion.section 
        id="block7-section"
        className="py-24 relative overflow-hidden bg-gradient-to-r from-[#daeaf6] to-[#cfe1eb]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Абсолютное фоновое изображение лабиринта на весь блок */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <img 
            src="/manus-storage/Maskgroup(7)_a268838a.png" 
            alt="3D Glass Maze Background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
        </div>

        <div className="container relative z-10">
          
          {/* Заголовок и сетка содержимого */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Левая колонка: Заголовок, плашки и этапы */}
            <div className="lg:col-span-5 flex flex-col gap-8 relative z-10">
              <div>
                <h2 className="text-[32px] md:text-[42px] font-black text-[#1E2238] leading-[1.1] mb-6 tracking-tight">
                  Как пройдёт<br />
                  ваша первая<br />
                  сессия в IRT?
                </h2>
                
                {/* Плашки с условиями */}
                <div className="flex flex-wrap gap-2.5">
                  {block7Tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm text-[#5A6082] text-[13px] font-bold rounded-full border border-white/40 hover:bg-white hover:text-[#1E2238] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
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
                    <span className="text-[14px] font-black text-[#4E5BA6] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/40 shadow-[0_2px_6px_rgba(78,91,166,0.05)] group-hover:bg-[#4E5BA6] group-hover:text-white group-hover:border-[#4E5BA6] transition-all duration-300">
                      {step.id}
                    </span>
                    <div className="flex-1">
                      <p className="text-[14.5px] leading-relaxed text-[#1E2238]">
                        <span className="font-extrabold">{step.title}</span>{" "}
                        <span className="text-[#5A6082] font-medium">{step.desc}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Центральная колонка: Мобильная заглушка (на десктопе скрыта, т.к. лабиринт на фоне) */}
            <div className="lg:col-span-4 flex lg:hidden justify-center items-center relative min-h-[260px]">
              <div className="absolute inset-0 bg-radial-gradient from-[#4E5BA6]/10 to-transparent blur-2xl rounded-full" />
              <img 
                src="/manus-storage/Maskgroup(7)_a268838a.png" 
                alt="3D Glass Maze" 
                className="w-full max-w-[320px] h-auto object-contain relative z-10 drop-shadow-[0_16px_32px_rgba(78,91,166,0.08)]"
              />
            </div>

            {/* Пустая колонка на десктопе для сохранения сетки, т.к. центр занят лабиринтом из фона */}
            <div className="hidden lg:block lg:col-span-4" />

            {/* Правая колонка: 3 карточки результатов */}
            <div className="lg:col-span-3 flex flex-col gap-4 relative z-10">
              {block7Results.map((result) => (
                <div 
                  key={result.id}
                  className="flex gap-4 items-center bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(78,91,166,0.03)] hover:shadow-[0_12px_40px_rgba(78,91,166,0.08)] hover:border-[#CBD5E1] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FFF9F6] border border-[#FEEAD9] flex-shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                    <img src={result.img} alt={result.title} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[13px] font-extrabold text-[#1E2238] leading-snug">
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

      {/* --- Блок 8: Всё для вашего комфорта и спокойствия --- */}
      <motion.section 
        id="block8-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-normal text-[#1E2238] leading-[1.3] tracking-[-0.01em] font-unbounded">
              Всё для вашего <span className="text-[#4E5BA6] font-medium">комфорта и спокойствия</span>
            </h2>
          </div>

          {/* Сетка из 4-х карточек */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {block8Cards.map((card) => (
              <div 
                key={card.id}
                className={`rounded-[24px] p-6 md:p-8 flex flex-col justify-between h-[380px] md:h-[420px] transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden shadow-[0_16px_40px_rgba(78,91,166,0.03)] border border-[#E2E8F0]/20`}
              >
                {/* Background Image */}
                <img 
                  src={card.bgImg} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />

                {/* Content on top of background */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className={`text-[16px] md:text-[18px] font-normal leading-snug mb-3 ${
                      card.isDark ? "text-white" : "text-[#1E2238]"
                    }`}>
                      {card.id === 1 && (
                        <>
                          <span className="font-bold">Эффективно решаем</span>{" "}
                          ваш запрос даже без{" "}
                          <span className="font-bold">подробностей ситуации</span>
                        </>
                      )}
                      {card.id === 2 && (
                        <>
                          Мы работаем до момента,{" "}
                          <span className="font-bold">когда ваше состояние будет комфортным</span>,{" "}
                          чтобы завершить сеанс
                        </>
                      )}
                      {card.id === 3 && (
                        <>
                          Возможность{" "}
                          <span className="font-bold">переноса сессии без</span>{" "}
                          лимита
                        </>
                      )}
                      {card.id === 4 && (
                        <>
                          Полный возврат{" "}
                          <span className="font-bold">при отмене за 24 часа</span>
                        </>
                      )}
                    </h3>
                    {card.desc && (
                      <p className={`text-[13px] font-normal leading-relaxed ${
                        card.isDark ? "text-white/80" : "text-[#5A6082]"
                      }`}>
                        {card.desc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Блок 9: Отзывы клиентов --- */}
      <motion.section 
        id="block9-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-24 bg-[#F4F7FC]"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight text-[#1E2238] leading-[1.1] mb-4">
              Отзывы тех, кто <span className="text-[#4E5BA6]">уже работал</span> <br />
              со специалистами IRT
            </h2>
          </div>

          {/* Слайдер отзывов */}
          <div className="relative max-w-5xl mx-auto px-4 md:px-12">
            
            {/* Ограничитель слайдов */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{ transform: `translateX(calc(-${currentReviewIndex * 100}% - ${currentReviewIndex * 24}px))` }}
              >
                {block9Reviews.map((review) => (
                  <div 
                    key={review.id}
                    className="min-w-full md:min-w-[calc(50%-12px)] bg-white rounded-[32px] p-6 md:p-8 border border-[#E2E8F0] shadow-[0_16px_40px_rgba(78,91,166,0.02)] flex flex-col justify-between relative overflow-hidden group hover:border-[#CBD5E1] transition-all duration-300"
                  >
                    {/* Кавычка на фоне */}
                    <div className="absolute right-6 bottom-6 text-[#E2E8F0] opacity-40 group-hover:text-[#4E5BA6]/10 transition-colors duration-500 pointer-events-none">
                      <svg width="48" height="38" viewBox="0 0 48 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 22.3043C0 9.91304 8.34783 0 20.8696 0V7.43478C14.6087 7.43478 10.4348 11.5652 10.4348 17.3478H20.8696V38H0V22.3043ZM27.1304 22.3043C27.1304 9.91304 35.4783 0 48 0V7.43478C41.7391 7.43478 37.5652 11.5652 37.5652 17.3478H48V38H27.1304V22.3043Z" />
                      </svg>
                    </div>

                    <div>
                      {/* Звезды рейтинга */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                      </div>

                      {/* Текст отзыва */}
                      <p className="text-[14px] md:text-[15px] text-[#5A6082] font-medium leading-relaxed mb-6 relative z-10">
                        {review.text}
                      </p>
                    </div>

                    {/* Автор и тег */}
                    <div className="flex justify-between items-center relative z-10 mt-auto pt-4 border-t border-[#F1F5F9]">
                      <span className="text-[14px] font-extrabold text-[#1E2238]">
                        {review.author}
                      </span>
                      <span className="px-3 py-1 bg-[#F1F5F9] text-[#5A6082] text-[12px] font-extrabold rounded-full">
                        {review.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Стрелки навигации */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button 
                onClick={() => setCurrentReviewIndex(prev => Math.max(0, prev - 1))}
                disabled={currentReviewIndex === 0}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  currentReviewIndex === 0 
                    ? "border-[#E2E8F0] text-[#CBD5E1] cursor-not-allowed" 
                    : "border-[#4E5BA6] text-[#4E5BA6] hover:bg-[#4E5BA6] hover:text-white active:scale-95"
                }`}
              >
                <ArrowLeft size={20} />
              </button>

              {/* Индикатор слайдов */}
              <div className="flex gap-2">
                {[...Array(block9Reviews.length - (isMobile ? 0 : 1))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReviewIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentReviewIndex === i ? "w-6 bg-[#4E5BA6]" : "w-2 bg-[#CBD5E1]"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setCurrentReviewIndex(prev => Math.min(block9Reviews.length - (isMobile ? 1 : 2), prev + 1))}
                disabled={currentReviewIndex >= block9Reviews.length - (isMobile ? 1 : 2)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  currentReviewIndex >= block9Reviews.length - (isMobile ? 1 : 2)
                    ? "border-[#E2E8F0] text-[#CBD5E1] cursor-not-allowed" 
                    : "border-[#4E5BA6] text-[#4E5BA6] hover:bg-[#4E5BA6] hover:text-white active:scale-95"
                }`}
              >
                <ArrowRight size={20} />
              </button>
            </div>

          </div>
        </div>
      </motion.section>

      {/* --- Блок 10: Маршрут к новым эмоциям --- */}
      <motion.section 
        id="block10-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-24 bg-[#E1EAF3] relative overflow-hidden"
      >
        {/* Декоративные фоновые элементы */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#4E5BA6]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
            <h2 className="text-[28px] md:text-[40px] font-extrabold tracking-tight text-[#1E2238] leading-[1.2] mb-4">
              Посмотрите на наш маршрут <br />
              <span className="text-[#4E5BA6]">к вашим новым эмоциям,</span> <br />
              действиям и результатам
            </h2>
          </div>

          {/* Сетка шагов маршрута */}
          <div className="relative max-w-6xl mx-auto mb-16 md:mb-24">
            
            {/* Соединительная линия (только для десктопа) */}
            <div className="hidden md:block absolute top-[90px] left-[10%] right-[10%] h-[2px] pointer-events-none">
              {/* Пунктирная линия в два ряда с переходом */}
              <svg className="w-full h-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Линия первого ряда (шаги 1-3) */}
                <path d="M 0,2 L 800,2" stroke="#4E5BA6" strokeWidth="2" strokeDasharray="6 6" className="opacity-30" />
                {/* Соединитель между рядами (зигзаг от шага 3 вниз к шагу 4) */}
                <path d="M 800,2 L 800,210 L 0,210" stroke="#4E5BA6" strokeWidth="2" strokeDasharray="6 6" className="opacity-30" />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-36 gap-x-8">
              {block10Steps.map((step, idx) => (
                <div key={step.id} className="flex flex-col items-center text-center relative group">
                  
                  {/* Иконка шага в карточке */}
                  <div className="w-[180px] h-[120px] bg-white rounded-[24px] shadow-[0_12px_32px_rgba(78,91,166,0.04)] border border-white/80 p-3 flex items-center justify-center mb-6 relative hover:scale-105 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(78,91,166,0.08)]">
                    <img 
                      src={step.img} 
                      alt={step.boldText} 
                      className="max-w-[85px] max-h-[85px] object-contain"
                    />
                    
                    {/* Номер шага (бейджик на иконке) */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[14px] font-extrabold text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white group-hover:border-[#4E5BA6] transition-all duration-300">
                      {step.id}
                    </div>
                  </div>

                  {/* Текст шага */}
                  <div className="px-4 max-w-[280px]">
                    <p className="text-[14px] md:text-[15px] text-[#5A6082] leading-relaxed">
                      {step.title} <span className="font-extrabold text-[#1E2238]">{step.boldText}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Финальная плашка CTA */}
          <div className="max-w-5xl mx-auto bg-white rounded-[32px] p-6 md:p-10 border border-white/60 shadow-[0_20px_50px_rgba(78,91,166,0.05)] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 relative overflow-hidden">
            {/* Блик на фоне */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#4E5BA6]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-[20px] md:text-[28px] font-extrabold text-[#1E2238] leading-[1.2] mb-2">
                Нажмите на кнопку <br className="hidden md:block" />
                и оставьте заявку,
              </h3>
              <p className="text-[13px] md:text-[14px] text-[#5A6082] font-medium">
                чтобы назначить сессию и получить рекомендации по подготовке уже сегодня
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto">
              <Button 
                onClick={() => {
                  const el = document.getElementById('quiz-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full md:w-auto px-8 py-6 h-auto text-[15px] font-extrabold bg-[#4E5BA6] hover:bg-[#3D4A8F] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Записаться
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- Блок 11: Основатель метода IRT --- */}
      <motion.section 
        id="block11-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-24 bg-white relative overflow-hidden"
      >
        <div className="container relative z-10">
          
          {/* Заголовок секции */}
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <h2 className="text-[28px] md:text-[40px] font-extrabold tracking-tight text-[#1E2238] leading-[1.2]">
              Основатель <br className="md:hidden" /><span className="text-[#4E5BA6]">метода IRT</span>
            </h2>
          </div>

          {/* Карточка основателя (Большой контейнер с закругленными углами) */}
          <div className="max-w-5xl mx-auto bg-[#F8FAFC] rounded-[32px] border border-[#E2E8F0] p-6 md:p-12 shadow-sm flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            
            {/* Левая колонка: Фотография основателя */}
            <div className="w-full lg:w-[420px] shrink-0 relative group">
              {/* Элегантная рамка для фото */}
              <div className="rounded-[24px] overflow-hidden bg-[#F1F5F9] border border-white/60 shadow-md relative aspect-[4/5] max-w-[380px] mx-auto lg:max-w-none">
                <img 
                  src="/manus-storage/founder_yana_646603a2.png" 
                  alt="Яна Миргородская" 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700"
                />
              </div>
            </div>

            {/* Правая колонка: Информация об основателе */}
            <div className="flex-1 flex flex-col justify-center text-left">
              
              {/* Плашка с именем */}
              <div className="bg-[#4E5BA6] text-white rounded-[24px] p-6 md:p-8 mb-6 shadow-sm relative overflow-hidden">
                {/* Блик */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                
                <p className="text-[12px] md:text-[13px] font-bold text-white/70 uppercase tracking-widest mb-1">
                  Основатель метода IRT
                </p>
                <h3 className="text-[24px] md:text-[32px] font-extrabold leading-[1.2] mb-3">
                  Яна Миргородская
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/90 leading-relaxed font-medium">
                  Член общероссийской профессиональной психотерапевтической лиги
                </p>
              </div>

              {/* Плашка с опытом */}
              <div className="bg-[#F1F5F9] rounded-[24px] p-6 md:p-8 mb-6 border border-[#E2E8F0]">
                <p className="text-[11px] md:text-[12px] font-extrabold text-[#4E5BA6] tracking-wider uppercase mb-3">
                  Опыт:
                </p>
                <p className="text-[14px] md:text-[15px] text-[#5A6082] leading-relaxed mb-4">
                  За более чем <span className="font-extrabold text-[#1E2238]">6 лет</span>, опробовала на себе большинство методов психотерапии и решила свой "нерешаемый" запрос, с которым большинство психологов не могли справиться.
                </p>
                <p className="text-[14px] md:text-[15px] text-[#5A6082] leading-relaxed font-medium">
                  Вывела самые эффективные связки техник и методик для решения различных запросов, объединив лучшие научные методы психотерапии в единое целое — в IRT.
                </p>
              </div>

              {/* Счетчик отзывов */}
              <div className="flex items-center gap-4 mb-8 pl-2">
                <div className="flex items-baseline">
                  <span className="text-[36px] md:text-[44px] font-black text-[#1E2238] tracking-tight leading-none">
                    350
                  </span>
                  <span className="text-[24px] md:text-[28px] font-bold text-[#4E5BA6] ml-0.5 leading-none">
                    +
                  </span>
                </div>
                <p className="text-[13px] md:text-[14px] text-[#5A6082] leading-snug font-medium max-w-[280px]">
                  <span className="font-extrabold text-[#1E2238]">восторженных отзывов от клиентов</span>, решивших свои запросы за несколько сессий
                </p>
              </div>

              {/* Кнопка "Подробнее о Яне" */}
              <div className="flex justify-start">
                <Button 
                  onClick={() => {
                    const el = document.getElementById('quiz-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="outline"
                  className="px-8 py-5 h-auto text-[14px] font-extrabold border-[#4E5BA6] text-[#4E5BA6] hover:bg-[#4E5BA6] hover:text-white rounded-full transition-all duration-300 active:scale-95 flex items-center gap-2"
                >
                  <span>Подробнее о Яне</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>

            </div>

          </div>

        </div>
      </motion.section>




    </div>
  );
}
