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

const nav_links = [
  ['work', 'work'],
  ['review', 'review'],
  ['skills', 'skills'],
  ['process', 'process'],
  ['pricing', 'pricing'],
  ['faq', 'faq'],
] as const;

const hero_facts = [
  ['5 years', 'scripting'],
  ['6 years', 'in studio'],
  ['100 players', 'tested at'],
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

        <nav className="nav-links" aria-label="main navigation">
          {nav_links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="palette-button"
            aria-label="change color palette"
            aria-expanded={palette_open}
            onClick={() => set_palette_open((open) => !open)}
          >
            <Palette />
          </button>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="nav-dm">
            dm me
            <ArrowUpRight />
          </a>
          <button
            className="menu-button"
            aria-label="open menu"
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
              <p>pick a color</p>
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
            transition={{ duration: 0.24 }}
          >
            <div className="mobile-menu-head">
              <span>lukako_</span>
              <button aria-label="close menu" onClick={() => set_menu_open(false)}>
                <X />
              </button>
            </div>
            <nav aria-label="mobile navigation">
              {nav_links.map(([label, id], index) => (
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
            roblox systems that feel sharp <span>and stay stable.</span>
          </h1>
          <div className="hero-actions">
            <a href="#work" className="button-primary">
              view the work
              <ArrowDown />
            </a>
            <a href="#estimator" className="button-secondary">
              check the price
            </a>
          </div>
        </div>

        <aside className="hero-brief">
          <p>
            hey, i&apos;m luka. i build combat, data, trading, security, and backend systems
            for roblox games.
          </p>
          <p>
            i care about both sides of the work. it should feel immediate for players, while
            the server keeps the final say.
          </p>
          <div className="hero-status">
            <span />
            available for commissions
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
        selected work
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
        title="selected systems"
        copy="three examples of how i approach combat, security, and game architecture."
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
              <strong>{item.title.toLowerCase()}</strong>
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
              <h3>{project.title.toLowerCase()}</h3>
              <div className="project-copy">
                <div>
                  <span>the problem</span>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <span>what i built</span>
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
        href="https://lukako.carrd.co/"
        target="_blank"
        rel="noopener noreferrer"
        className="showcase-link"
      >
        <span>
          <small>video demos and older work</small>
          open the full showcase
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
        title="the client said it better"
        copy="the message below is kept exactly as it was sent."
      />

      <div className="review-grid">
        <aside className="review-identity">
          <span>client</span>
          <strong>{review.client}</strong>
          <p>{review.project}</p>
          <small>{review.role}</small>
        </aside>

        <Reveal className="review-message">
          <h2 id="review-heading" className="sr-only">
            client review from {review.client}
          </h2>
          <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
        </Reveal>
      </div>

      <Reveal className="review-proof">
        <figure>
          <img
            src={review_screenshot}
            alt="original discord message from pixieyaps2 reviewing the bungo battlegrounds commission"
            width={1825}
            height={95}
            loading="lazy"
          />
          <figcaption>the original message, untouched</figcaption>
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
        title="what i can handle"
        copy="the systems behind the game, from the first round loop to the last save."
      />

      <div className="capability-grid">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={(index % 2) * 0.06}>
            <article>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{service.title.toLowerCase()}</h3>
                <p>{service.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="skills-note">
        programming only. you bring the models, vfx, animations, and ui art. i build the
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
            title="from spec to handover"
            copy="a simple process with clear checkpoints and no guessing about what happens next."
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
                  <h3>{step.title.toLowerCase()}</h3>
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
        title="rough pricing"
        copy="starting points before we turn your idea into a proper scope."
      />

      <div className="pricing-table">
        {PRICING_TIERS.map((tier, index) => (
          <Reveal key={tier.name}>
            <article>
              <span>0{index + 1}</span>
              <div>
                <small>{tier.note}</small>
                <h3>{tier.name.toLowerCase()}</h3>
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
          read the full tos
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
          <h2>turn the idea into a rough scope</h2>
          <p>
            describe what you need. the estimator gives you a starting range before you dm me.
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
          title="before you ask"
          copy="the common questions, answered properly."
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
          <p>got a game that needs a serious backend?</p>
          <h2>send the spec. i&apos;ll tell you what it takes.</h2>
          <div>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              <MessageCircle />
              dm me on discord
            </a>
            <a
              href={ROBLOX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              roblox profile
              <ArrowUpRight />
            </a>
          </div>
          <small>
            by commissioning me, you agree to the <Link to="/terms">terms of service</Link>.
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
        <span>© {new Date().getFullYear()} lukako</span>
        <div>
          <Link to="/terms">tos</Link>
          <a href="#top">back to top</a>
        </div>
        <span>
          discord {DISCORD_ID} · roblox {ROBLOX_ID}
        </span>
      </footer>
    </>
  );
}
