import { useState, useMemo, useEffect } from 'react';
import { startups } from '@/data/startups';
import { Search, Filter, ArrowRight, ArrowLeft, X } from 'lucide-react';
import type { Startup } from '@/data/startups';
import { useLanguage } from '@/contexts/LanguageContext';
import StartupBrandVisual from '@/components/StartupBrandVisual';

interface StartupsPageProps {
  navigate: (route: string) => void;
  onClose: () => void;
}

function StartupCard({ startup, onClick, language }: { startup: Startup; onClick: () => void; language: string }) {
  const isAr = language === 'ar';

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <div className="glass-card rounded-[2rem] overflow-hidden h-full">
        <StartupBrandVisual startup={startup} language={language} />

        <div className="p-6">
          <h3 className="text-lg font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
            {isAr ? startup.nameAr : startup.nameEn}
          </h3>

          <span className="inline-block px-3 py-1 rounded-full text-xs mb-3 bg-muted text-muted-foreground border border-border">
            {isAr ? startup.sectorAr : startup.sectorEn}
          </span>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {isAr ? startup.descriptionAr : startup.descriptionEn}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StartupsPage({ navigate, onClose }: StartupsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSector, setActiveSector] = useState<string>('all');
  const [activeStage, setActiveStage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'az' | 'za'>('default');
  const [showFilters, setShowFilters] = useState(false);
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectors = useMemo(() => {
    const allSectors = startups.map(s => isAr ? s.sectorAr : s.sectorEn);
    return Array.from(new Set(allSectors)).filter(Boolean);
  }, [isAr]);

  const stages = useMemo(() => {
    const allStages = startups.map(s => isAr ? s.stageAr : s.stageEn);
    return Array.from(new Set(allStages)).filter(Boolean);
  }, [isAr]);

  const filteredStartups = useMemo(() => {
    let result = startups.filter((startup) => {
      const nameMatch = isAr ? startup.nameAr : startup.nameEn;
      const descMatch = isAr ? startup.descriptionAr : startup.descriptionEn;
      const sectorMatchStr = isAr ? startup.sectorAr : startup.sectorEn;
      const stageMatchStr = isAr ? startup.stageAr : startup.stageEn;
      
      const matchesSearch =
        !searchQuery ||
        nameMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        descMatch.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSector = activeSector === 'all' || sectorMatchStr === activeSector;
      const matchesStage = activeStage === 'all' || stageMatchStr === activeStage;

      return matchesSearch && matchesSector && matchesStage;
    });

    if (sortBy === 'az') {
      result.sort((a, b) => {
        const nameA = isAr ? a.nameAr : a.nameEn;
        const nameB = isAr ? b.nameAr : b.nameEn;
        return nameA.localeCompare(nameB, isAr ? 'ar' : 'en');
      });
    } else if (sortBy === 'za') {
      result.sort((a, b) => {
        const nameA = isAr ? a.nameAr : a.nameEn;
        const nameB = isAr ? b.nameAr : b.nameEn;
        return nameB.localeCompare(nameA, isAr ? 'ar' : 'en');
      });
    }

    return result;
  }, [searchQuery, activeSector, activeStage, sortBy, isAr]);

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-[40px] pt-[72px]">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            >
              {isAr ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t('startups')}</h1>
              <p className="text-sm text-muted-foreground mt-1">{filteredStartups.length}</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-muted-foreground`} />
              <input
                type="text"
                placeholder={isAr ? "ابحث عن شركة..." : "Search startups..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full h-12 ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground`}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-12 px-6 rounded-xl border flex items-center gap-2 text-sm font-bold transition-all ${
                showFilters
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-card border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <Filter size={18} />
              <span>{isAr ? 'تصفية' : 'Filter'}</span>
            </button>
          </div>

          {/* Filters & Sorting Panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 mt-4 animate-fade-in-up shadow-sm">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sector Filter */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">{isAr ? 'القطاع' : 'Sector'}</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveSector('all')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        activeSector === 'all'
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {isAr ? 'الكل' : 'All'}
                    </button>
                    {sectors.map((sector) => (
                      <button
                        key={sector}
                        onClick={() => setActiveSector(sector)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          activeSector === sector
                            ? 'bg-primary text-primary-foreground font-bold'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage Filter */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">{isAr ? 'مرحلة الشركة' : 'Stage'}</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveStage('all')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        activeStage === 'all'
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {isAr ? 'الكل' : 'All'}
                    </button>
                    {stages.map((stage) => (
                      <button
                        key={stage}
                        onClick={() => setActiveStage(stage)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          activeStage === stage
                            ? 'bg-primary text-primary-foreground font-bold'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sorting */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">{isAr ? 'الترتيب' : 'Sort By'}</h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSortBy('default')}
                      className={`px-3 py-2 rounded-lg text-sm text-start transition-all ${
                        sortBy === 'default'
                          ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent'
                      }`}
                    >
                      {isAr ? 'الترتيب الافتراضي' : 'Default Order'}
                    </button>
                    <button
                      onClick={() => setSortBy('az')}
                      className={`px-3 py-2 rounded-lg text-sm text-start transition-all ${
                        sortBy === 'az'
                          ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent'
                      }`}
                    >
                      {isAr ? 'أبجدياً (أ - ي)' : 'Alphabetical (A - Z)'}
                    </button>
                    <button
                      onClick={() => setSortBy('za')}
                      className={`px-3 py-2 rounded-lg text-sm text-start transition-all ${
                        sortBy === 'za'
                          ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent'
                      }`}
                    >
                      {isAr ? 'أبجدياً (ي - أ)' : 'Alphabetical (Z - A)'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        {filteredStartups.length === 0 ? (
          <div className="text-center py-20">
            <Search size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">{isAr ? 'لا توجد نتائج مطابقة للبحث' : 'No matching results found'}</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveSector('all'); setActiveStage('all'); setSortBy('default'); }}
              className="mt-4 text-primary font-bold hover:underline"
            >
              {isAr ? 'إعادة تعيين البحث' : 'Reset Search'}
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <StartupCard
                key={startup.id}
                startup={startup}
                onClick={() => navigate(`/startup/${startup.id}`)}
                language={language}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
