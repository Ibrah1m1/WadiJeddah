import { useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Header from '@/components/Header';
import Hero from '@/sections/Hero';
import Stats from '@/sections/Stats';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Footer from '@/sections/Footer';
import StartupsPage from '@/sections/StartupsPage';
import StartupDetail from '@/sections/StartupDetail';
import MapPage from '@/sections/MapPage';
import BackgroundEffects from '@/components/BackgroundEffects';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const previousRoute = useRef('/');

  useEffect(() => {
    // Keep track of previous route
    return () => {
      previousRoute.current = currentRoute;
    };
  }, [currentRoute]);

  // Robust scroll to top on route change (handles iOS Safari & Framer Motion timings)
  useEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    scrollToTop();
    const timer1 = setTimeout(scrollToTop, 50);
    const timer2 = setTimeout(scrollToTop, 350); // After the 0.3s AnimatePresence exit
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentRoute]);

  const navigate = useCallback((route: string) => {
    if (route === currentRoute) return;
    routerNavigate(route);
  }, [currentRoute, routerNavigate]);

  const handleBackFromStartups = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleBackFromDetail = useCallback(() => {
    if (previousRoute.current === '/map') {
      navigate('/map');
    } else {
      navigate('/startups');
    }
  }, [navigate]);

  const handleBackFromMap = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Extract startup ID from route
  const startupId = currentRoute.startsWith('/startup/')
    ? currentRoute.replace('/startup/', '')
    : '';

  const showHomePage = currentRoute === '/';
  const showStartupsPage = currentRoute === '/startups';
  const showStartupDetail = currentRoute.startsWith('/startup/');
  const showMapPage = currentRoute === '/map';

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <BackgroundEffects />
      <Header currentRoute={currentRoute} navigate={navigate} />
      <main className="relative">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}>
          {showHomePage && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute w-full"
            >
              <Hero navigate={navigate} />
              <Stats />
              <About />
              <Services />
              <Footer navigate={navigate} />
            </motion.div>
          )}

          {showStartupsPage && (
            <motion.div
              key="startups"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute w-full"
            >
              <StartupsPage navigate={navigate} onClose={handleBackFromStartups} />
            </motion.div>
          )}

          {showStartupDetail && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute w-full"
            >
              <StartupDetail
                startupId={startupId}
                navigate={navigate}
                onBack={handleBackFromDetail}
              />
            </motion.div>
          )}

          {showMapPage && (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute w-full"
            >
              <MapPage navigate={navigate} onClose={handleBackFromMap} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
