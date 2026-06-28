import { useEffect, useRef, useState } from 'react';
import { startups } from '@/data/startups';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Startup } from '@/data/startups';
import { useLanguage } from '@/contexts/LanguageContext';
import StartupBrandVisual from '@/components/StartupBrandVisual';

interface StartupsPreviewProps {
  navigate: (route: string) => void;
}

function StartupCard({ startup, onClick, language }: { startup: Startup; index?: number; onClick: () => void; language: string }) {
  const isAr = language === 'ar';
  
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <div className="glass-card rounded-[2rem] overflow-hidden h-full">
        <StartupBrandVisual startup={startup} language={language} />

        <div className="p-6">
          {/* Name */}
          <h3 className="text-lg font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
            {isAr ? startup.nameAr : startup.nameEn}
          </h3>

          {/* Sector badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
              {isAr ? startup.sectorAr : startup.sectorEn}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {isAr ? startup.descriptionAr : startup.descriptionEn}
          </p>

          {/* Bottom line */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-end gap-2 text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            {isAr ? (
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StartupsPreview({ navigate }: StartupsPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const previewStartups = startups.slice(0, 6);

  return (
    <section
      id="startups-preview"
      ref={sectionRef}
      className="py-32 bg-background relative z-0"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
            <span className="text-xs text-primary font-bold">{t('startups')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold text-foreground mb-4">
            {t('startups_title')}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewStartups.map((startup, index) => (
            <div
              key={startup.id}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
              }}
            >
              <StartupCard
                startup={startup}
                index={index}
                onClick={() => navigate(`/startup/${startup.id}`)}
                language={language}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className="text-center mt-12"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s'
          }}
        >
          <button
            onClick={() => navigate('/startups')}
            className="group inline-flex items-center gap-2 px-8 py-3 glass-button-primary rounded-full font-bold"
          >
            {t('explore_btn')}
            {language === 'ar' ? (
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
