export const DISCORD_LINK = 'https://discord.com/users/1059109501313237114';
export const ROBLOX_LINK = 'https://www.roblox.com/users/1829644134/profile';
export const DISCORD_ID = '1059109501313237114';
export const ROBLOX_ID = '1829644134';

export const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'Showcase', id: 'showcase' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'FAQ', id: 'faq' },
];

export const STACK_MARQUEE = [
  'Luau', 'OOP', 'Raycasting', 'DataStores', 'Anti-Cheat', 'Netcode',
  'Server-Authoritative', 'Client Prediction', 'Pathfinding', 'ModuleScripts',
  'Strict Typing', 'Roblox Studio', 'Git', 'TweenService',
];

export const HERO_STATS = [
  { label: 'small tasks', value: '2–12h' },
  { label: 'medium systems', value: '1–2 days' },
  { label: 'stress-tested at', value: '100 players' },
  { label: 'payment terms', value: '50/50' },
];

/* ── Work ── */
export interface Project {
  index: string;
  title: string;
  tag: string;
  problem: string;
  built: string;
  highlights: string[];
  chips: string[];
  image: 'combat' | 'aegis' | 'framework';
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    title: 'Next-Gen Combat',
    tag: 'combat framework',
    problem: 'Most combat systems fall apart above 30 players — hits stop registering, the server chokes, exploiters walk through everything.',
    built: 'A modular, OOP combat framework built for 100-player servers. Server-authoritative hit validation, client-side prediction so swings still feel instant, and packed remote payloads that keep bandwidth flat under load.',
    highlights: ['Server-validated raycast hits', 'Client-side prediction, zero felt delay', 'Packed remote buffers, flat bandwidth'],
    chips: ['server-validated hits', 'client prediction', 'packed remotes', '100-player tested'],
    image: 'combat',
  },
  {
    index: '02',
    title: 'Aegis Anti-Cheat',
    tag: 'security layer',
    problem: 'Once a game gets popular, the exploiters arrive — speed hacks, memory injection, remote spam.',
    built: 'A server-authoritative security layer that watches physics deltas, validates remote traffic and flags injection patterns. It logs first and bans on confidence, so legit players on bad connections don\'t get caught in the net.',
    highlights: ['WalkSpeed delta 16 → 150 flagged', 'Remote rate limiting per player', 'Log first, ban on confidence'],
    chips: ['physics delta checks', 'remote rate limiting', 'injection heuristics', 'appeal-friendly logs'],
    image: 'aegis',
  },
  {
    index: '03',
    title: 'Framework Core',
    tag: 'architecture',
    problem: 'Games that grow past a few systems turn into spaghetti — scripts requiring scripts in circles, nobody knows what loads first.',
    built: 'A central orchestrator that boots services and controllers in order, injects dependencies cleanly, and fails loudly when a module breaks instead of silently corrupting the game state.',
    highlights: ['Ordered boot: services → controllers', 'Dependency injection, no circular requires', 'Loud failure instead of silent corruption'],
    chips: ['ordered boot', 'dependency injection', 'strict Luau', 'loud failure'],
    image: 'framework',
  },
];

/* ── About ── */
export const ABOUT_INTRO =
  "Around four years of programming experience led me to the way I build now — strict Luau, OOP frameworks, and server-authoritative systems from the ground up.";

export const ABOUT_BODY =
  "What that means for you: systems that don't fall over when the player count climbs, don't hand exploiters free wins, and don't turn into spaghetti the moment you ask for a change. I work fast, I price fair, and I finish what I start.";

export const PRINCIPLES = [
  {
    title: 'The server is the referee',
    body: 'Clients lie. Every hit, purchase and trade gets validated server-side before it becomes real.',
  },
  {
    title: 'Strict types or nothing',
    body: 'Everything ships in strict Luau. If the type checker complains, it doesn\'t get committed.',
  },
  {
    title: 'Cleanup is part of the job',
    body: 'Every connection and instance gets tracked and destroyed. No slow leaks killing your server at hour three.',
  },
  {
    title: 'You can read what I write',
    body: 'Named modules, short functions, comments where they matter. Your next scripter won\'t hate me.',
  },
];

