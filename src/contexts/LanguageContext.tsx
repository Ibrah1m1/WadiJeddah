import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  home: { ar: 'الرئيسية', en: 'Home' },
  about: { ar: 'عن المجمع', en: 'About Hub' },
  startups: { ar: 'الشركات الناشئة', en: 'Startups' },
  services: { ar: 'الخدمات', en: 'Services' },
  map: { ar: 'الخريطة', en: 'Map' },
  
  // Hero
  hero_title: { ar: 'مجمع وادي جدة للابتكار', en: 'Wadi Jeddah Innovation Hub' },
  hero_subtitle: { ar: 'استكشف مجتمع وادي جدة للابتكار', en: 'Explore the Wadi Jeddah Innovation Community' },
  explore_btn: { ar: 'اكتشف الشركات', en: 'Explore Startups' },
  
  // Sections
  about_title: { ar: 'عن مجمع وادي جدة للابتكار', en: 'About Wadi Jeddah Innovation Hub' },
  about_desc: { ar: 'بيئة ريادية توفر لرواد الأعمال والمبتكرين الاستفادة من مجموعة مختلفة من الخدمات الحصرية، وتتيح فرصة للتعرف على البرامج والأنشطة الريادية التي تُسهم في تسريع نمو الشركات الناشئة بمدينة جدة.', en: 'An entrepreneurial environment providing entrepreneurs and innovators access to various exclusive services and programs that accelerate the growth of startups in Jeddah.' },
  
  startups_title: { ar: 'مجتمع رواد الأعمال', en: 'Entrepreneurs Community' },
  services_title: { ar: 'الخدمات العامة', en: 'General Services' },
  
  // Sectors
  sector_mobility: { ar: 'المدن الذكية ومستقبل التنقل', en: 'Smart Cities & Future Mobility' },
  sector_health: { ar: 'التقنية الحيوية والصحة', en: 'Biotechnology and Health' },
  sector_ai: { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
  sector_services: { ar: 'الخدمات', en: 'Services' },
  
  // Details
  sector_label: { ar: 'القطاع:', en: 'Sector:' },
  age_label: { ar: 'عمر الشركة:', en: 'Company Age:' },
  stage_label: { ar: 'المرحلة:', en: 'Stage:' },
  founder_label: { ar: 'المؤسس:', en: 'Founder:' },
  
  // General Services
  serv_meeting: { ar: 'قاعات اجتماعات', en: 'Meeting Rooms' },
  serv_events: { ar: 'مساحات فعاليات وورش عمل', en: 'Event Spaces & Workshops' },
  serv_internet: { ar: 'إنترنت عالي السرعة', en: 'High-Speed Internet' },
  serv_tech: { ar: 'دعم تقني وفني', en: 'Tech Support' },
  serv_coffee: { ar: 'منطقة قهوة', en: 'Coffee Area' },
  serv_comm: { ar: 'مجتمع ريادي', en: 'Entrepreneurial Community' },
  serv_print: { ar: 'التصوير والطباعة', en: 'Printing & Copying' },
  serv_lockers: { ar: 'خزائن شخصية', en: 'Personal Lockers' },
  serv_security: { ar: 'نظام أمني شامل', en: 'Comprehensive Security' },
  serv_247: { ar: 'دخول على مدار الساعة', en: '24/7 Access' },
  serv_offices: { ar: 'مكاتب خاصة', en: 'Private Offices' },
  serv_coworking: { ar: 'مساحات عمل مشتركة', en: 'Co-working Spaces' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
