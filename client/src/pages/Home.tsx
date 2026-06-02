import { Button } from "@/components/ui/button";
import { Heart, Target, Search, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // Анимационные контейнеры для плавного каскадного появления элементов
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FC] py-12 px-4 sm:px-6 lg:px-8">
      {/* Главный контейнер блока 1920x752 в Figma (масштабируется на десктопе, адаптивен на мобильных) */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-[1440px] min-h-[752px] rounded-[40px] shadow-[0_20px_50px_rgba(78,91,166,0.05)] border border-white/60 overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[#F4F7FC]"
        style={{
          backgroundColor: "#F4F7FC"
        }}
      >
        {/* Абсолютно позиционированное фоновое изображение для точного контроля его расположения справа */}
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[55%] bg-no-repeat pointer-events-none z-0 opacity-40 lg:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: "url('/manus-storage/Group2085665064_a3c9c4bc.png')",
            backgroundSize: "cover",
            backgroundPosition: "65% center",
          }}
        />
        {/* Плавный полупрозрачный слой для мягкого перехода и отличной читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFF] via-[#F3F6FC]/90 to-transparent pointer-events-none z-0" />

        {/* Верхняя контентная часть */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-4 lg:mt-8">
          {/* Левая колонка: Заголовок, описание, кнопка, статистика */}
          <div className="lg:col-span-8 flex flex-col items-start space-y-8 max-w-[760px]">
            {/* Крупный заголовок */}
            <motion.h1
              variants={itemVariants}
              className="text-[44px] sm:text-[56px] lg:text-[68px] font-extrabold text-[#1E2238] leading-[1.08] tracking-[-0.03em]"
            >
              Найдите <br />и устраните <br />
              <span className="text-[#4E5BA6] relative inline-block">
                первопричину
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#4E5BA6]/10 rounded-full" />
              </span>{" "}
              <br />
              проблем
            </motion.h1>

            {/* Короткое описание */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#5A6082] font-medium max-w-[500px] leading-relaxed"
            >
              уже за 1-3-5 сессий вы увидите изменения и начнете{" "}
              <span className="text-[#1E2238] font-semibold underline decoration-[#4E5BA6]/30 underline-offset-4">
                действовать по-новому
              </span>
            </motion.p>

            {/* Кнопка действия */}
            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-[64px] px-8 bg-[#4E5BA6] hover:bg-[#3F4B93] text-white text-lg font-bold rounded-2xl shadow-[0_10px_25px_rgba(78,91,166,0.25)] hover:shadow-[0_15px_30px_rgba(78,91,166,0.35)] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                Получить консультацию
                <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </Button>
            </motion.div>

            {/* Маленькая плашка статистики */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-4"
            >
              <div className="flex items-baseline">
                <span className="text-[32px] sm:text-[38px] font-extrabold text-[#4E5BA6] tracking-tight">
                  67%
                </span>
                <span className="text-lg font-bold text-[#4E5BA6] ml-1">
                  клиентам
                </span>
              </div>
              <div className="hidden sm:block w-[1px] h-8 bg-[#D3DCEE]" />
              <p className="text-sm sm:text-base text-[#5A6082] font-medium leading-tight max-w-[280px]">
                <span className="text-[#1E2238] font-semibold">достаточно 3х сессий</span> для полного решения запроса
              </p>
            </motion.div>
          </div>

          {/* Правая колонка: Опциональный декоративный элемент или воздух (как в Figma) */}
          <div className="hidden lg:block lg:col-span-4" />
        </div>

        {/* Нижняя часть: Три карточки преимуществ */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-12 lg:mt-16"
        >
          {/* Карточка 1 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_20px_40px_rgba(78,91,166,0.06)] flex flex-col justify-between space-y-6 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300 shadow-inner">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E2238] tracking-tight">
                Четкий запрос не обязателен
              </h3>
              <p className="text-sm text-[#5A6082] font-medium leading-relaxed">
                ИРТ решает проблему даже если вы не до конца понимаете, что именно не так или не готовы делиться деталями.
              </p>
            </div>
          </motion.div>

          {/* Карточка 2 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_20px_40px_rgba(78,91,166,0.06)] flex flex-col justify-between space-y-6 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300 shadow-inner">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E2238] tracking-tight">
                ИРТ подходит как для первого опыта терапии
              </h3>
              <p className="text-sm text-[#5A6082] font-medium leading-relaxed">
                Так и для тех, кто имеет обширный опыт, все понимает о своей проблеме, но решить до конца не получается.
              </p>
            </div>
          </motion.div>

          {/* Карточка 3 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-white/60 shadow-[0_10px_30px_rgba(78,91,166,0.02)] hover:shadow-[0_20px_40px_rgba(78,91,166,0.06)] flex flex-col justify-between space-y-6 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-[#F0F4FA] rounded-full flex items-center justify-center text-[#4E5BA6] group-hover:bg-[#4E5BA6] group-hover:text-white transition-all duration-300 shadow-inner">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E2238] tracking-tight">
                Найдите и устраните первопричину проблем
              </h3>
              <p className="text-sm text-[#5A6082] font-medium leading-relaxed">
                ИРТ комбинирует научные методы психотерапии: КПТ, ДПДГ (EMDR), гипноз и другие.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
