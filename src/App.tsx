import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Link, Navigate, Route, Routes } from 'react-router';
import SilkBg from './components/SilkBg';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Showcase from './sections/Showcase';
import About from './sections/About';
import Services from './sections/Services';
import Process from './sections/Process';
import Pricing from './sections/Pricing';
import Estimator from './components/Estimator';
import Faq from './sections/Faq';
import Contact from './sections/Contact';
import TermsPage from './pages/TermsPage';
import {
  applyTheme, getTheme, loadStoredTheme, storeTheme, type ThemeKey,
} from './lib/themes';

export default function App() {
  const [theme, setTheme] = useState<ThemeKey>(() => loadStoredTheme());
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    applyTheme(getTheme(theme));
    storeTheme(theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen text-zinc-300 antialiased">
      <Cursor />
      <SilkBg theme={theme} />

      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-ac origin-left z-[99]"
        style={{ scaleX: progress }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Preloader onDone={() => setReady(true)} />
              <Nav theme={theme} onTheme={setTheme} ready={ready} />

              <main className="relative z-10">
                {ready ? <Hero ready={ready} /> : <div className="min-h-[100svh]" />}
                <Work />
                <Showcase />
                <About />
                <Services />
                <Process />
                <Pricing />
                <Estimator />
                <Faq />
                <Contact />
              </main>

              <footer className="relative z-10 border-t border-white/5">
                <div className="max-w-[76rem] mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                  <span>© {new Date().getFullYear()} lukako — roblox programmer</span>
                  <Link to="/terms" className="transition-colors hover:text-ac focus-visible:outline-none focus-visible:text-ac">
                    Terms of service
                  </Link>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ac animate-pulse" />
                    status: online
                  </span>
                </div>
              </footer>
            </>
          }
        />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
