import { createElement as create_element, useEffect as use_effect, useReducer as use_reducer, useState as use_state } from 'react';
import { Play as play_icon, ArrowUpRight as arrow_icon, ShieldCheck as shield_icon, Swords as sword_icon, ArrowRightLeft as exchange_icon } from 'lucide-react';
import { Link as link } from 'react-router';
import { SERVICES as services } from '../lib/content';
import { work_items, youtube_embed_url, youtube_thumbnail_url, youtube_thumbnail_fallback_url, youtube_url, type work_item } from '../lib/works';
import { initial_trade, transition_trade } from '../lib/trade-demo';
import code_inspector from './code-inspector';

export function recorded_preview({ item, label = 'recorded showcase' }: { item: work_item; label?: string }) {
  const [playing, set_playing] = use_state(false);
  const [failed, set_failed] = use_state(false);
  return <figure className="recorded-preview">
    <div className="recorded-frame">
      {playing ? <iframe src={youtube_embed_url(item.youtube_id)} title={item.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> :
        <button type="button" onClick={() => set_playing(true)} aria-label={`play ${item.title}`}>
          {!failed && <img src={youtube_thumbnail_url(item.youtube_id)} alt="" loading="lazy" onError={(event) => {
            if (event.currentTarget.src.includes('maxresdefault')) event.currentTarget.src = youtube_thumbnail_fallback_url(item.youtube_id);
            else set_failed(true);
          }} onLoad={(event) => {
            if (event.currentTarget.naturalWidth <= 120 && event.currentTarget.src.includes('maxresdefault')) event.currentTarget.src = youtube_thumbnail_fallback_url(item.youtube_id);
          }} />}
          <span className="recorded-play">{create_element(play_icon)}<span>watch the system</span></span>
        </button>}
    </div>
    <figcaption><span><small>{label}</small><strong>{item.title}</strong></span>
      <a href={youtube_url(item.youtube_id)} target="_blank" rel="noopener noreferrer" aria-label={`open ${item.title} on youtube`}>{create_element(arrow_icon)}</a>
      {playing && <button onClick={() => set_playing(false)} type="button">close video</button>}
    </figcaption>
  </figure>;
}

export function trade_playground({ on_brief }: { on_brief: (text: string) => void }) {
  const [state, dispatch] = use_reducer(transition_trade, initial_trade);
  use_effect(() => {
    if (state.phase !== 'validate') return;
    const timer = window.setTimeout(() => dispatch('resolve'), 1300);
    return () => window.clearTimeout(timer);
  }, [state.phase]);
  const completed = state.phase === 'complete';
  const status = state.phase === 'complete' ? 'trade completed. the items changed owners once.' : state.phase === 'rejected' ? 'stale coordinator rejected. both players keep their original items.' : state.phase === 'validate' ? 'checking confirmations and coordinator ownership…' : state.a || state.b ? 'one player confirmed. waiting for the other player.' : 'choose the normal or stale-request path, then confirm both players.';
  return <section id="lab" className="page-section trade-lab" aria-labelledby="lab-title">
    <header className="experience-heading"><span>inside the system</span><h2 id="lab-title">See how my<br /><em>reasoning works</em></h2><p>Try a normal trade, then see what happens with an outdated request.<br />This is just a small demo, not the actual trading system.</p></header>
    <div className={`trade-stage is-${state.phase}`}>
      <div className="trade-inventories">
        <div className="trade-player"><small>player a</small><div className="trade-item" key={`a-${completed}`}>{create_element(completed ? shield_icon : sword_icon)}<strong>{completed ? 'shield' : 'sword'}</strong></div><button className="button-secondary" disabled={state.a || state.phase !== 'offer'} onClick={() => dispatch('confirm-a')}>{state.a ? 'player a confirmed' : 'confirm player a'}</button></div>
        <div className="trade-validator">{create_element(exchange_icon)}<strong>server validation</strong><span>{state.phase === 'validate' ? 'checking ownership' : completed ? 'committed once' : state.phase === 'rejected' ? 'request rejected' : 'waiting for consent'}</span></div>
        <div className="trade-player"><small>player b</small><div className="trade-item" key={`b-${completed}`}>{create_element(completed ? sword_icon : shield_icon)}<strong>{completed ? 'sword' : 'shield'}</strong></div><button className="button-secondary" disabled={state.b || state.phase !== 'offer'} onClick={() => dispatch('confirm-b')}>{state.b ? 'player b confirmed' : 'confirm player b'}</button></div>
      </div>
      <ol className="trade-steps" aria-label="trade progress">{['offer', 'confirm', 'validate', 'complete'].map((step, index) => <li key={step} aria-current={(state.phase === 'offer' ? state.a || state.b ? 1 : 0 : state.phase === 'validate' || state.phase === 'rejected' ? 2 : 3) === index ? 'step' : undefined}><span>0{index + 1}</span>{step}</li>)}</ol>
      <p className="trade-status" role="status">{status}</p>
      <div className="trade-controls"><label><input type="checkbox" checked={state.stale} disabled={state.phase !== 'offer'} onChange={() => dispatch('stale')} />simulate a stale request</label><button className="text-action" onClick={() => dispatch('reset')}>reset demo</button></div>
    </div>
    <div className="lab-explanation"><div><h3>Why the server checks first</h3><p>Even if both players confirm, the part handling the trade might no longer be allowed to finish it. In this demo, the server stops that outdated request &amp; both players keep their items. The actual system also handles saving &amp; recovery if something goes wrong.</p></div><div>{create_element(code_inspector)}<button className="text-action" onClick={() => on_brief('a secure inventory and trading system')}>include trading in my brief {create_element(arrow_icon)}</button></div></div>
  </section>;
}

const evidence_ids = ['round-system', 'two-character-abilities', 'growing-system', 'anti-cheat', 'advanced-pathfinding', 'loading-screen', null, null];
export function capability_explorer({ on_brief }: { on_brief: (text: string) => void }) {
  const [active, set_active] = use_state(0);
  const service = services[active];
  const evidence = work_items.find((item) => item.id === evidence_ids[active]);
  return <section id="skills" className="page-section capability-section" aria-labelledby="capability-title">
    <header className="experience-heading"><span>what i work on</span><h2 id="capability-title">What i'm good at</h2><p>Pick something below to see what i can do. If it's what you need, you can add it to your brief.</p></header>
    <div className="capability-explorer"><div className="capability-list" aria-label="choose a capability">{services.map((item, index) => <button key={item.title} aria-pressed={index === active} aria-controls="capability-detail" onClick={() => set_active(index)}><span>0{index + 1}</span><strong>{item.title}</strong>{create_element(arrow_icon)}</button>)}</div>
      <article id="capability-detail" className="capability-detail" key={active}><h3>{service.title}</h3><p>{service.body}</p>
        {evidence ? <>{create_element(recorded_preview, { item: evidence, label: evidence.status === 'archive' ? 'related recording · earlier work' : 'related recording' })}<p className="evidence-note">{evidence.description}</p></> : active === 6 ? <div className="code-evidence"><h4>Trading protocol</h4><p>Explore the lease renewal, recovery and ownership checks in the existing code excerpt.</p>{create_element(code_inspector)}<a className="text-action" href="#lab">try the interactive explanation {create_element(arrow_icon)}</a></div> : <div className="code-evidence"><h4>Plan around your existing data</h4><p>No dedicated public migration recording is listed. Share your current schema, target format and rollout constraints so we can scope this properly.</p></div>}
        <button className="button-primary" onClick={() => on_brief(service.title)}>include in my brief {create_element(arrow_icon)}</button>
      </article>
    </div><p className="skills-note">I only program. All other parts (VFX, SFX, UI, models etc.) must be provided.</p>
  </section>;
}

export function recording_rail() {
  return <div className="recording-rail"><header><h3>Some more of my work</h3>{create_element(link, { to: '/works', className: 'text-action' }, 'all 11 recordings', create_element(arrow_icon))}</header><div>{work_items.slice(0, 3).map((item) => create_element(link, { key: item.id, to: `/works#${item.id}`, className: 'recording-tile' }, <img src={youtube_thumbnail_fallback_url(item.youtube_id)} alt="" loading="lazy" />, <span>{item.title}{create_element(arrow_icon)}</span>))}</div></div>;
}
