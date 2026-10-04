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
  'Luau', 'OOP', 'Raycasting', 'DataStores', 'Anti Cheat', 'Netcode',
  'Server Authoritative', 'Client Prediction', 'Pathfinding', 'ModuleScripts',
  'Strict Typing', 'Roblox Studio', 'Git', 'TweenService',
];

export const HERO_STATS = [
  { label: 'small tasks', value: '2 to 12h' },
  { label: 'medium systems', value: '1 to 2 days' },
  { label: 'stress tested at', value: '100 players' },
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
    title: 'Next Gen Combat',
    tag: 'combat framework',
    problem: 'Most combat systems fall apart above 30 players. Hits stop registering, the server chokes, exploiters walk through everything.',
    built: 'A modular, OOP combat framework built for 100 player servers. Server authoritative hit validation, client side prediction so swings still feel instant, and packed remote payloads that keep bandwidth flat under load.',
    highlights: ['Server validated raycast hits', 'Client side prediction, zero felt delay', 'Packed remote buffers, flat bandwidth'],
    chips: ['server validated hits', 'client prediction', 'packed remotes', '100 player tested'],
    image: 'combat',
  },
  {
    index: '02',
    title: 'Aegis Anti Cheat',
    tag: 'security layer',
    problem: 'Once a game gets popular, the exploiters arrive: speed hacks, memory injection, remote spam.',
    built: 'A server authoritative security layer that watches physics deltas, validates remote traffic and flags injection patterns. It logs first and bans on confidence, so legit players on bad connections don\'t get caught in the net.',
    highlights: ['WalkSpeed delta 16 → 150 flagged', 'Remote rate limiting per player', 'Log first, ban on confidence'],
    chips: ['physics delta checks', 'remote rate limiting', 'injection heuristics', 'appeal friendly logs'],
    image: 'aegis',
  },
  {
    index: '03',
    title: 'Framework Core',
    tag: 'architecture',
    problem: 'Games that grow past a few systems turn into spaghetti. Scripts require scripts in circles, and nobody knows what loads first.',
    built: 'A central orchestrator that boots services and controllers in order, injects dependencies cleanly, and fails loudly when a module breaks instead of silently corrupting the game state.',
    highlights: ['Ordered boot: services → controllers', 'Dependency injection, no circular requires', 'Loud failure instead of silent corruption'],
    chips: ['ordered boot', 'dependency injection', 'strict Luau', 'loud failure'],
    image: 'framework',
  },
];

export interface client_review {
  quote: string;
  client: string;
  project: string;
  role: string;
  disclosure: string;
  proof: string[];
}

export const client_reviews: client_review[] = [
  {
    quote: 'first of all, you reworked my entire combat system and made it 100x smoother and better. you also created a new move system for me, added the characters i provided and fixed bugs without any complain. any issue i showed you, you fixed it. along that you fixed alot of my vulnerable code, that could lead to hackers basically ruining my game, alot of game breaking bugs and all that other stuff. you really helped a tonne with this and basically created most if not everything here. your work is amazing and i love it.',
    client: 'Pixieyaps2',
    project: 'Bungo Battlegrounds',
    role: 'Roblox combat system client',
    disclosure: 'Original message shown below',
    proof: ['Combat overhaul', 'New move system', 'Security fixes', 'Bug fixing'],
  },
];

/* ── About ── */
export const ABOUT_INTRO =
  "As mentioned before, I have around 5 years of scripting experience. I'm able to comfortably use strict Luau, OOP frameworks, any type of hit detection, and depending on the request, even full, highly complex frameworks.";

export const ABOUT_BODY =
  "What that means for you: systems that don't fall over when the player count climbs, don't hand exploiters free wins, and don't turn into spaghetti the moment you ask for a change. I work fast, I price fair, and I finish what I start.";

