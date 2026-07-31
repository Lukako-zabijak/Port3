import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navigate, Route, Routes } from 'react-router';
import Cursor from './components/Cursor';
import SilkBg from './components/SilkBg';
import PortfolioPage from './pages/PortfolioPage';
import TermsPage from './pages/TermsPage';
import {
  applyTheme,
  getTheme,
  loadStoredTheme,
  storeTheme,
  type ThemeKey,
} from './lib/themes';

export default function App() {
  const [theme, set_theme] = useState<ThemeKey>(() => loadStoredTheme());
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    applyTheme(getTheme(theme));
    storeTheme(theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen text-zinc-300 antialiased">
      <Cursor />
      <SilkBg theme={theme} />
      <motion.div
        className="fixed left-0 right-0 top-0 z-[110] h-[2px] origin-left bg-ac"
        style={{ scaleX: progress }}
      />
      <Routes>
        <Route path="/" element={<PortfolioPage theme={theme} on_theme={set_theme} />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
