import { useEffect, useRef, useState } from 'react';
import { Building2, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setCount(current);
      if (step >= steps) {
        clearInterval(timer);
        setCount(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  const formatNumber = (n: number) => {
    if (n >= 1000) return n.toLocaleString('en');
    return n.toString();
  };

  return (
    <span className="tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const stats = [
    { value: 22, suffix: '', labelAr: 'شركة ناشئة', labelEn: 'Startups', icon: <Building2 size={24} />, colorClass: 'text-primary bg-primary/10' },
    { value: 82000, suffix: '', labelAr: 'م² مساحة المجمع', labelEn: 'm² Area', icon: <TrendingUp size={24} />, colorClass: 'text-primary bg-primary/10' },
    { value: 10, suffix: '', labelAr: 'شركات محتضنة', labelEn: 'Incubated Companies', icon: <Lightbulb size={24} />, colorClass: 'text-primary bg-primary/10' },
    { value: 253, suffix: '+', labelAr: 'شركة سجلت اهتمامها', labelEn: 'Interested Companies', icon: <Users size={24} />, colorClass: 'text-primary bg-primary/10' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-muted/80 backdrop-blur-[40px] relative rounded-[3rem] -my-8 z-10 shadow-xl">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Section */}
          <div 
            className="lg:col-span-5 text-center lg:text-start"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-3">
              <span className="text-xs text-primary font-bold">{isAr ? 'تأثيرنا' : 'Our Impact'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 leading-tight">
              {isAr ? 'أرقام تعكس طموحنا' : 'Numbers reflecting our ambition'}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {isAr 
                ? 'في مجمع وادي جدة للابتكار، نترجم رؤيتنا إلى واقع ملموس من خلال تمكين رواد الأعمال وبناء مجتمع تقني حيوي يساهم في الاقتصاد الرقمي.' 
                : 'At Wadi Jeddah Innovation Hub, we translate our vision into tangible reality by empowering entrepreneurs and building a vibrant tech community.'}
            </p>
          </div>

          {/* Cards Section */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative group ${index % 2 !== 0 ? 'lg:translate-y-4' : ''}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView 
                    ? (index % 2 !== 0 ? 'translateY(1rem)' : 'translateY(0)') 
                    : 'translateY(30px)',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s`
                }}
              >
                <div className="glass-card rounded-[1.5rem] p-5 md:p-6 h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 group-hover:shadow-md">
                  {/* Decorative Background Icon */}
                  <div className="absolute -bottom-6 -right-6 rtl:-left-6 rtl:right-auto text-primary/[0.04] scale-[3] transform -rotate-12 pointer-events-none transition-transform duration-500 group-hover:scale-[3.5] group-hover:-rotate-6">
                    {stat.icon}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.colorClass}`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                    >
                      {stat.icon}
                    </motion.div>

                    <div className="mt-auto">
                      {/* Value */}
                      <div className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-1">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                      </div>

                      {/* Label */}
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">{isAr ? stat.labelAr : stat.labelEn}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

