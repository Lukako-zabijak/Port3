import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { SectionHead, Reveal, EASE } from '../components/bits';
import { ABOUT_INTRO, ABOUT_BODY, PRINCIPLES } from '../lib/content';

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 scroll-mt-20 px-5">
      <div className="max-w-[76rem] mx-auto">
        <SectionHead eyebrow="The short version" title={<>About <span className="grad-ac-text">me.</span></>} />

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 items-stretch">
          <Reveal className="h-full">
            <div className="glass p-8 md:p-10 h-full flex flex-col">
              <p className="font-display text-2xl md:text-[2rem] font-medium text-white leading-snug tracking-tight">
                {ABOUT_INTRO}
              </p>
              <p className="mt-6 text-zinc-400 leading-relaxed flex-1">{ABOUT_BODY}</p>
              <div className="mt-8 flex items-center gap-4 glass-pill rounded-2xl p-4">
                <div className="w-11 h-11 rounded-xl bg-ac-10 border border-ac-20 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-ac" />
                </div>
                <div>
                  <div className="text-white font-semibold tracking-tight text-sm">RTX 5070 dev rig</div>
                  <div className="text-zinc-500 text-xs mt-0.5">Studio never stutters here — so testing never slows your build down.</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
                className="glass p-6 flex gap-5 flex-1"
              >
                <span className="font-display text-lg font-bold text-ac-dim shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-white font-semibold tracking-tight mb-1">{p.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
