import { createElement as create_element, useEffect as use_effect, useState as use_state } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router';
import { EASE as ease } from '../components/bits';
import {
  work_items,
  youtube_embed_url,
  youtube_thumbnail_fallback_url,
  youtube_thumbnail_url,
  youtube_url,
  type work_item,
} from '../lib/works';

const works_description = 'Watch Lukako Roblox programming showcases covering combat, game systems, security, data, and production architecture.';

function video_card({ item, index }: { item: work_item; index: number }) {
  const [playing, set_playing] = use_state(false);

  return (
    <motion.article
      id={item.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: Math.min(index % 2, 1) * 0.06, ease }}
      className="group scroll-mt-28 border-t border-white/10 pt-5"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/20">
        {playing ? (
          <iframe
            src={youtube_embed_url(item.youtube_id)}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => set_playing(true)}
            className="absolute inset-0 h-full w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ac"
            aria-label={`play ${item.title}`}
          >
            <img
              src={youtube_thumbnail_url(item.youtube_id)}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = youtube_thumbnail_fallback_url(item.youtube_id);
              }}
              alt={`youtube thumbnail for ${item.title}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025] group-hover:brightness-75"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ac text-zinc-950 shadow-xl shadow-black/30 transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
          </button>
        )}
      </div>

      <div className="grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ac">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{item.status === 'archive' ? 'older work' : 'current showcase'}</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">{item.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-[15px]">{item.description}</p>
        </div>
        <a
          href={youtube_url(item.youtube_id)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-ac focus-visible:outline-none focus-visible:text-ac"
        >
          open on youtube
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

export default function works_page() {
  use_effect(() => {
    const previous_title = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previous_description = description?.content;

    document.title = 'Project Showcase | Lukako';
    if (description) description.content = works_description;
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      document.title = previous_title;
      if (description && previous_description) description.content = previous_description;
    };
  }, []);

  const current_count = work_items.filter((item) => item.status === 'current').length;

  return (
    <div className="relative min-h-screen text-zinc-300 antialiased">
      <header className="relative z-20">
        <div className="mx-auto flex h-24 max-w-[76rem] items-center justify-between px-5">
          <Link to="/" className="group inline-flex items-center gap-3 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ac">
            <span className="glass-pill flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-ac-40 group-hover:text-ac">
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
        <motion.header initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="max-w-5xl">
          <h1 className="font-display text-5xl font-bold leading-[0.94] tracking-[-0.055em] text-white sm:text-7xl md:text-8xl">
            Systems in motion<span className="text-ac">.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg md:leading-8">
            The complete video archive of systems I have built in Roblox Studio. Play any showcase here or open the original video on YouTube.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-y border-white/10 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 md:text-xs">
            <span><span className="text-ac">{work_items.length}</span> videos</span>
            <span><span className="text-zinc-300">{current_count}</span> current showcases</span>
            <span>youtube originals</span>
          </div>
        </motion.header>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-2 md:gap-y-20">
          {work_items.map((item, index) => create_element(video_card, { item, index, key: item.id }))}
        </div>

        <Link to="/" className="group mt-20 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-ac focus-visible:outline-none focus-visible:text-ac">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          back to portfolio
        </Link>
      </main>
    </div>
  );
}
