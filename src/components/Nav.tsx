import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Check } from 'lucide-react';
import { THEMES, type ThemeKey } from '../lib/themes';
import { NAV_LINKS, DISCORD_LINK } from '../lib/content';
import { Magnetic } from './bits';

function ThemeDots({ theme, onChange }: { theme: ThemeKey; onChange: (t: ThemeKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const active = THEMES.find((t) => t.key === theme)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change background theme"
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
      >
        <span
          className="w-4 h-4 rounded-full border border-white/20 transition-all duration-500"
          style={{ background: `linear-gradient(135deg, ${active.accent}, ${active.accent2})` }}
        />
        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
          {active.label}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-12 w-64 rounded-2xl p-3 shadow-2xl"
            style={{ background: 'rgba(8,8,10,0.96)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <div className="flex items-center justify-between px-1 pb-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                Color palette
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ac">
                {active.label}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {THEMES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    onChange(t.key);
                    setOpen(false);
                  }}
                  aria-label={`Use ${t.label} color palette`}
                  title={t.blurb}
                  className={`group relative rounded-xl p-1.5 transition-colors duration-200 ${
                    theme === t.key ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span
                    className="block h-10 w-full rounded-lg border border-white/10 transition-transform duration-200 group-hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(145deg, ${t.accent}, ${t.accent2})` }}
                  />
                  <span className="mt-1.5 block truncate text-center font-mono text-[7px] uppercase tracking-[0.08em] text-zinc-500">
                    {t.label}
                  </span>
                  {theme === t.key && (
                    <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 text-ac">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="mt-3 border-t border-white/5 px-1 pt-2.5 text-[10px] leading-relaxed text-zinc-600">
              {active.blurb}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Nav({
  theme,
  onTheme,
  ready,
}: {
  theme: ThemeKey;
  onTheme: (t: ThemeKey) => void;
  ready: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: ready ? 0 : -60, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 inset-x-0 z-[90] flex justify-center px-4"
      >
        <div className="glass-pill rounded-full flex items-center gap-1 pl-5 pr-2 py-2 shadow-xl shadow-black/30">
          <button onClick={() => go('top')} className="font-display text-lg font-bold tracking-tight text-white mr-3">
            lukako<span className="text-ac">_</span>
          </button>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="px-3.5 py-2 rounded-full font-mono text-[11px] tracking-[0.14em] uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <ThemeDots theme={theme} onChange={onTheme} />
          <Magnetic className="hidden sm:block">
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-ac text-zinc-950 font-bold text-[11px] tracking-[0.12em] uppercase rounded-full px-5 py-2.5 hover:brightness-110 transition-all duration-300 glow-ac"
            >
              Hire me
            </a>
          </Magnetic>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center text-zinc-300"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[95]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-20 z-[96] rounded-3xl p-6 shadow-2xl"
            style={{ background: 'rgba(8,8,10,0.96)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex flex-col">
                {NAV_LINKS.map((l, i) => (
                  <motion.button
                    key={l.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => go(l.id)}
                    className="text-left font-display text-2xl font-bold text-zinc-300 hover:text-white py-2.5 transition-colors"
                  >
                    {l.label}
                  </motion.button>
                ))}
              </nav>
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 bg-ac text-zinc-950 font-bold text-xs tracking-[0.14em] uppercase rounded-xl px-5 py-3.5"
              >
                Hire me
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
