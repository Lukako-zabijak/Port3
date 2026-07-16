import { motion } from 'motion/react';
import {
  Swords, Database, ShieldCheck, Bot, PanelsTopLeft, RefreshCcw,
} from 'lucide-react';
import { SectionHead, EASE } from '../components/bits';
import { SERVICES } from '../lib/content';

const ICONS = [RefreshCcw, Swords, Database, ShieldCheck, Bot, PanelsTopLeft];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 scroll-mt-20 px-5">
      <div className="max-w-[76rem] mx-auto">
        <SectionHead
          eyebrow="Services"
          title={<>What you can <span className="grad-ac-text">hire me for.</span></>}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
                whileHover={{ y: -6 }}
                className="glass p-7 group relative overflow-hidden"
              >
                <div
                  className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full blur-[80px] opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'var(--ac)' }}
                />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-ac-10 border border-ac-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-ac" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
