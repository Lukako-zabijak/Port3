import { motion } from 'motion/react';
import { Reveal, EASE } from '../components/bits';
import { client_reviews } from '../lib/content';
import review_screenshot from '../assets/reviews/pixieyaps2-bungo-battlegrounds.png';

export default function ClientReview() {
  const review = client_reviews[0];

  return (
    <section id="client-review" className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:py-36">
      <div className="pointer-events-none absolute inset-x-5 top-0 mx-auto h-px max-w-[76rem] bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-[76rem]">
        <h2 className="sr-only">Client review for {review.project}</h2>

        <div className="grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-20">
          <Reveal y={18}>
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ac md:text-xs">
                01 / client review
              </div>

              <p className="mt-6 font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-white md:text-3xl">
                {review.project}
              </p>

              <cite className="mt-7 block not-italic">
                <span className="block text-sm font-semibold text-zinc-200">{review.client}</span>
                <span className="mt-1 block text-sm leading-relaxed text-zinc-500">{review.role}</span>
              </cite>

              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                {review.disclosure}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={24} className="min-w-0">
            <div className="relative border-t border-ac-30 pt-9 lg:border-l lg:border-t-0 lg:pb-1 lg:pl-14 lg:pt-0">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[8rem] font-bold leading-none text-ac opacity-[0.08] lg:-top-12 lg:text-[11rem]"
              >
                &ldquo;
              </span>

              <blockquote className="relative max-w-[52rem] font-display text-[1.4rem] font-semibold leading-[1.38] tracking-[-0.015em] text-white sm:text-[1.65rem] sm:leading-[1.32] md:text-[2.15rem] md:leading-[1.25] md:tracking-[-0.025em] xl:text-[2.75rem] xl:leading-[1.2]">
                {review.quote}
              </blockquote>

              <figure
                className="mt-10 max-w-full overflow-x-auto rounded-[0.9rem] border border-white/10 bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ac"
                tabIndex={0}
                aria-label="Original client review screenshot; scroll horizontally to view the full image"
              >
                <img
                  src={review_screenshot}
                  alt="Original Discord review from Pixieyaps2 about the Bungo Battlegrounds commission"
                  width={1825}
                  height={95}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto min-w-[64rem] rounded-[0.85rem]"
                />
              </figure>

              <div className="mt-10 grid border-y border-white/10 sm:grid-cols-2 xl:grid-cols-4">
                {review.proof.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.16 + index * 0.06, duration: 0.45, ease: EASE }}
                    className="flex items-center gap-3 border-b border-white/10 py-4 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:px-4 xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ac" aria-hidden />
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
                      {item}
                    </span>
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
