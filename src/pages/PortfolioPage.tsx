import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  MessageCircle,
  Palette,
  X,
} from 'lucide-react';
import { Link } from 'react-router';
import Estimator from '../components/Estimator';
import Preloader from '../components/Preloader';
import review_screenshot from '../assets/reviews/pixieyaps2-bungo-battlegrounds.png';
import {
  client_reviews,
  DISCORD_ID,
  DISCORD_LINK,
  FAQS,
  PAYMENT_POINTS,
  PRICING_TIERS,
  PROCESS_STEPS,
  PROJECTS,
  ROBLOX_ID,
  ROBLOX_LINK,
  SERVICES,
} from '../lib/content';
import { THEMES, type ThemeKey } from '../lib/themes';
import '../portfolio.css';

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.72, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-title">
      <span>{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

function SiteNav({ theme, on_theme }: { theme: ThemeKey; on_theme: (theme: ThemeKey) => void }) {
  const [menu_open, set_menu_open] = useState(false);
  const [palette_open, set_palette_open] = useState(false);

  const links = [
    ['work', 'work'],
    ['skills', 'skills'],
    ['process', 'process'],
    ['pricing', 'pricing'],
    ['faq', 'faq'],
  ];

  const go = (id: string) => {
    set_menu_open(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="site-nav">
        <button className="nav-logo" onClick={() => go('top')}>
          lukako<span>_</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="palette-button"
            aria-label="Change color palette"
            aria-expanded={palette_open}
            onClick={() => set_palette_open((open) => !open)}
          >
            <Palette />
          </button>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="nav-dm">
            dm me
            <ArrowUpRight />
          </a>
          <button className="menu-button" aria-label="Open menu" onClick={() => set_menu_open(true)}>
            <Menu />
          </button>
        </div>

        <AnimatePresence>
          {palette_open ? (
            <motion.div
              className="palette-panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <p>pick a color</p>
              <div>
                {THEMES.map((item) => (
                  <button
                    key={item.key}
                    aria-label={`Use ${item.label} palette`}
                    aria-pressed={theme === item.key}
                    onClick={() => {
                      on_theme(item.key);
                      set_palette_open(false);
                    }}
                  >
                    <span style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent2})` }} />
                    {item.label.toLowerCase()}
                    {theme === item.key ? <Check /> : null}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menu_open ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-head">
              <span>lukako_</span>
              <button aria-label="Close menu" onClick={() => set_menu_open(false)}>
                <X />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {links.map(([label, id], index) => (
                <button key={id} onClick={() => go(id)}>
                  <span>0{index + 1}</span>
                  {label}
                </button>
              ))}
            </nav>
            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
              dm me on discord
              <ArrowUpRight />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const facts = [
    ['5 years', 'scripting'],
    ['6 years', 'in studio'],
    ['100 players', 'stress tested'],
    ['50 / 50', 'payment split'],
  ];

  return (
    <section id="top" className="hero-section">
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 36 }}
        transition={{ duration: 0.9, ease }}
      >
        <h1>
          i build roblox systems that <span>do not fall apart.</span>
        </h1>
        <div className="hero-intro">
          <p>
            Hey, I&apos;m Luka. I&apos;ve been using Roblox Studio for around 6 years and scripting for 5.
            I mainly work on combat, anti-cheat, data, trading, and backend systems.
          </p>
          <p>
            The goal is pretty simple: make it feel good for players, keep the server in charge, and leave you
            with code that can still be changed later without everything breaking.
          </p>
        </div>
        <div className="hero-actions">
          <a href="#work" className="button-primary">
            see my work
            <ArrowDownRight />
          </a>
          <a href="#estimator" className="button-secondary">
            get a rough price
          </a>
        </div>
      </motion.div>

      <motion.div
        className="hero-facts"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        {facts.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="page-section work-section">
      <SectionTitle number="01">things i&apos;ve built and would happily build again.</SectionTitle>
      <p className="section-lead">
        No mystery screenshots here. These are the actual system breakdowns, what was wrong, and what I built
        to fix it.
      </p>

      <div className="project-list">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.title}>
            <article className="project-row">
              <div className="project-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{project.tag}</p>
              </div>
              <div className="project-main">
                <h3>{project.title}</h3>
                <p className="project-problem">{project.problem}</p>
                <p>{project.built}</p>
              </div>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="showcase-link-wrap">
        <a href="https://lukako.carrd.co/" target="_blank" rel="noopener noreferrer" className="showcase-link">
          <span>
            want to see the actual demos?
            <small>the full showcase is still over here</small>
          </span>
          lukako.carrd.co
          <ArrowUpRight />
        </a>
      </Reveal>
    </section>
  );
}

function ReviewSection() {
  const review = client_reviews[0];

  return (
    <section className="page-section review-section" aria-labelledby="review-heading">
      <SectionTitle number="02">what a client actually said.</SectionTitle>
      <div className="review-layout">
        <Reveal className="review-info">
          <p>{review.project}</p>
          <strong>{review.client}</strong>
          <span>{review.role}</span>
        </Reveal>
        <Reveal className="review-content">
          <h2 id="review-heading" className="sr-only">
            Client review from {review.client}
          </h2>
          <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
          <figure>
            <img
              src={review_screenshot}
              alt="Original Discord message from Pixieyaps2 reviewing the Bungo Battlegrounds commission"
              width={1825}
              height={95}
              loading="lazy"
            />
            <figcaption>the original message, untouched</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="page-section skills-section">
      <SectionTitle number="03">what you can hire me for.</SectionTitle>
      <div className="skills-list">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title}>
            <article>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="skills-note">
        Programming only. You bring the models, VFX, animations, and UI art. I make the systems behind them
        work.
      </p>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="page-section process-section">
      <SectionTitle number="04">how a commission usually goes.</SectionTitle>
      <div className="process-list">
        {PROCESS_STEPS.map((step) => (
          <Reveal key={step.step}>
            <article>
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="page-section pricing-section">
      <SectionTitle number="05">rough pricing before you dm me.</SectionTitle>
      <p className="section-lead">
        These are starting points, not mystery numbers. The final quote depends on the actual scope.
      </p>
      <div className="price-ledger">
        {PRICING_TIERS.map((tier) => (
          <Reveal key={tier.name}>
            <article>
              <div>
                <span>{tier.note}</span>
                <h3>{tier.name}</h3>
                <p>{tier.desc}</p>
              </div>
              <strong>{tier.price}</strong>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="payment-notes">
        <ul>
          {PAYMENT_POINTS.slice(0, 5).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Link to="/terms">
          read the full tos
          <ArrowUpRight />
        </Link>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, set_open] = useState(0);

  return (
    <section id="faq" className="page-section faq-section">
      <SectionTitle number="07">stuff people ask before paying me.</SectionTitle>
      <div className="faq-list">
        {FAQS.map((item, index) => {
          const active = open === index;
          return (
            <article key={item.q}>
              <button onClick={() => set_open(active ? -1 : index)} aria-expanded={active}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.q}
                <ChevronDown className={active ? 'is-open' : ''} />
              </button>
              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section">
      <Reveal>
        <p>got a game that needs a serious backend?</p>
        <h2>send me the spec. i&apos;ll tell you what it takes.</h2>
        <div>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="button-primary">
            <MessageCircle />
            dm me on discord
          </a>
          <a href={ROBLOX_LINK} target="_blank" rel="noopener noreferrer" className="button-secondary">
            roblox profile
            <ArrowUpRight />
          </a>
        </div>
        <small>
          By commissioning me, you agree to the <Link to="/terms">terms of service</Link>.
        </small>
      </Reveal>
    </section>
  );
}

export default function PortfolioPage({
  theme,
  on_theme,
}: {
  theme: ThemeKey;
  on_theme: (theme: ThemeKey) => void;
}) {
  const [ready, set_ready] = useState(false);

  return (
    <>
      <Preloader onDone={() => set_ready(true)} />
      <SiteNav theme={theme} on_theme={on_theme} />
      <main className="portfolio-page">
        {ready ? <Hero ready={ready} /> : <div className="hero-section" />}
        <WorkSection />
        <ReviewSection />
        <SkillsSection />
        <ProcessSection />
        <PricingSection />
        <section className="estimator-wrap">
          <div className="estimator-number">06</div>
          <Estimator />
        </section>
        <FaqSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} lukako</span>
        <div>
          <Link to="/terms">tos</Link>
          <a href="#top">back to top</a>
        </div>
        <span>discord {DISCORD_ID} · roblox {ROBLOX_ID}</span>
      </footer>
    </>
  );
}
