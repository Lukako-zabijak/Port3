import { createElement as create_element, useState as use_state } from 'react';
import { ArrowRight as arrow_icon } from 'lucide-react';
import { DISCORD_LINK as discord_link } from '../lib/content';
import brief_copy from './brief-copy';
import { format_brief } from '../lib/trade-demo';

export default function commission_brief({ context = '', on_clear }: { context?: string; on_clear?: () => void }) {
  const [input, set_input] = use_state('');
  const [devices, set_devices] = use_state('');
  const [timeframe, set_timeframe] = use_state('');
  const [budget, set_budget] = use_state('');
  const [billing, set_billing] = use_state('not decided yet');
  const brief = input.trim() ? [format_brief(input, context, devices, timeframe), `payment preference: ${billing}`, budget.trim() ? `client budget: ${budget.trim()}` : ''].filter(Boolean).join('\n\n') : '';

  return <section id="estimator" className="estimator-tool">
    <div className="estimator-tool-head"><div><span className="estimator-kicker">your project</span><h3>Tell me what you want built.</h3><p>We can go with $27 an hour, or work off your budget. Send me what you need &amp; we'll figure out what fits.</p></div></div>
    <div className="estimator-form">
      {context && <div className="brief-context"><span>inspired by <strong>{context}</strong></span><button type="button" onClick={on_clear}>remove context</button></div>}
      <label htmlFor="estimator-spec">Your project brief</label>
      <div className="estimator-input-wrap"><textarea id="estimator-spec" value={input} onChange={(event) => set_input(event.target.value)} rows={5} placeholder="What do you need me to make? Include anything important." /><span>{input.length} characters</span></div>
      <div className="brief-fields">
        <label htmlFor="brief-billing">How would you like to work?<select id="brief-billing" value={billing} onChange={(event) => set_billing(event.target.value)}><option>not decided yet</option><option>hourly — $27/hour</option><option>work off my budget</option></select></label>
        <label htmlFor="brief-budget">Your budget<input id="brief-budget" value={budget} onChange={(event) => set_budget(event.target.value)} placeholder="optional — include the currency" maxLength={120} /></label>
        <label htmlFor="brief-devices">Target devices<select id="brief-devices" value={devices} onChange={(event) => set_devices(event.target.value)}><option value="">not decided yet</option><option>desktop</option><option>desktop and mobile</option><option>desktop, mobile and console</option></select></label>
        <label htmlFor="brief-timeframe">Desired timeframe<input id="brief-timeframe" value={timeframe} onChange={(event) => set_timeframe(event.target.value)} placeholder="optional — e.g. next month" maxLength={120} /></label>
      </div>
      <div className="commission-handoff"><p>Copy this &amp; send it to me on Discord. I'll go through it with you.</p>{create_element(brief_copy, { text: brief })}<a href={discord_link} target="_blank" rel="noopener noreferrer" className="text-action">open discord {create_element(arrow_icon)}</a></div>
    </div>
  </section>;
}