/* ── Services ── */
export const SERVICES = [
  {
    title: 'Core Game Loops',
    body: 'Round cycles, lobby flow, matchmaking logic and win conditions — the skeleton your whole game hangs on.',
  },
  {
    title: 'Combat Systems',
    body: 'Weapons, hitboxes, parry and block logic, cooldowns. Feels instant on the client, decided on the server.',
  },
  {
    title: 'Data & Saving',
    body: 'Session-locked profiles, migrations, retry logic. Your players\' progress survives crashes and dupes.',
  },
  {
    title: 'Anti-Cheat & Security',
    body: 'Server validation for movement, remotes and purchases. Built in from the start, not bolted on later.',
  },
  {
    title: 'NPC & AI Logic',
    body: 'Pathfinding enemies, state-machine bosses, NPC routines that don\'t tank server FPS.',
  },
  {
    title: 'UI Logic',
    body: 'You bring the art — I wire it up. Shops, inventories, drag-and-drop, clean tweening.',
  },
];

/* ── Process ── */
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Send the spec',
    body: 'DM me on Discord with what you need. A paragraph is fine — the estimator below gives you a ballpark first.',
  },
  {
    step: '02',
    title: 'Quote locked in',
    body: 'I reply with a fixed price and a timeframe. 50% upfront via PayPal or Robux, then I start writing code.',
  },
  {
    step: '03',
    title: 'Watch it get built',
    body: 'You get test-place access while I work, so you can poke the system and course-correct early.',
  },
  {
    step: '04',
    title: 'Demo & handover',
    body: 'I demo the finished system live, you pay the remaining 50%, and I walk you through the codebase.',
  },
];

/* ── Pricing ── */
export const PRICING_TIERS = [
  {
    name: 'UI Systems',
    desc: 'Shop logic, inventory systems, menu wiring and tweening on your UI art.',
    price: 'from $75',
    note: 'robux equivalent fine',
    featured: false,
  },
  {
    name: 'Combat & Frameworks',
    desc: 'Modular combat, OOP frameworks, raycasting, netcode — the heavy machinery.',
    price: 'from $250',
    note: 'most common request',
    featured: true,
  },
  {
    name: 'Full Game Backend',
    desc: 'The entire server side of a game — loop, data, security, the lot.',
    price: 'quoted',
    note: 'scoped in DMs',
    featured: false,
  },
];

export const PAYMENT_POINTS = [
  '50% upfront, 50% on demo — no rev-share, no percentages',
  'PayPal or Robux via group funds, adjusted for DevEx',
  'Fixed price once scoped — no surprise invoices',
  'Small tasks welcome if the spec is clear',
];

export const RULES = [
  {
    title: 'Your game, your code',
    body: 'What I write for your game is yours to use in that game. Just don\'t resell or redistribute the systems themselves.',
  },
  {
    title: 'Programming only',
    body: 'Models, VFX, animations and UI art come from you. I make them work — I don\'t make them pretty.',
  },
];

/* ── FAQ ── */
export const FAQS = [
  {
    q: 'Do you design UI or animate models?',
    a: 'No — I\'m a programmer, not an artist. You provide the UI art, models and animations, and I write the logic that makes them actually work. That split is what keeps me fast.',
  },
  {
    q: 'How long does a typical system take?',
    a: 'Small tasks land in 2–12 hours. Medium systems like a combat framework take 1–2 days. Large structural work runs 3–7 days. The estimator below gives you a tailored timeframe.',
  },
  {
    q: 'How does payment work?',
    a: '50% upfront through PayPal or Robux before I write the first line, the rest after I demo the finished system in a test place. No percentages, no rev-share.',
  },
  {
    q: 'Will it survive exploiters?',
    a: 'That\'s the whole point of how I build. Every critical action is validated on the server, and I write anti-cheat logic directly into combat and interaction loops instead of stapling it on afterwards.',
  },
  {
    q: 'Can I hire you for something small?',
    a: 'Yes, as long as the spec is clear. Run it through the estimator first — if the range looks right to you, DM me and we\'ll sort it out.',
  },
];
