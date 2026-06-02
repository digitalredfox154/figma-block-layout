import { Button } from "@/components/ui/button";
import { Heart, Target, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#E1E7F0] p-0 sm:p-4 md:p-8 overflow-x-hidden">
      {/* Главный контейнер блока 1920x752 (Фиксированная высота 752px на больших экранах, как в Figma) */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-[1920px] lg:h-[752px] min-h-[752px] rounded-[40px] bg-[#F4F7FC] overflow-hidden flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:py-12 xl:px-14"
      >
        {/* Фоновое изображение из макета, растянутое во весь экран с точным позиционированием */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none z-0"
          style={{
            backgroundImage: "url('/manus-storage/Group2085665064_a3c9c4bc.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Мягкий градиентный оверлей слева для идеальной читаемости текста (минимальный, чтобы не скрывать кресло) */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[45%] bg-gradient-to-r from-[#F4F7FC]/70 via-[#F4F7FC]/30 to-transparent pointer-events-none z-0" />

        {/* Верхняя контентная часть */}
        <div className="relative z-10 flex flex-col items-start mt-1 lg:mt-2">
          <div className="flex flex-col items-start space-y-4 lg:space-y-4 max-w-[720px]">
            {/* Крупный заголовок с точным размером, межстрочным интервалом и насыщенностью */}
            <motion.h1
              variants={itemVariants}
              className="text-[32px] sm:text-[42px] lg:text-[46px] xl:text-[52px] font-extrabold text-[#1E2238] leading-[1.1] tracking-[-0.03em] font-sans"
            >
              Найдите <br />
              и устраните <br />
              <span className="text-[#4E5BA6] relative inline-block">
                первопричину
              </span> <br />
              проблем
            </motion.h1>

            {/* Описание с подчеркиванием */}
            <motion.p
              variants={itemVariants}
              className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#5A6082] font-semibold max-w-[440px] leading-relaxed"
            >
              уже за 1-3-5 сессий вы увидите изменения и начнете{" "}
              <span className="text-[#1E2238] font-bold underline decoration-[#4E5BA6]/30 underline-offset-4">
                действовать по-новому
              </span>
            </motion.p>

            {/* Кнопка действия (без стрелки, точный цвет и скругление) */}
            <motion.div variants={itemVariants} className="pt-0.5">
              <Button
                size="lg"
                className="h-[48px] px-8 bg-[#4E5BA6] hover:bg-[#3F4B93] text-white text-[14px] font-bold rounded-2xl shadow-[0_8px_20px_rgba(78,91,166,0.15)] hover:shadow-[0_12px_25px_rgba(78,91,166,0.25)] transition-all duration-300 transform active:scale-[0.98]"
              >
                Получить консультацию
              </Button>
            </motion.div>

            {/* Капсула статистики (белая закругленная капсула слева, текст справа) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center gap-4 pt-1"
            >
              <div className="bg-white px-5 py-3 rounded-full shadow-[0_8px_20px_rgba(78,91,166,0.04)] border border-white/90 flex items-center justify-center h-[42px]">
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
            className="bg-white/85 backdrop-blur-md p-5 sm:p-6 rounded-[24px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-3 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-9.5 h-10 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Heart className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#1E2238] tracking-tight">
                Четкий запрос не обязателен
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-medium leading-relaxed">
                ИРТ решает проблему даже если вы не до конца понимаете, что именно не так или не готовы делиться деталями.
              </p>
            </div>
          </motion.div>

          {/* Карточка 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-5 sm:p-6 rounded-[24px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-3 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-10 h-10 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Target className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#1E2238] tracking-tight">
                ИРТ подходит как для первого опыта терапии
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-medium leading-relaxed">
                Так и для тех, кто имеет обширный опыт, все понимает о своей проблеме, но решить до конца не получается.
              </p>
            </div>
          </motion.div>

          {/* Карточка 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-5 sm:p-6 rounded-[24px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-3 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-10 h-10 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Search className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#1E2238] tracking-tight">
                Найдите и устраните первопричину проблем
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#5A6082] font-medium leading-relaxed">
                ИРТ комбинирует научные методы психотерапии: КПТ, ДПДГ (EMDR), гипноз и другие.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
