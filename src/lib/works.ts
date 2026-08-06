export type work_item = {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  status: 'current' | 'archive';
};

export const work_items: work_item[] = [
  {
    id: 'advanced-pathfinding',
    title: 'Advanced pathfinding system',
    description: 'A complex NPC pathfinding system where agents communicate discoveries to each other. They share blocked walls and usable entrances, use color-coded lines while evaluating routes, and update the group when new information arrives. I also built a freecam system for the showcase.',
    youtube_id: 'TzfICkyYF6w',
    status: 'current',
  },
  {
    id: 'fully-scripted-game',
    title: 'Fully scripted game',
    description: 'The game had been left heavily unfinished with poor pre-existing code. I remade every script from scratch, rebuilt the backend, added significantly more features and robust anti-cheat protection, and fixed a bug the previous scripters could not solve.',
    youtube_id: 'aoIvMxCWkVc',
    status: 'current',
  },
  {
    id: 'four-character-combat',
    title: 'Four-character combat system',
    description: 'An advanced combat system built around four playable characters.',
    youtube_id: 'wK2U9Jmm3t0',
    status: 'current',
  },
  {
    id: 'two-character-abilities',
    title: 'Two-character ability system',
    description: 'An advanced two-character ability and combat system. Fully modular, server-authoritative, and built professionally.',
    youtube_id: 'qqs8XyDpyjo',
    status: 'current',
  },
  {
    id: 'advanced-sword-system',
    title: 'Advanced sword system',
    description: 'A professionally scripted, server-authoritative, modular sword system.',
    youtube_id: 'v4X6lwmFdiA',
    status: 'current',
  },
  {
    id: 'raycast-combat',
    title: 'Secured raycasting combat',
    description: 'A secured raycasting combat system designed so exploiters cannot control the result. The script for this system is over 500 lines long.',
    youtube_id: '6cFPo6EJIII',
    status: 'archive',
  },
  {
    id: 'admin-commands',
    title: 'Custom admin commands',
    description: 'A showcase of some of my custom admin commands from a script that grew beyond 1,000 lines. It also includes /announce; I typed that command incorrectly in the original video.',
    youtube_id: 'Vx0BIHuD9hc',
    status: 'archive',
  },
  {
    id: 'anti-cheat',
    title: 'Anti-cheat system',
    description: 'A showcase of an earlier anti-cheat system I built.',
    youtube_id: 'FO7Ats-qTZQ',
    status: 'archive',
  },
  {
    id: 'growing-system',
    title: 'Offline growing system',
    description: 'A recreation of the main growing system from Grow a Garden, including offline growth.',
    youtube_id: 'TpyXKcrZJvM',
    status: 'archive',
  },
  {
    id: 'round-system',
    title: 'Round system with admin controls',
    description: 'A round system with admin-only features that can manipulate rounds while the game is running.',
    youtube_id: 'tph9bCXqGtg',
    status: 'archive',
  },
  {
    id: 'loading-screen',
    title: 'Loading screen',
    description: 'A loading screen with background particles that move away when the mouse gets close. New particles can also be spawned by clicking before loading finishes.',
    youtube_id: 'NwVXimUmKLk',
    status: 'archive',
  },
];

export const youtube_url = (youtube_id: string) => `https://www.youtube.com/watch?v=${youtube_id}`;
export const youtube_embed_url = (youtube_id: string) => `https://www.youtube-nocookie.com/embed/${youtube_id}?autoplay=1&rel=0`;
export const youtube_thumbnail_url = (youtube_id: string) => `https://i.ytimg.com/vi/${youtube_id}/maxresdefault.jpg`;
export const youtube_thumbnail_fallback_url = (youtube_id: string) => `https://i.ytimg.com/vi/${youtube_id}/hqdefault.jpg`;
