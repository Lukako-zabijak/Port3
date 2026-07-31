import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
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
const carrd_link = 'https://lukako.carrd.co/';

const nav_links = [
  ['Work', 'work'],
  ['Review', 'review'],
  ['Skills', 'skills'],
  ['Process', 'process'],
  ['Pricing', 'pricing'],
  ['FAQ', 'faq'],
] as const;

const hero_facts = [
  ['6 years', 'in Roblox Studio'],
  ['5 years', 'of scripting'],
  ['100 players', 'tested at once'],
  ['50 / 50', 'payment split'],
] as const;

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  number,
  title,
  copy,
}: {
  number: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="section-heading">
      <span>{number}</span>
      <div>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </header>
  );
}

function SiteNav({
  theme,
  on_theme,
}: {
  theme: ThemeKey;
  on_theme: (theme: ThemeKey) => void;
}) {
  const [menu_open, set_menu_open] = useState(false);
  const [palette_open, set_palette_open] = useState(false);

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
          {nav_links.map(([label, id]) => (
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
          <a href={carrd_link} target="_blank" rel="noopener noreferrer" className="nav-carrd">
            Carrd
            <ArrowUpRight />
          </a>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="nav-dm">
            DM me
            <ArrowUpRight />
          </a>
          <button
            className="menu-button"
            aria-label="Open menu"
            onClick={() => set_menu_open(true)}
          >
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
              <p>Pick a color</p>
              <div>
                {THEMES.map((item) => (
                  <button
                    key={item.key}
                    aria-label={`use ${item.label.toLowerCase()} palette`}
                    aria-pressed={theme === item.key}
                    onClick={() => {
                      on_theme(item.key);
                      set_palette_open(false);
                    }}
                  >
                    <span
                      style={{
                        background: `linear-gradient(135deg, ${item.accent}, ${item.accent2})`,
                      }}
                    />
                    {item.label}
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
            transition={{ duration: 0.24 }}
          >
            <div className="mobile-menu-head">
              <span>lukako_</span>
              <button aria-label="Close menu" onClick={() => set_menu_open(false)}>
                <X />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {nav_links.map(([label, id], index) => (
                <button key={id} onClick={() => go(id)}>
                  <span>0{index + 1}</span>
                  {label}
                </button>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <a href={carrd_link} target="_blank" rel="noopener noreferrer">
                Open my Carrd
                <ArrowUpRight />
              </a>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                DM me on Discord
                <ArrowUpRight />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="hero-section">
      <motion.div
        className="hero-main"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 34 }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="hero-statement">
          <h1>
            Roblox systems that feel sharp <span>and stay stable.</span>
          </h1>
          <div className="hero-actions">
            <a href="#work" className="button-primary">
              View the work
              <ArrowDown />
            </a>
            <a href={carrd_link} target="_blank" rel="noopener noreferrer" className="button-secondary">
              Open my Carrd
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <aside className="hero-brief">
          <p>
            Hey, I&apos;m Luka. I have been working in Roblox Studio for 6 years and scripting
            for 5 years.
          </p>
          <p>
            I build combat, data, trading, security, and backend systems that feel immediate
            for players while the server keeps the final say.
          </p>
          <div className="hero-status">
            <span />
            Available for commissions
          </div>
        </aside>
      </motion.div>

      <motion.div
        className="hero-facts"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
      >
        {hero_facts.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      <a href="#work" className="hero-scroll" aria-label="scroll to selected work">
        Selected work
        <ArrowDown />
      </a>
    </section>
  );
}

function WorkSection() {
  const [active_project, set_active_project] = useState(0);
  const project = PROJECTS[active_project];

  return (
    <section id="work" className="page-section work-section">
      <SectionHeading
        number="01"
        title="Selected systems"
        copy="Three examples of how I approach combat, security, and game architecture."
      />

      <div className="workbench">
        <nav className="project-selector" aria-label="project selector">
          {PROJECTS.map((item, index) => (
            <button
              key={item.title}
              aria-pressed={active_project === index}
              onClick={() => set_active_project(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.title}</strong>
              <small>{item.tag}</small>
            </button>
          ))}
        </nav>

        <div className="project-view">
          <AnimatePresence mode="wait">
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease }}
            >
              <header>
                <span>0{active_project + 1}</span>
                <p>{project.tag}</p>
              </header>
              <h3>{project.title}</h3>
              <div className="project-copy">
                <div>
                  <span>The problem</span>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <span>What I built</span>
                  <p>{project.built}</p>
                </div>
              </div>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <a
        href={carrd_link}
        target="_blank"
        rel="noopener noreferrer"
        className="showcase-link"
      >
        <span>
          <small>More videos, demos, and older work</small>
          See my full Carrd portfolio
        </span>
        <ArrowUpRight />
      </a>
    </section>
  );
}

function ReviewSection() {
  const review = client_reviews[0];

  return (
    <section
      id="review"
      className="page-section review-section"
      aria-labelledby="review-heading"
    >
      <SectionHeading
        number="02"
        title="The client said it better"
        copy="The message below is kept exactly as it was sent."
      />

      <div className="review-grid">
        <aside className="review-identity">
          <span>Client</span>
          <strong>{review.client}</strong>
          <p>{review.project}</p>
          <small>{review.role}</small>
        </aside>

        <Reveal className="review-message">
          <h2 id="review-heading" className="sr-only">
            Client review from {review.client}
          </h2>
          <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
        </Reveal>
      </div>

      <Reveal className="review-proof">
        <figure>
          <img
            src={review_screenshot}
            alt="Original Discord message from pixieyaps2 reviewing the Bungo Battlegrounds commission"
            width={1825}
            height={95}
            loading="lazy"
          />
        </figure>
      </Reveal>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="page-section skills-section">
      <SectionHeading
        number="03"
        title="What I can handle"
        copy="The systems behind the game, from the first round loop to the last save."
      />

      <div className="capability-grid">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={(index % 2) * 0.06}>
            <article>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="skills-note">
        Programming only. You bring the models, VFX, animations, and UI art. I build the
        systems that make them work.
      </p>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="page-section process-section">
      <div className="process-layout">
        <div className="process-intro">
          <SectionHeading
            number="04"
            title="From spec to handover"
            copy="A simple process with clear checkpoints and no guessing about what happens next."
          />
        </div>

        <div className="process-timeline">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.step}>
              <article>
                <div className="process-marker">
                  <span>{step.step}</span>
                  {index < PROCESS_STEPS.length - 1 ? <i /> : null}
                </div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="page-section pricing-section">
      <SectionHeading
        number="05"
        title="Rough pricing"
        copy="Starting points before we turn your idea into a proper scope."
      />

      <div className="pricing-table">
        {PRICING_TIERS.map((tier, index) => (
          <Reveal key={tier.name}>
            <article>
              <span>0{index + 1}</span>
              <div>
                <small>{tier.note}</small>
                <h3>{tier.name}</h3>
                <p>{tier.desc}</p>
              </div>
              <strong>{tier.price}</strong>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="payment-panel">
        <ul>
          {PAYMENT_POINTS.slice(0, 5).map((point) => (
            <li key={point}>
              <Check />
              {point}
            </li>
          ))}
        </ul>
        <Link to="/terms">
          Read the full TOS
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

function EstimatorSection() {
  return (
    <section className="estimator-section">
      <div className="estimator-shell">
        <div className="estimator-intro">
          <span>06</span>
          <h2>Turn the idea into a rough scope</h2>
          <p>
            Describe what you need. The estimator gives you a starting range before you DM me.
          </p>
        </div>
        <div className="estimator-panel">
          <Estimator />
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, set_open] = useState(0);

  return (
    <section id="faq" className="page-section faq-section">
      <div className="faq-layout">
        <SectionHeading
          number="07"
          title="Before you ask"
          copy="The common questions, answered properly."
        />

        <div className="faq-list">
          {FAQS.map((item, index) => {
            const active = open === index;

            return (
              <article key={item.q}>
                <button
                  onClick={() => set_open(active ? -1 : index)}
                  aria-expanded={active}
                >
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
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <Reveal>
        <div className="contact-card">
          <p>Got a game that needs a serious backend?</p>
          <h2>Send the spec. I&apos;ll tell you what it takes.</h2>
          <div>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              <MessageCircle />
              DM me on Discord
            </a>
            <a
              href={ROBLOX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Roblox profile
              <ArrowUpRight />
            </a>
            <a
              href={carrd_link}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Carrd portfolio
              <ArrowUpRight />
            </a>
          </div>
          <small>
            By commissioning me, you agree to the <Link to="/terms">terms of service</Link>.
          </small>
        </div>
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
        <EstimatorSection />
        <FaqSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Lukako</span>
        <div>
          <Link to="/terms">TOS</Link>
          <a href={carrd_link} target="_blank" rel="noopener noreferrer">Carrd</a>
          <a href="#top">Back to top</a>
        </div>
        <span>
          Discord {DISCORD_ID} | Roblox {ROBLOX_ID}
        </span>
      </footer>
    </>
  );
}
