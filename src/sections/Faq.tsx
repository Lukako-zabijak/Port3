import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { SectionHead, Reveal } from '../components/bits';
import { FAQS } from '../lib/content';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-36 scroll-mt-20 px-5">
      <div className="max-w-3xl mx-auto">
        <SectionHead eyebrow="Before you DM" title={<>Questions I get <span className="grad-ac-text">a lot.</span></>} />

        <Reveal>
          <div className="glass overflow-hidden">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-white/5 last:border-b-0">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 text-left group"
                >
                  <span className={`font-display text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                    open === i ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                  }`}>
                    {f.q}
                  </span>
                  <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    open === i ? 'border-ac-40 text-ac' : 'border-white/10 text-zinc-500 group-hover:text-white'
                  }`}>
                    {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-8 pb-6 pr-12 text-zinc-500 text-base font-light leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
