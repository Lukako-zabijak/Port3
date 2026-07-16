import { motion } from 'motion/react';

export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
      <motion.div
        className="flex whitespace-nowrap items-center gap-10 pr-10 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 38 }}
      >
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-mono text-xs tracking-[0.22em] uppercase text-zinc-500">{item}</span>
            <span className="w-1 h-1 rounded-full bg-ac opacity-60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
