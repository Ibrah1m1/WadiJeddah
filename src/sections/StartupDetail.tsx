import { startups } from '@/data/startups';
import { ArrowRight, ArrowLeft, User, Clock, Mail, Phone, Globe, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import StartupBrandVisual from '@/components/StartupBrandVisual';

interface StartupDetailProps {
  startupId: string;
  navigate?: (route: string) => void;
  onBack: () => void;
}

export default function StartupDetail({ startupId, onBack }: StartupDetailProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const startup = startups.find((s) => s.id.toString() === startupId);

  if (!startup) {
    return (
      <div className="flex items-center justify-center pt-[88px]" style={{ minHeight: 'calc(100vh - 72px)' }}>
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">{isAr ? 'الشركة غير موجودة' : 'Startup not found'}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold"
          >
            {isAr ? 'العودة' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background/80 backdrop-blur-[40px] pt-[88px]">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 md:py-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm font-bold"
          >
            {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{isAr ? 'العودة للشركات' : 'Back to Startups'}</span>
          </button>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <StartupBrandVisual
              startup={startup}
              language={language}
              variant="detail"
              className="sm:w-64 flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border"
                >
                  {isAr ? startup.sectorAr : startup.sectorEn}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                  {isAr ? startup.stageAr : startup.stageEn}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                {isAr ? startup.nameAr : startup.nameEn}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-extrabold text-foreground mb-4">{isAr ? 'نبذة عن الشركة' : 'About Startup'}</h2>
          <p className="text-muted-foreground leading-loose text-lg whitespace-pre-line">
            {isAr ? startup.descriptionAr : startup.descriptionEn}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* Age */}
          <div className="glass-card rounded-[2rem] p-6 flex items-center justify-between shadow-sm hover:border-primary/30 transition-colors">
            <div className="text-start">
              <p className="text-sm text-muted-foreground mb-1">{t('age_label')}</p>
              <p className="text-2xl text-foreground font-extrabold">{isAr ? startup.ageAr : startup.ageEn}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock size={24} className="text-primary" />
            </div>
          </div>

          {/* Founder */}
          {startup.founderAr && (
            <div className="glass-card rounded-[2rem] p-6 flex items-center justify-between shadow-sm hover:border-primary/30 transition-colors">
              <div className="text-start flex-1 min-w-0 pr-4 rtl:pr-0 rtl:pl-4">
                <p className="text-sm text-primary font-bold mb-1">
                  {isAr 
                    ? (startup.founderTitleAr.includes('مؤسس') ? startup.founderTitleAr : `${t('founder_label')} ${startup.founderTitleAr}`)
                    : (startup.founderTitleEn.toLowerCase().includes('founder') ? startup.founderTitleEn : `${t('founder_label')} ${startup.founderTitleEn}`)
                  }
                </p>
                <p className="text-2xl text-foreground font-extrabold leading-tight">
                  {isAr ? startup.founderAr : startup.founderEn}
                </p>
              </div>
              {startup.founderImageSrc ? (
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white dark:bg-black border border-border flex-shrink-0 shadow-sm flex items-end justify-center">
                  <img
                    src={startup.founderImageSrc}
                    alt={isAr ? `صورة ${startup.founderAr}` : `${startup.founderEn} portrait`}
                    className="h-[90%] w-auto object-contain object-bottom drop-shadow-md"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-border">
                  <User size={32} className="text-primary" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contact Info (Mock) */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-foreground mb-4">{isAr ? 'معلومات التواصل' : 'Contact Information'}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Website */}
            <a href="#" className="flex items-center gap-3 p-4 rounded-[2rem] glass-card transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Globe size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{isAr ? 'الموقع الإلكتروني' : 'Website'}</p>
                <p className="text-sm font-bold text-foreground truncate" dir="ltr">
                  www.{startup.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                </p>
              </div>
            </a>

            {/* Email */}
            <a href="#" className="flex items-center gap-3 p-4 rounded-[2rem] glass-card transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
                <p className="text-sm font-bold text-foreground truncate" dir="ltr">
                  info@{startup.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a href="#" className="flex items-center gap-3 p-4 rounded-[2rem] glass-card transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Phone size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{isAr ? 'رقم الهاتف' : 'Phone'}</p>
                <p className="text-sm font-bold text-foreground truncate" dir="ltr">
                  +966 5{startup.id.toString().padStart(2, '0')} 123 4567
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="#" className="flex items-center gap-3 p-4 rounded-[2rem] glass-card transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Linkedin size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{isAr ? 'لينكد إن' : 'LinkedIn'}</p>
                <p className="text-sm font-bold text-foreground truncate" dir="ltr">
                  @{startup.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '')}
                </p>
              </div>
            </a>

            {/* Twitter / X */}
            <a href="#" className="flex items-center gap-3 p-4 rounded-[2rem] glass-card transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Twitter size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{isAr ? 'منصة X' : 'X Platform'}</p>
                <p className="text-sm font-bold text-foreground truncate" dir="ltr">
                  @{startup.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '')}
                </p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
