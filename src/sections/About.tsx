import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const features = [
    { ar: 'مساحات عمل مرنة ومجهزة', en: 'Flexible and equipped workspaces' },
    { ar: 'برامج احتضان وتسريع', en: 'Incubation and acceleration programs' },
    { ar: 'شبكة واسعة من المستثمرين', en: 'Vast network of investors' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-background/80 backdrop-blur-[40px] relative overflow-hidden z-0"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Gallery */}
          <div
            className={`relative ${isAr ? 'order-2 lg:order-1' : 'order-2'}`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Main large image - GIF */}
              <div className="col-span-2 relative group overflow-hidden rounded-2xl">
                <img
                  src="/assets/Wadi-Jeddah2-1024x683.gif"
                  alt="Wadi Jeddah Innovation Hub"
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Two smaller images */}
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/assets/area2-scaled.webp"
                  alt="Hub Area"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/assets/area3-scaled.webp"
                  alt="Hub Interior"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/20 rounded-lg -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-primary/10 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div
            className={`${isAr ? 'order-1 lg:order-2' : 'order-1'}`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
              <span className="text-xs text-primary font-bold">{t('about')}</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold text-foreground mb-6 leading-tight">
              {t('about_title')}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              {t('about_desc')}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.1}s`
                  }}
                >
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{isAr ? feature.ar : feature.en}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById('startups-preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 glass-button-primary rounded-full font-bold"
            >
              {t('explore_btn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

