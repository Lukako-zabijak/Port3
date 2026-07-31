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
  { label: 'small tasks', value: '2 to 12h' },
  { label: 'medium systems', value: '1 to 2 days' },
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
    problem: 'Most combat systems fall apart above 30 players. Hits stop registering, the server chokes, exploiters walk through everything.',
    built: 'A modular, OOP combat framework built for 100-player servers. Server-authoritative hit validation, client-side prediction so swings still feel instant, and packed remote payloads that keep bandwidth flat under load.',
    highlights: ['Server-validated raycast hits', 'Client-side prediction, zero felt delay', 'Packed remote buffers, flat bandwidth'],
    chips: ['server-validated hits', 'client prediction', 'packed remotes', '100-player tested'],
    image: 'combat',
  },
  {
    index: '02',
    title: 'Aegis Anti-Cheat',
    tag: 'security layer',
    problem: 'Once a game gets popular, the exploiters arrive: speed hacks, memory injection, remote spam.',
    built: 'A server-authoritative security layer that watches physics deltas, validates remote traffic and flags injection patterns. It logs first and bans on confidence, so legit players on bad connections don\'t get caught in the net.',
    highlights: ['WalkSpeed delta 16 → 150 flagged', 'Remote rate limiting per player', 'Log first, ban on confidence'],
    chips: ['physics delta checks', 'remote rate limiting', 'injection heuristics', 'appeal-friendly logs'],
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
    role: 'Roblox combat-system client',
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
    body: 'Round cycles, lobby flow, matchmaking logic and win conditions. It is the skeleton your whole game hangs on.',
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
    body: 'You bring the art, I wire it up. Shops, inventories, drag-and-drop, clean tweening.',
  },
  {
    title: 'Trading Systems',
    body: 'Secure player-to-player trades, item validation, confirmation flows and transaction handling.',
  },
  {
    title: 'Data Migration',
    body: 'Move old saves into safer schemas without wiping progress or leaving players stuck between versions.',
  },
];

/* ── Process ── */
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Send the spec',
    body: 'After having the AI estimator giving you a price and time estimate, feel free to DM me on Discord.',
  },
  {
    step: '02',
    title: 'Quote locked in',
    body: 'I reply with a fixed Robux price and a timeframe. You pay 50% upfront through the specified gamepass, then I start writing code.',
  },
  {
    step: '03',
    title: 'Progress updates',
    body: 'While working, I\'ll set milestones. After hitting every milestone, I\'ll DM you, show the current state the game is in, so you can make changes early. Everything stays in my private place, and I\'ll publish the changes to your actual game once you pay the remaining 50%.',
  },
  {
    step: '04',
    title: 'Review & handover',
    body: 'I send a recorded demo of the finished system for review. After the included revision and remaining 50% are settled, I deliver the source and walk you through it.',
  },
];

/* ── Pricing ── */
export const PRICING_TIERS = [
  {
    name: 'UI Systems',
    desc: 'Shop logic, inventory systems, menu wiring and tweening on your UI art.',
    price: 'from $40',
    note: 'paid in robux',
    featured: false,
  },
  {
    name: 'Combat & Frameworks',
    desc: 'Modular combat, OOP frameworks, raycasting, and netcode. The heavy machinery.',
    price: 'from $165',
    note: 'most common request',
    featured: true,
  },
  {
    name: 'Full Game Backend',
    desc: 'The entire server side of a game: loop, data, security, the lot.',
    price: 'quoted',
    note: 'scoped in DMs',
    featured: false,
  },
];

export const PAYMENT_POINTS = [
  'Minimum commission: $10 or 4,000 Robux. Smaller requests are not accepted',
  '50% upfront, 50% on demo. No rev-share, no percentages',
  'Robux only, paid through the gamepasses specified for the commission',
  'Gamepass prices account for Roblox fees so the received amount matches the quote',
  'Fixed price once scoped. No surprise invoices',
  'Small tasks welcome when they meet the minimum commission',
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
    a: 'No. I\'m a programmer, not an artist. You provide the UI art, models and animations, and I write the logic that makes them actually work. That split is what keeps me fast.',
  },
  {
    q: 'How long does a typical system take?',
    a: 'Small tasks land in 2 to 12 hours. Medium systems like a combat framework take 1 to 2 days. Large structural work runs 3 to 7 days. The estimator below gives you a tailored timeframe.',
  },
  {
    q: 'How does payment work?',
    a: 'Payment is Robux only. You pay 50% upfront through the specified gamepass before I write the first line, then the remaining 50% through the final gamepass after I send a recorded demo. Playable access and source are delivered only after full payment. No percentages or rev-share.',
  },
  {
    q: 'Will it survive exploiters?',
    a: 'That\'s the whole point of how I build. Every critical action is validated on the server, and I write anti-cheat logic directly into combat and interaction loops instead of stapling it on afterwards.',
  },
  {
    q: 'Can I hire you for something small?',
    a: 'Yes, as long as the spec is clear and the quote meets the $10 or 4,000 Robux minimum. Run it through the estimator first, then DM me if the range looks right.',
  },
];
