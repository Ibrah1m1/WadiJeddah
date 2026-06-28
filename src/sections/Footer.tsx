import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FooterProps {
  navigate: (route: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <footer className="bg-background/80 backdrop-blur-[40px] relative py-24 z-0">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <button
              onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 mb-4"
            >
              <img
                src="/assets/logo-transparent.png"
                alt="WJIH Logo"
                className="h-14 w-auto object-contain invert dark:invert-0"
              />
            </button>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              {isAr
                ? 'مجمع وادي جدة للابتكار - البيئة الرئيسية لريادة الأعمال في جدة والمنطقة الغربية. نحن نصنع المستقبل من خلال دعم الابتكار وريادة الأعمال.'
                : 'Wadi Jeddah Innovation Hub - The premier entrepreneurial environment in Jeddah and the Western Region. We shape the future by supporting innovation and entrepreneurship.'}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: <Linkedin size={18} />, label: 'LinkedIn' },
                { icon: <Twitter size={18} />, label: 'X' },
                { icon: <Instagram size={18} />, label: 'Instagram' },
                { icon: <Youtube size={18} />, label: 'YouTube' },
              ].map((social) => (
                <div
                  key={social.label}
                  className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-muted-foreground hover:text-primary transition-all cursor-pointer"
                  title={social.label}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-4">{isAr ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="space-y-3">
              {[
                { label: isAr ? 'الرئيسية' : 'Home', action: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
                { label: isAr ? 'الشركات' : 'Startups', action: () => navigate('/startups') },
                { label: isAr ? 'الخريطة' : 'Map', action: () => navigate('/map') },
                { label: isAr ? 'عن المجمع' : 'About Hub', action: () => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-bold mb-4">{isAr ? 'تواصل معنا' : 'Contact Us'}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span>info@wadi-jeddah.com.sa</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span>966-12-2506083+</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm font-medium">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'جدة, المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-medium">
            {isAr ? '© 2026 مجمع وادي جدة للابتكار. جميع الحقوق محفوظة.' : '© 2026 Wadi Jeddah Innovation Hub. All rights reserved.'}
          </p>
          <p className="text-muted-foreground text-xs font-medium">
            {isAr ? 'بالشراكة مع مركز كامبريدج للابتكار (CIC)' : 'In partnership with Cambridge Innovation Center (CIC)'}
          </p>
        </div>
      </div>
    </footer>
  );
}

