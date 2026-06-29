import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MapPageProps {
  navigate: (route: string) => void;
  onClose: () => void;
}

export default function MapPage({ onClose }: MapPageProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-full bg-background/80 backdrop-blur-[40px] flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            >
              {isAr ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{isAr ? 'خريطة المجمع' : 'Hub Map'}</h1>
              <p className="text-xs text-muted-foreground">{isAr ? 'الموقع الجغرافي لمجمع وادي جدة للابتكار' : 'Geographical location of Wadi Jeddah Innovation Hub'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 w-full relative bg-muted/20">
        <iframe 
          src="https://maps.google.com/maps?q=Wadi%20Jeddah%20Innovation%20Hub,%20Jeddah&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-125 dark:invert dark:hue-rotate-180 dark:contrast-100"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wadi Jeddah Map"
        />
      </div>
    </div>
  );
}
