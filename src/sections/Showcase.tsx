import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { EASE } from '../components/bits';

const showcase_url = 'https://lukako.carrd.co/';

export default function Showcase() {
  return (
    <section id="showcase" className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-black/90 px-5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-ac-10 blur-[110px]" />
        <div className="absolute inset-y-0 left-[12%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: EASE }}
        className="relative mx-auto grid max-w-[76rem] items-end gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20"
      >
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ac md:text-xs">
            <Play className="h-3.5 w-3.5 fill-current" />
            project showcase
          </div>

          <h2 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl">
            See the systems
            <br />
            <span className="grad-ac-text">in motion.</span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            My showcase portfolio collects project demos, short videos, and past work in one focused place. See how the systems look and feel before deciding whether I’m the right programmer for your game.
          </p>
        </div>

        <div className="lg:pb-1">
          <a
            href={showcase_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-ac-40 bg-ac-5 p-6 transition-all duration-300 hover:border-ac hover:bg-ac-10 sm:p-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              demos &amp; past work
            </span>
            <span className="mt-3 flex items-center justify-between gap-5">
              <span className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                lukako.carrd.co
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ac text-zinc-950 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </span>
            <span className="mt-6 block border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ac">
              open the full showcase
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
