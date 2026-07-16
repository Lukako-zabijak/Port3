import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { SectionHead, Reveal, EASE } from '../components/bits';
import { PRICING_TIERS, PAYMENT_POINTS, RULES } from '../lib/content';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-36 scroll-mt-20 px-5">
      <div className="max-w-[76rem] mx-auto">
        <SectionHead eyebrow="Straight numbers" title={<>Pricing, <span className="grad-ac-text">upfront.</span></>} />

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-5">
          {PRICING_TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
              className={`glass p-7 md:p-8 flex flex-col relative overflow-hidden ${
                t.featured ? 'border-ac-30' : ''
              }`}
            >
              {t.featured && (
                <div
                  className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-[90px] opacity-25 pointer-events-none"
                  style={{ background: 'var(--ac)' }}
                />
              )}
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 mb-6">
                {t.note}
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-white">{t.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mt-3 mb-8 flex-1">{t.desc}</p>
              <div className="font-display text-3xl font-bold tracking-tight grad-ac-text">{t.price}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-5">
          <Reveal>
            <div className="glass p-7 md:p-8 h-full">
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-ac-dim mb-6">
                Payment terms
              </h3>
              <ul className="space-y-4">
                {PAYMENT_POINTS.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-ac-10 border border-ac-20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-ac" />
                    </span>
                    <span className="text-zinc-400 text-sm leading-relaxed">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass p-7 md:p-8 h-full">
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-ac-dim mb-6">
                Two ground rules
              </h3>
              <div className="space-y-6">
                {RULES.map((r, i) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE }}
                  >
                    <h4 className="text-white font-semibold tracking-tight mb-1.5">{r.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{r.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
