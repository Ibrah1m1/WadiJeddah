import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  navigate: (route: string) => void;
}

export default function Hero({ navigate }: HeroProps) {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/Wadi-Jeddah2-1024x683.gif')` }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/65 dark:bg-black/75 mix-blend-normal" />
        
        {/* Animated red glowing blurs for modern touch */}
        <motion.div 
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, 30, -30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7b191c]/40 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{
            x: [0, -60, 0, 60, 0],
            y: [0, -40, 40, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-lg"
        >
          {t('hero_title')}
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/85 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/startups')}
            className="group px-8 py-3 glass-button-primary rounded-full font-bold flex items-center justify-center gap-2"
          >
            {t('explore_btn')}
            {language === 'ar' ? (
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 glass-button rounded-full font-bold text-white dark:text-white"
          >
            {t('about')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

