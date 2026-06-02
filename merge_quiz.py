import os

# Пути к файлам
home_path = "/home/ubuntu/figma-block-layout/client/src/pages/Home.tsx"
quiz_code_path = "/home/ubuntu/figma-block-layout/quiz_code.txt"

# Читаем исходный Home.tsx
with open(home_path, "r", encoding="utf-8") as f:
    home_content = f.read()

# Читаем код квиза
with open(quiz_code_path, "r", encoding="utf-8") as f:
    quiz_jsx = f.read()

# Нам нужно добавить стейты квиза в начало компонента Home()
# Ищем строку: export default function Home() {
# И следующую за ней строку с activeTab: const [activeTab, setActiveTab] = useState<string>("Нет четкого запроса");

states_code = """  const [activeTab, setActiveTab] = useState<string>("Нет четкого запроса");

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
"""

# Заменяем стейты
target_tab_state = '  const [activeTab, setActiveTab] = useState<string>("Нет четкого запроса");'
if target_tab_state in home_content:
    home_content = home_content.replace(target_tab_state, states_code)
    print("States code successfully integrated!")
else:
    print("ERROR: Active tab state not found in Home.tsx!")

# Теперь вставим сам JSX квиза перед закрывающим тегом </motion.section> блока 3 или сразу после него
# Блок 3 заканчивается на:
#           </div>
# 
#         </div>
# 
#       </motion.section>
#     </div>
#   );
# }

# Давайте найдем последнее вхождение </motion.section>
last_section_index = home_content.rfind("      </motion.section>")
if last_section_index != -1:
    # Вставляем квиз сразу после </motion.section> третьего блока
    insert_pos = last_section_index + len("      </motion.section>")
    new_home_content = home_content[:insert_pos] + quiz_jsx + home_content[insert_pos:]
    
    # Записываем обновленный Home.tsx
    with open(home_path, "w", encoding="utf-8") as f:
        f.write(new_home_content)
    print("Quiz JSX successfully integrated into Home.tsx!")
else:
    print("ERROR: Could not find last </motion.section> in Home.tsx!")
