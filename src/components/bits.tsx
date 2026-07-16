import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* Buttons / links that lean toward the cursor */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * 0.2,
          y: (e.clientY - (r.top + r.height / 2)) * 0.2,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 170, damping: 15, mass: 0.12 }}
    >
      {children}
    </motion.div>
  );
}

/* Fade-up wrapper for scroll reveals */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 30,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Centered section header: mono eyebrow + display line */
export function SectionHead({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <Reveal y={12}>
        <span className="inline-flex items-center gap-2.5 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-ac-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-ac" />
          {eyebrow}
          <span className="w-1.5 h-1.5 rounded-full bg-ac" />
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* Small mono chip */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 hover:border-ac-30 hover:text-zinc-200 transition-colors duration-300 cursor-default">
      {children}
    </span>
  );
}
