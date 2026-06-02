import { Button } from "@/components/ui/button";
import { Heart, Target, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1E7F0] py-8 px-4 sm:px-6 lg:px-8">
      {/* Главный контейнер блока 1920x752 */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-[1920px] min-h-[752px] rounded-[40px] shadow-[0_30px_70px_rgba(30,34,56,0.08)] overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
        style={{
          backgroundImage: "url('/manus-storage/Group2085665064_a3c9c4bc.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Верхняя контентная часть */}
        <div className="relative z-10 flex flex-col items-start mt-4 lg:mt-6">
          <div className="flex flex-col items-start space-y-6 max-w-[700px]">
            {/* Крупный заголовок */}
            <motion.h1
              variants={itemVariants}
              className="text-[40px] sm:text-[52px] lg:text-[64px] font-extrabold text-[#1E2238] leading-[1.05] tracking-[-0.03em]"
            >
              Найдите <br />и устраните <br />
              <span className="text-[#4E5BA6]">первопричину</span> <br />
              проблем
            </motion.h1>

            {/* Короткое описание */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#5A6082] font-medium max-w-[420px] leading-relaxed"
            >
              уже за 1-3-5 сессий вы увидите изменения и начнете{" "}
              <span className="text-[#1E2238] font-bold underline decoration-[#4E5BA6]/30 underline-offset-4">
                действовать по-новому
              </span>
            </motion.p>

            {/* Кнопка действия (без стрелки, точный цвет и скругление) */}
            <motion.div variants={itemVariants} className="pt-2">
              <Button
                size="lg"
                className="h-[58px] px-8 bg-[#4E5BA6] hover:bg-[#3F4B93] text-white text-base font-bold rounded-2xl shadow-[0_8px_20px_rgba(78,91,166,0.2)] hover:shadow-[0_12px_25px_rgba(78,91,166,0.3)] transition-all duration-300 transform active:scale-[0.98]"
              >
                Получить консультацию
              </Button>
            </motion.div>

            {/* Капсула статистики (белый фон, закругленная) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2"
            >
              <div className="bg-white px-6 py-3 rounded-full shadow-[0_8px_20px_rgba(78,91,166,0.04)] border border-white/80 flex items-center justify-center h-[52px]">
                <span className="text-base sm:text-lg font-extrabold text-[#1E2238] tracking-tight whitespace-nowrap">
                  67% клиентам
                </span>
              </div>
              <p className="text-sm text-[#5A6082] font-semibold leading-snug max-w-[280px]">
                <span className="text-[#1E2238] font-bold">достаточно 3х сессий</span> <br />
                для полного решения запроса
              </p>
            </motion.div>
          </div>
        </div>

        {/* Нижняя часть: Три карточки преимуществ */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-12 lg:mt-16"
        >
          {/* Карточка 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-white/60 shadow-[0_8px_25px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-4 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-10 h-10 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Heart className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[#1E2238] tracking-tight">
                Четкий запрос не обязателен
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6082] font-medium leading-relaxed">
                ИРТ решает проблему даже если вы не до конца понимаете, что именно не так или не готовы делиться деталями.
              </p>
            </div>
          </motion.div>

          {/* Карточка 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-white/60 shadow-[0_8px_25px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-4 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-10 h-10 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Target className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[#1E2238] tracking-tight">
                ИРТ подходит как для первого опыта терапии
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6082] font-medium leading-relaxed">
                Так и для тех, кто имеет обширный опыт, все понимает о своей проблеме, но решить до конца не получается.
              </p>
            </div>
          </motion.div>

          {/* Карточка 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-white/60 shadow-[0_8px_25px_rgba(78,91,166,0.02)] hover:shadow-[0_15px_35px_rgba(78,91,166,0.05)] flex flex-col justify-between space-y-4 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm group-hover:border-[#4E5BA6]/30 transition-all duration-300">
              <div className="w-10 h-10 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300">
                <Search className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[#1E2238] tracking-tight">
                Найдите и устраните первопричину проблем
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6082] font-medium leading-relaxed">
                ИРТ комбинирует научные методы психотерапии: КПТ, ДПДГ (EMDR), гипноз и другие.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