export const PRINCIPLES = [
  {
    title: 'The server is the referee',
    body: 'Clients lie. Every hit, purchase and trade gets validated server side before it becomes real.',
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
    body: 'Rounds, lobbies, matchmaking & win conditions. Basically, the main loop that keeps your game running.',
  },
  {
    title: 'Combat Systems',
    body: 'Weapons, hitboxes, parrying, blocking & cooldowns. I make them feel responsive while keeping the important checks on the server.',
  },
  {
    title: 'Data & Saving',
    body: 'Saving player progress, locking sessions & retrying failed saves. I also handle moving older data over when needed.',
  },
  {
    title: 'Anti Cheat & Security',
    body: 'I check movement, remotes & purchases on the server. These checks are part of the system from the start.',
  },
  {
    title: 'NPC & AI Logic',
    body: 'Enemies that find their way around, bosses with different states & other NPC behaviour, while keeping performance in mind.',
  },
  {
    title: 'UI Logic',
    body: 'Shops, inventories, drag & drop, tweens etc. You provide the UI and i make it work.',
  },
  {
    title: 'Trading Systems',
    body: 'Player to player trading, checking items & making sure both players confirm before a trade goes through.',
  },
  {
    title: 'Data Migration',
    body: 'I can move your old saves into a new format while keeping player progress intact.',
  },
];

/* ── Process ── */
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Send the spec',
    body: 'Send me what you need & your budget on Discord. We can go with $27 an hour or agree on work that fits your budget.',
  },
  {
    step: '02',
    title: 'Agree on the work',
    body: 'We agree on the scope, timeframe & how payments work before i start. If we go hourly, we also agree on the hours or spending limit.',
  },
  {
    step: '03',
    title: 'Progress updates',
    body: 'I\'ll DM you at milestones & show how the game is looking, so you can ask for changes early. The work stays in my private place until the agreed payments are settled.',
  },
  {
    step: '04',
    title: 'Review & handover',
    body: 'I send a recorded demo for you to review. Once revisions & the final payment are settled, i hand over the source and walk you through it.',
  },
];

/* ── Pricing ── */
export const PRICING_TIERS = [
  {
    name: 'Hourly',
    desc: 'We agree on what you need & a spending limit. You pay for the time i spend on the agreed work.',
    price: '$27 / hour',
    note: 'usd',
    featured: false,
  },
  {
    name: 'Your budget',
    desc: 'Tell me your budget & what you want made. We\'ll agree on what fits before i start.',
    price: 'Let\'s talk',
    note: 'agreed together',
    featured: true,
  },
];

export const PAYMENT_POINTS = [
  'Hourly work is $27 USD per hour, or we can work off your budget',
  'We agree on the scope, payment schedule & spending limit before i start',
  'Payment is accepted in Robux through specified gamepasses or in USD through PayPal',
  'Gamepass prices account for Roblox fees so the received amount matches the quote',
  'No preset project prices or automatic price estimates',
];

export const RULES = [
  {
    title: 'Your game, your code',
    body: 'What I write for your game is yours to use in that game. Just don\'t resell or redistribute the systems themselves.',
  },
  {
    title: 'Programming only',
    body: 'Models, VFX, animations and UI art come from you. I make them work, I do not make them pretty.',
  },
];

/* ── FAQ ── */
export const FAQS = [
  {
    q: 'Do you design UI or animate models?',
    a: 'I only program. All other parts (VFX, SFX, UI, models etc.) must be provided.',
  },
  {
    q: 'How long does a typical system take?',
    a: 'It depends on what you need & what you already have. Send me the details and we\'ll agree on a timeframe before i start.',
  },
  {
    q: 'How does payment work?',
    a: 'Either $27 USD an hour, or we work off your budget. We agree on payments before i start. For budget-based work, it\'s normally 50% upfront & 50% after the demo. For hourly work, we agree on prepaid hours or a deposit and billing intervals. Payment is through PayPal or agreed Robux gamepasses. Playable access & source come after full payment. No rev-share.',
  },
  {
    q: 'Will it survive exploiters?',
    a: 'That\'s the whole point of how I build. Every critical action is validated on the server, and I write anti cheat logic directly into combat and interaction loops instead of stapling it on afterwards.',
  },
  {
    q: 'Can I hire you for something small?',
    a: 'Yes. Send me what you need & we can go hourly or work off your budget.',
  },
];
