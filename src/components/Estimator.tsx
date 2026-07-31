import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { estimator_error, getEstimate, THINKING_STEPS, type Estimate } from '../lib/estimate';
import { DISCORD_LINK } from '../lib/content';
import { SectionHead, Reveal, EASE } from './bits';

interface Run {
  spec: string;
  estimate: Estimate;
}

const MIN_THINK_MS = 2100;
const cooldown_ms = 180_000;
const cooldown_storage_key = 'lukako-estimator-cooldown-until';

function get_cooldown_remaining(): number {
  const expires_at = Number(window.localStorage.getItem(cooldown_storage_key));
  const remaining = expires_at - Date.now();
  if (!Number.isFinite(expires_at) || remaining <= 0) {
    window.localStorage.removeItem(cooldown_storage_key);
    return 0;
  }
  return remaining;
}

function format_cooldown(remaining: number): string {
  return `${Math.max(1, Math.ceil(remaining / 60_000))} minute${remaining > 60_000 ? 's' : ''}`;
}

export default function Estimator() {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [runs, setRuns] = useState<Run[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [cooldown_until, setCooldownUntil] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return Date.now() + get_cooldown_remaining();
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (runs.length > 0) {
      document.getElementById('estimator-out')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [runs]);

  useEffect(() => {
    const remaining = cooldown_until - Date.now();
    if (remaining <= 0) return;

    const timer = window.setTimeout(() => setCooldownUntil(0), remaining);
    return () => window.clearTimeout(timer);
  }, [cooldown_until]);

  const run = async () => {
    const spec = input.trim();
    if (!spec || busy) return;
    const cooldown_remaining = get_cooldown_remaining();
    if (cooldown_remaining > 0) {
      setNotice(`Please wait ${format_cooldown(cooldown_remaining)} before running another estimate.`);
      return;
    }
    setNotice(null);
    setBusy(true);
    setStepIdx(0);

    const stepTimer = window.setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, THINKING_STEPS.length - 1));
    }, MIN_THINK_MS / THINKING_STEPS.length);

    const started = performance.now();
    try {
      const estimate = await getEstimate(spec);
      const elapsed = performance.now() - started;
      if (elapsed < MIN_THINK_MS) {
        await new Promise((r) => setTimeout(r, MIN_THINK_MS - elapsed));
      }
      setRuns((r) => [...r.slice(-2), { spec, estimate }]);
      setInput('');
      const next_cooldown = Date.now() + cooldown_ms;
      window.localStorage.setItem(cooldown_storage_key, String(next_cooldown));
      setCooldownUntil(next_cooldown);
    } catch (error) {
      setNotice(error instanceof estimator_error ? error.message : 'The estimator is temporarily unavailable. Please try again shortly.');
    } finally {
      window.clearInterval(stepTimer);
      setBusy(false);
    }
  };

  return (
    <section id="estimator" className="relative py-24 md:py-36 scroll-mt-20 px-5">
      <div className="max-w-[52rem] mx-auto">
        <SectionHead
          eyebrow="rough estimate"
          title={<>describe the system <span className="grad-ac-text">you need.</span></>}
        />

        <Reveal>
          <div
            className="glass-deep overflow-hidden shadow-2xl shadow-black/40"
            onClick={() => inputRef.current?.focus()}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 font-mono text-xs text-zinc-500">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-3">lukako@dev: ~/estimate</span>
              <span className="ml-auto text-[10px] text-zinc-600">zsh</span>
            </div>

            <div className="p-6 md:p-8 font-mono text-[13px] md:text-sm leading-relaxed">
              <div className="text-zinc-600 mb-5">
                # describe what you need and get a rough price and timeframe
                <span className="mt-1 block text-ac-dim">
                  # minimum commission: $10 or 4,000 robux
                </span>
                <span className="mt-1 block text-zinc-600">
                  # one estimate per client every three minutes
                </span>
              </div>

              {/* previous runs */}
              <AnimatePresence>
                {runs.map((r, ri) => (
                  <motion.div
                    key={ri}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="mb-7"
                  >
                    <div className="text-zinc-500 break-words">
                      <span className="text-ac">lukako@dev</span>
                      <span className="text-zinc-600">:~$ </span>
                      estimate spec "{r.spec}"
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        ['tier', r.estimate.tier],
                        ['price', r.estimate.price],
                        ['time', r.estimate.time],
                      ].map(([k, v], i) => (
                        <motion.div
                          key={k}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.1, duration: 0.4, ease: EASE }}
                          className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3.5"
                        >
                          <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-1">{k}</div>
                          <div className={`font-bold ${k === 'price' ? 'text-ac' : 'text-white'} text-sm md:text-lg`}>{v}</div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="mt-4 space-y-1.5 text-zinc-500 text-xs md:text-[13px]"
                    >
                      {r.estimate.considerations.map((c, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-ac shrink-0">+</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </motion.ul>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* thinking line */}
              {busy && (
                <div className="mb-4 text-zinc-500">
                  <span className="text-ac">lukako@dev</span>
                  <span className="text-zinc-600">:~$ </span>
                  estimate spec "{input}"
                  <div className="mt-3 flex items-center gap-2.5 text-zinc-400">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/10 border-t-ac animate-spin" />
                    {THINKING_STEPS[stepIdx]}
                  </div>
                </div>
              )}

              {/* input line */}
              <div className="flex items-center gap-2 flex-wrap rounded-xl border border-white/8 bg-black/20 px-4 py-3.5 focus-within:border-ac-30 transition-colors">
                <span className="text-ac shrink-0">lukako@dev</span>
                <span className="text-zinc-600 shrink-0">:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (notice) setNotice(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && run()}
                  
                  disabled={busy}
                  placeholder='estimate spec "a combat system with raycast hits and saving"'
                  className="flex-1 min-w-[14rem] bg-transparent text-zinc-200 placeholder:text-zinc-700 focus:outline-none disabled:opacity-50"
                />
                
              </div>

              <div id="estimator-out" className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={run}
                  disabled={busy || !input.trim() || cooldown_until > Date.now()}
                  className="inline-flex items-center gap-2.5 bg-ac text-zinc-950 px-6 py-3 rounded-full font-bold text-[11px] uppercase tracking-[0.14em] hover:brightness-110 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed glow-ac"
                >
                  run estimate
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ac" />
                  rough estimate only, final quote in dms
                </span>
                <a
                  href={DISCORD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:ml-auto text-[11px] uppercase tracking-[0.16em] text-white link-sweep"
                >
                  send me this spec
                </a>
              </div>
              {notice && (
                <p role="alert" className="mt-4 max-w-2xl text-xs leading-relaxed text-amber-300">
                  {notice}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
