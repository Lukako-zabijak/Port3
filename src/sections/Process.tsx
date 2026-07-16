import { motion } from 'motion/react';
import { SectionHead, EASE } from '../components/bits';
import { PROCESS_STEPS } from '../lib/content';

export default function Process() {
  return (
    <section className="relative py-24 md:py-36 px-5">
      <div className="max-w-[76rem] mx-auto">
        <SectionHead
          eyebrow="No mystery"
          title={<>How a commission <span className="grad-ac-text">goes.</span></>}
        />

        <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {/* connecting line on xl */}
          <div className="hidden xl:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          {PROCESS_STEPS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="glass p-7 relative"
            >
              <div className="font-display text-3xl font-bold grad-ac-text mb-5">{p.step}</div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight mb-2.5">{p.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
