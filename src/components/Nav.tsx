import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal as create_portal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Check } from 'lucide-react';
import { THEMES, type ThemeKey } from '../lib/themes';
import { NAV_LINKS, DISCORD_LINK } from '../lib/content';
import { Magnetic } from './bits';

function ThemeDots({ theme, onChange }: { theme: ThemeKey; onChange: (t: ThemeKey) => void }) {
  const [open, setOpen] = useState(false);
  const [panel_right, set_panel_right] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  const panel_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      const clicked_trigger = ref.current?.contains(target) ?? false;
      const clicked_panel = panel_ref.current?.contains(target) ?? false;

      if (!clicked_trigger && !clicked_panel) setOpen(false);
    };
    const close_on_escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close_on_escape);

    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close_on_escape);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    const position_panel = () => {
      if (window.innerWidth < 640) {
        set_panel_right(undefined);
        return;
      }

      const trigger = ref.current?.getBoundingClientRect();
      if (trigger) set_panel_right(Math.max(24, window.innerWidth - trigger.right));
    };

    position_panel();
    window.addEventListener('resize', position_panel);
    return () => window.removeEventListener('resize', position_panel);
  }, [open]);

  const active = THEMES.find((t) => t.key === theme)!;

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Change background theme"
          aria-expanded={open}
          aria-haspopup="dialog"
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
      </div>

      {typeof document !== 'undefined'
        ? create_portal(
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={panel_ref}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  role="dialog"
                  aria-label="Choose a color palette"
                  className="fixed left-4 right-4 top-20 z-[100] rounded-2xl p-3 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-6 sm:w-80"
                  style={{
                    background: 'rgba(8,8,10,0.96)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    right: panel_right,
                  }}
                >
                  <div className="flex items-center justify-between gap-4 px-1 pb-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                      Color palette
                    </span>
                    <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-ac">
                      {active.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5" role="group" aria-label="Portfolio color palettes">
                    {THEMES.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => {
                          onChange(t.key);
                          setOpen(false);
                        }}
                        aria-label={`Use ${t.label} color palette`}
                        aria-pressed={theme === t.key}
                        title={t.blurb}
                        className={`group relative min-w-0 rounded-xl p-1 transition-colors duration-200 ${
                          theme === t.key ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <span
                          className="block aspect-square w-full rounded-lg border border-white/15 transition-transform duration-200 group-hover:-translate-y-0.5"
                          style={{
                            background: `linear-gradient(145deg, ${t.accent}, ${t.accent2})`,
                            boxShadow: theme === t.key ? `0 0 0 1px #09090b, 0 0 0 2px ${t.accent}` : undefined,
                          }}
                        />
                        <span className="mt-1.5 block truncate text-center font-mono text-[7px] uppercase tracking-normal text-zinc-500 sm:text-[8px]">
                          {t.label}
                        </span>
                        {theme === t.key && (
                          <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-md bg-zinc-950/90 text-white">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
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
