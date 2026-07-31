import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  DollarSign,
  Layers3,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { estimator_error, getEstimate, THINKING_STEPS, type Estimate } from '../lib/estimate';
import { DISCORD_LINK } from '../lib/content';
import { EASE } from './bits';

interface Run {
  spec: string;
  estimate: Estimate;
}

const min_think_ms = 2100;
const cooldown_ms = 180_000;
const cooldown_storage_key = 'lukako-estimator-cooldown-until';
const prompt_starters = [
  'A combat system with raycast hits and saving',
  'A secure player data system',
  'An inventory and trading system',
] as const;

function get_cooldown_remaining(): number {
  const expires_at = Number(window.localStorage.getItem(cooldown_storage_key));
  const remaining = expires_at - Date.now();
  if (!Number.isFinite(expires_at) || remaining <= 0) {
    window.localStorage.removeItem(cooldown_storage_key);
    return 0;
  }
  return remaining;
}

function format_cooldown(remaining: number): string {
  return `${Math.max(1, Math.ceil(remaining / 60_000))} minute${remaining > 60_000 ? 's' : ''}`;
}

export default function Estimator() {
  const [input, set_input] = useState('');
  const [busy, set_busy] = useState(false);
  const [step_idx, set_step_idx] = useState(0);
  const [runs, set_runs] = useState<Run[]>([]);
  const [notice, set_notice] = useState<string | null>(null);
  const [cooldown_until, set_cooldown_until] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return Date.now() + get_cooldown_remaining();
  });
  const input_ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (runs.length > 0) {
      document.getElementById('estimator-out')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [runs]);

  useEffect(() => {
    const remaining = cooldown_until - Date.now();
    if (remaining <= 0) return;

    const timer = window.setTimeout(() => set_cooldown_until(0), remaining);
    return () => window.clearTimeout(timer);
  }, [cooldown_until]);

  const run = async () => {
    const spec = input.trim();
    if (!spec || busy) return;
    const cooldown_remaining = get_cooldown_remaining();
    if (cooldown_remaining > 0) {
      set_notice(`Please wait ${format_cooldown(cooldown_remaining)} before running another estimate.`);
      return;
    }
    set_notice(null);
    set_busy(true);
    set_step_idx(0);

    const step_timer = window.setInterval(() => {
      set_step_idx((index) => Math.min(index + 1, THINKING_STEPS.length - 1));
    }, min_think_ms / THINKING_STEPS.length);

    const started = performance.now();
    try {
      const estimate = await getEstimate(spec);
      const elapsed = performance.now() - started;
      if (elapsed < min_think_ms) {
        await new Promise((resolve) => setTimeout(resolve, min_think_ms - elapsed));
      }
      set_runs((previous_runs) => [...previous_runs.slice(-2), { spec, estimate }]);
      set_input('');
      const next_cooldown = Date.now() + cooldown_ms;
      window.localStorage.setItem(cooldown_storage_key, String(next_cooldown));
      set_cooldown_until(next_cooldown);
    } catch (error) {
      set_notice(error instanceof estimator_error ? error.message : 'The estimator is temporarily unavailable. Please try again shortly.');
    } finally {
      window.clearInterval(step_timer);
      set_busy(false);
    }
  };

  return (
    <section id="estimator" className="estimator-tool">
      <div className="estimator-tool-head">
        <div>
          <span className="estimator-kicker">
            <Sparkles />
            AI estimator
          </span>
          <h3>Tell me what you want built.</h3>
          <p>Give it the useful details. You will get a rough scope, price, and timeframe.</p>
        </div>
        <div className="estimator-rules">
          <span>Minimum commission</span>
          <strong>$10 or 4,000 Robux</strong>
          <small>One estimate every three minutes</small>
        </div>
      </div>

      <div className="estimator-form">
        <label htmlFor="estimator-spec">Your project brief</label>
        <div className="estimator-input-wrap" onClick={() => input_ref.current?.focus()}>
          <textarea
            ref={input_ref}
            id="estimator-spec"
            value={input}
            onChange={(event) => {
              set_input(event.target.value);
              if (notice) set_notice(null);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) run();
            }}
            disabled={busy}
            rows={5}
            placeholder="Example: I need a combat system with raycast hits, abilities, mobile controls, and player data saving."
          />
          <span>{input.length} characters</span>
        </div>

        <div className="prompt-starters" aria-label="example project briefs">
          <span>Try an example</span>
          <div>
            {prompt_starters.map((prompt) => (
              <button key={prompt} type="button" onClick={() => set_input(prompt)} disabled={busy}>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="estimator-actions">
          <button
            type="button"
            onClick={run}
            disabled={busy || !input.trim() || cooldown_until > Date.now()}
            className="estimate-button"
          >
            {busy ? 'Working it out' : 'Get my estimate'}
            {busy ? <span className="estimate-spinner" /> : <ArrowRight />}
          </button>
          <p>
            <CheckCircle2 />
            Rough estimate only. Final quote happens in DMs.
          </p>
        </div>

        {busy ? (
          <motion.div
            className="estimator-progress"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span />
            <p>{THINKING_STEPS[step_idx]}</p>
          </motion.div>
        ) : null}

        {notice ? <p role="alert" className="estimator-notice">{notice}</p> : null}
      </div>

      <div id="estimator-out" className="estimator-results">
        <AnimatePresence initial={false}>
          {runs.map((item, run_index) => (
            <motion.article
              key={`${item.spec}-${run_index}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="estimate-result"
            >
              <header>
                <div>
                  <span>Your estimate</span>
                  <h4>{item.spec}</h4>
                </div>
                <CheckCircle2 />
              </header>

              <div className="estimate-metrics">
                <div>
                  <Layers3 />
                  <span>Scope</span>
                  <strong>{item.estimate.tier}</strong>
                </div>
                <div>
                  <DollarSign />
                  <span>Price</span>
                  <strong>{item.estimate.price}</strong>
                </div>
                <div>
                  <Clock3 />
                  <span>Timeline</span>
                  <strong>{item.estimate.time}</strong>
                </div>
              </div>

              <div className="estimate-details">
                <span>What affects the quote</span>
                <ul>
                  {item.estimate.considerations.map((consideration) => (
                    <li key={consideration}>
                      <CheckCircle2 />
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>

              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                Send me this brief
                <ArrowRight />
              </a>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
