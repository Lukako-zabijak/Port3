import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { EASE, Magnetic } from '../components/bits';
import Marquee from '../components/Marquee';
import { STACK_MARQUEE, HERO_STATS } from '../lib/content';

export default function Hero({ ready }: { ready: boolean }) {
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 34 },
    animate: { opacity: ready ? 1 : 0, y: ready ? 0 : 34 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-5 pt-28 pb-10">
        <motion.div {...anim(0.15)}>
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ac opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ac" />
            </span>
            booking new projects
          </span>
        </motion.div>

        <motion.h1
          {...anim(0.28)}
          className="font-display mt-8 text-[clamp(2.8rem,7vw,6rem)] font-bold tracking-tight leading-[1.04] text-white max-w-6xl"
        >
          Server code your game
          <br />
          can <span className="grad-ac-text">stand on.</span>
        </motion.h1>

        <motion.div
          {...anim(0.42)}
          className="mt-8 max-w-4xl text-left"
        >
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="mt-1 h-14 w-px shrink-0 sm:h-16"
              style={{ background: 'linear-gradient(to bottom, var(--ac), color-mix(in srgb, var(--ac) 40%, transparent), transparent)' }}
              aria-hidden
            />
            <p className="font-display text-xl font-medium leading-snug tracking-[-0.02em] text-zinc-100 sm:text-2xl md:text-[1.75rem]">
              Hey! I'm Luka, and I've been working in Roblox Studio for around 6 years now. Been scripting for 5 years total.
            </p>
          </div>
          <p className="mt-5 max-w-3xl pl-5 text-sm font-light leading-[1.8] text-zinc-400 sm:pl-7 sm:text-base md:text-lg">
            I enjoy making any types of systems, but mainly <span className="text-zinc-200">advanced combat frameworks, strong anti cheats, data systems (and data migration), and trading systems.</span>{' '}
            <span className="text-ac">I don't like fps shooters.</span>{' '}
            My goal is to make sure your game will not break upon releasing, and I've succeeded to do that many times.
          </p>
        </motion.div>

        <motion.div {...anim(0.55)} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 bg-ac text-zinc-950 px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.14em] hover:brightness-110 transition-all duration-300 glow-ac"
            >
              See the work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#estimator"
              className="inline-flex items-center justify-center gap-3 glass-pill text-white px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.14em] hover:border-ac-40 transition-colors duration-300"
            >
              Estimate a price
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          {...anim(0.7)}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6"
        >
          {HERO_STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">{s.value}</div>
              <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div {...anim(0.85)}>
        <div className="pb-5 flex justify-center">
          <ArrowDown className="w-4 h-4 text-zinc-600 animate-bounce" />
        </div>
        <Marquee items={STACK_MARQUEE} />
      </motion.div>
    </section>
  );
}
