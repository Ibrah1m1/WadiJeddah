import { useCallback, useRef } from 'react';
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

  const navigate = useCallback((route: string) => {
    if (route === currentRoute) return;
    previousRoute.current = currentRoute;
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
    // The root div is fixed to the viewport height; each page scrolls inside itself
    <div className="fixed inset-0 bg-background overflow-hidden">
      <BackgroundEffects />
      <Header currentRoute={currentRoute} navigate={navigate} />
      <AnimatePresence mode="wait">
        {showHomePage && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            // Each page is its own independent scroll container
            className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-[72px]"
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-[72px]"
          >
            <StartupsPage navigate={navigate} onClose={handleBackFromStartups} />
          </motion.div>
        )}

        {showStartupDetail && (
          <motion.div
            key={`detail-${startupId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-[72px]"
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-[72px]"
          >
            <MapPage navigate={navigate} onClose={handleBackFromMap} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
