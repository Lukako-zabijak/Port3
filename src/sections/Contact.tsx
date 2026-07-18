import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router';
import { Reveal, Magnetic } from '../components/bits';
import { DISCORD_LINK, ROBLOX_LINK, DISCORD_ID, ROBLOX_ID } from '../lib/content';

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 scroll-mt-20 px-5 overflow-hidden">
      {/* breathing accent glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 60%, color-mix(in srgb, var(--ac) 9%, transparent), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ac opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ac" />
            </span>
            one slot open right now
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.8rem,8vw,6rem)] font-bold tracking-tight leading-[1.02] text-white">
            Let's <span className="grad-ac-text">build it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl mx-auto text-lg text-zinc-400 font-light leading-relaxed">
            Send the spec, get a number, watch it ship. Discord is the fastest
            way to reach me — I answer within a day.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic>
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-ac text-zinc-950 px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.14em] hover:brightness-110 transition-all duration-300 glow-ac"
              >
                <MessageCircle className="w-4 h-4" />
                DM me on Discord
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={ROBLOX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 glass-pill text-white px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.14em] hover:border-ac-40 transition-colors duration-300"
              >
                <Gamepad2 className="w-4 h-4" />
                Roblox profile
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.38}>
          <p className="mt-7 text-xs leading-5 text-zinc-600">
            By commissioning me, you acknowledge the{' '}
            <Link to="/terms" className="text-zinc-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-ac">
              Terms of Service
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-8 font-mono text-[10px] md:text-xs text-zinc-600 tracking-[0.18em] uppercase">
            Discord ID {DISCORD_ID} · Roblox ID {ROBLOX_ID}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
