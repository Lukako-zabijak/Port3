import { motion } from 'motion/react';
import { Plus, Lock } from 'lucide-react';
import { SectionHead, Reveal, Chip, EASE } from '../components/bits';
import { PROJECTS } from '../lib/content';
import imgCombat from '../assets/img/work-combat.jpg';
import imgAegis from '../assets/img/work-aegis.jpg';
import imgFramework from '../assets/img/work-framework.jpg';

const IMAGES = { combat: imgCombat, aegis: imgAegis, framework: imgFramework };

export default function Work() {
  return (
    <section id="work" className="relative py-24 md:py-36 scroll-mt-20 px-5">
      <div className="max-w-[76rem] mx-auto">
        <SectionHead
          eyebrow="Selected work"
          title={<>Systems I'd ship <span className="grad-ac-text">again.</span></>}
        />

        <Reveal className="mb-10 flex justify-center">
          <p className="inline-flex items-center gap-2.5 text-zinc-500 text-sm glass-pill rounded-full px-5 py-2.5">
            <Lock className="w-3.5 h-3.5 text-ac" />
            More on request — some client work stays private until release.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -8 }}
              className="glass overflow-hidden group flex flex-col"
            >
              {/* artwork */}
              <div className="relative h-52 md:h-56 overflow-hidden">
                <img
                  src={IMAGES[p.image]}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.22em] uppercase text-white/70 glass-pill rounded-full px-3 py-1.5">
                  {p.tag}
                </div>
                <div className="absolute bottom-3 right-4 font-display text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                  {p.index}
                </div>
              </div>

              {/* body */}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">{p.title}</h3>
                <p className="mt-3 text-zinc-500 text-[13px] italic leading-relaxed">{p.problem}</p>
                <p className="mt-2.5 text-zinc-400 text-sm leading-relaxed flex-1">{p.built}</p>

                <ul className="mt-5 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[13px] text-zinc-300">
                      <Plus className="w-3.5 h-3.5 text-ac shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-5 border-t border-white/5 flex flex-wrap gap-2">
                  {p.chips.slice(0, 3).map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
