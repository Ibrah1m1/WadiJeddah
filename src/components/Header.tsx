import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export default function Header({ currentRoute, navigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('home'), route: '/', action: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: t('startups'), route: '/startups', action: () => navigate('/startups') },
    { label: t('map'), route: '/map', action: () => navigate('/map') },
    { label: t('about'), route: '/', action: () => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
  ];

  return (
    <header className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <div className={`pointer-events-auto w-full max-w-[1200px] mx-auto flex items-center justify-between transition-all duration-500 glass-panel rounded-full px-4 sm:px-6 h-[72px] ${
        scrolled ? 'shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]' : ''
      }`}>
        {/* Logo */}
        <button
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/assets/logo-transparent.png"
            alt="WJIH Logo"
            className="h-12 w-auto object-contain invert dark:invert-0"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full group overflow-hidden ${
                currentRoute === item.route
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Active State Glass Effect */}
              {currentRoute === item.route && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 backdrop-blur-md border border-primary/20 shadow-sm rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover State Glass Effect (for non-active) */}
              {currentRoute !== item.route && (
                <div className="absolute inset-0 bg-primary/[0.08] dark:bg-primary/10 backdrop-blur-md border border-primary/10 shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="px-3 py-2 rounded-full glass-button text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-bold"
          >
            <Languages size={18} />
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full glass-button text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => navigate('/startups')}
            className="px-5 py-2 text-sm font-bold rounded-full glass-button-primary ml-2 rtl:ml-0 rtl:mr-2"
          >
            {t('explore_btn')}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="absolute top-[80px] left-4 right-4 glass-panel rounded-2xl md:hidden overflow-hidden pointer-events-auto"
        >
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setMobileOpen(false);
                }}
                className={`text-right px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  currentRoute === item.route
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground glass-button'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center justify-between py-3 border-t border-white/10 mt-2 pt-4">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 text-muted-foreground font-bold hover:text-foreground glass-button px-4 py-2 rounded-xl"
              >
                <Languages size={18} />
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-muted-foreground hover:text-foreground glass-button rounded-xl"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <button
              onClick={() => { navigate('/startups'); setMobileOpen(false); }}
              className="py-3 mt-2 text-center text-sm font-bold rounded-full glass-button-primary w-full"
            >
              {t('explore_btn')}
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

