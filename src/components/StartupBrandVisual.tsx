import { Building2 } from 'lucide-react';
import type { Startup } from '@/data/startups';
import { cn } from '@/lib/utils';

interface StartupBrandVisualProps {
  startup: Startup;
  language: string;
  variant?: 'card' | 'detail';
  className?: string;
}

export default function StartupBrandVisual({
  startup,
  language,
  variant = 'card',
  className,
}: StartupBrandVisualProps) {
  const isAr = language === 'ar';
  const startupName = isAr ? startup.nameAr : startup.nameEn;
  const founderName = isAr ? startup.founderAr : startup.founderEn;
  const isDetail = variant === 'detail';

  return (
    <div
      className={cn(
        'relative overflow-hidden transition-colors',
        isDetail
          ? 'h-32 sm:h-40 w-full max-w-[280px] bg-transparent'
          : 'h-36 border-b border-border bg-white dark:bg-black',
        className
      )}
    >
      <div className={cn(
        'relative h-full w-full flex items-center',
        isDetail ? 'justify-start sm:justify-center' : 'justify-center p-6'
      )}>
        {startup.logoSrc ? (
          <img
            src={startup.logoSrc}
            alt={isAr ? `شعار ${startupName}` : `${startupName} logo`}
            className={cn("max-h-full max-w-full object-contain drop-shadow-sm", isDetail ? "scale-110" : "hover:scale-105 transition-transform duration-300")}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Building2 size={32} />
          </div>
        )}
      </div>
    </div>
  );
}
