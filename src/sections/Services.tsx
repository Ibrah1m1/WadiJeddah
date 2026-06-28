import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const pillars = [
  {
    ar: { title: 'بيئة ريادية متكاملة', desc: 'مساحات عمل مرنة ومجهزة بالكامل، من مكاتب مشتركة إلى مساحات خاصة تدعم كل مراحل نمو الشركة.' },
    en: { title: 'Integrated Entrepreneurial Environment', desc: 'Flexible, fully-equipped workspaces—from co-working desks to private offices—supporting every stage of your company\'s growth.' },
  },
  {
    ar: { title: 'برامج احتضان وتسريع', desc: 'برامج مصممة لدعم الشركات الناشئة عبر الإرشاد المتخصص، وربطها بشبكة واسعة من المستثمرين والشركاء الاستراتيجيين.' },
    en: { title: 'Incubation & Acceleration Programs', desc: 'Programs designed to support startups through specialized mentorship and access to a broad network of investors and strategic partners.' },
  },
  {
    ar: { title: 'شراكة مع كامبريدج للابتكار', desc: 'بالشراكة مع مركز كامبريدج للابتكار (CIC)، يُقدّم المجمع نموذجاً عالمياً يجمع بين ريادة الأعمال والابتكار التقني في قلب جدة.' },
    en: { title: 'Partnership with Cambridge Innovation', desc: 'In partnership with Cambridge Innovation Center (CIC), the Hub delivers a world-class model combining entrepreneurship and tech innovation in the heart of Jeddah.' },
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 md:py-32 bg-muted/80 backdrop-blur-[40px] relative overflow-hidden rounded-[3rem] -my-8 z-10 shadow-xl"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
            <span className="text-xs text-primary font-bold">
              {isAr ? 'عن المجمع' : 'About the Hub'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold text-foreground mb-4">
            {isAr ? 'لماذا وادي جدة؟' : 'Why Wadi Jeddah?'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'مجمع متكامل يجمع رواد الأعمال والمبتكرين في بيئة حاضنة تُسرّع النمو وتصنع المستقبل.'
              : 'An integrated hub bringing together entrepreneurs and innovators in an environment that accelerates growth and shapes the future.'}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.15}s`,
              }}
              className="group glass-card rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Number accent */}
              <div className="text-5xl font-black text-primary/10 mb-4 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {isAr ? pillar.ar.title : pillar.en.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {isAr ? pillar.ar.desc : pillar.en.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
