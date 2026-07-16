import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { SectionHead, EASE } from '../components/bits';
import { REVIEWS } from '../lib/content';
import av1 from '../assets/img/avatar-1.jpg';
import av2 from '../assets/img/avatar-2.jpg';
import av3 from '../assets/img/avatar-3.jpg';

const AVATARS = [av1, av2, av3];

export default function Reviews() {
  return (
    <section className="relative py-24 md:py-36 px-5">
      <div className="max-w-[76rem] mx-auto">
        <SectionHead eyebrow="Receipts" title={<>What clients <span className="grad-ac-text">say.</span></>} />

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.handle}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="glass p-7 flex flex-col"
            >
              <Quote className="w-5 h-5 text-ac opacity-70 mb-5" />
              <blockquote className="text-zinc-400 text-sm leading-relaxed flex-1">
                "{r.body}"
              </blockquote>
              <figcaption className="mt-7 pt-5 border-t border-white/5 flex items-center gap-3">
                <img
                  src={AVATARS[r.avatar - 1]}
                  alt={r.handle}
                  className="w-9 h-9 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <div className="text-white font-semibold text-sm tracking-tight">{r.handle}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 mt-0.5">
                    {r.project}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
