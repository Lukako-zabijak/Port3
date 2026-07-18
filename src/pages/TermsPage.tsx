import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { EASE } from '../components/bits';
import { DISCORD_LINK } from '../lib/content';
import { terms_effective_date, terms_sections, terms_version } from '../lib/terms';

const terms_description =
  'Commission terms covering scope, payment, delivery, revisions, licensing, cancellation, and support for Lukako Roblox programming work.';

export default function TermsPage() {
  useEffect(() => {
    const previous_title = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previous_description = description?.content;

    document.title = 'Terms of Service — Lukako';
    if (description) description.content = terms_description;
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      document.title = previous_title;
      if (description && previous_description) description.content = previous_description;
    };
  }, []);

  return (
    <div className="relative min-h-screen text-zinc-300 antialiased">
      <header className="relative z-20">
        <div className="mx-auto flex h-24 max-w-[76rem] items-center justify-between px-5">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ac"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 glass-pill transition-colors group-hover:border-ac-40 group-hover:text-ac">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </span>
            <span className="hidden sm:inline">Back to home</span>
          </Link>

          <Link to="/" className="font-display text-xl font-bold tracking-tight text-white">
            lukako<span className="text-ac">_</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[76rem] px-5 pb-24 pt-12 md:pb-36 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl md:text-8xl">
            Terms of Service<span className="text-ac">.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg md:leading-8">
            These terms explain how I handle programming commissions from quote to handover. A written project quote adds the exact scope, price, and schedule for each job.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 md:text-xs">
            <span>
              version <span className="text-ac">{terms_version}</span>
            </span>
            <span>
              effective <span className="text-zinc-300">{terms_effective_date}</span>
            </span>
          </div>
        </motion.div>

        <nav aria-label="Terms contents" className="mt-16 border-y border-white/10 py-7 lg:hidden">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ac">Contents</p>
          <ol className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {terms_sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-baseline gap-3 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-ac"
                >
                  <span className="font-mono text-[10px] text-ac-dim">{section.number}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 grid gap-16 lg:mt-24 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <nav aria-label="Terms contents" className="sticky top-28">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ac">Contents</p>
              <ol className="mt-5 space-y-3 border-l border-white/10 pl-5">
                {terms_sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-baseline gap-3 text-xs leading-5 text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-ac"
                    >
                      <span className="font-mono text-[9px] text-ac-dim">{section.number}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0">
            {terms_sections.map((section, index) => (
              <motion.section
                id={section.id}
                key={section.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE }}
                className={`scroll-mt-28 py-10 md:py-12 ${index === 0 ? 'border-y' : 'border-b'} border-white/10`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="font-mono text-xs tracking-[0.18em] text-ac">{section.number}</span>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {section.title}
                  </h2>
                </div>

                <div className="mt-6 space-y-4 text-[15px] leading-7 text-zinc-400 md:ml-12 md:text-base md:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.bullets ? (
                    <ul className="space-y-3 pt-1">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-[0.8rem] h-1 w-1 shrink-0 rounded-full bg-ac" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.section>
            ))}
          </article>
        </div>

        <section className="mt-20 grid gap-8 border-y border-white/10 py-10 md:grid-cols-[1fr_auto] md:items-center md:py-12">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white">Questions before commissioning?</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
              Ask before paying or requesting work to begin. Clear scope now prevents disagreements later.
            </p>
          </div>
          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 border border-ac-40 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ac transition-colors hover:bg-ac hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ac"
          >
            <MessageCircle className="h-4 w-4" />
            Ask on Discord
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </section>

        <Link
          to="/"
          className="group mt-12 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-ac focus-visible:outline-none focus-visible:text-ac"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to portfolio
        </Link>
      </main>
    </div>
  );
}
