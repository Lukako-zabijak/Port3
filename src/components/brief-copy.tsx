import { useState as use_state } from 'react';

export default function brief_copy({ text }: { text: string }) {
  const [copied, set_copied] = use_state('');
  const [fallback, set_fallback] = use_state(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); set_copied(text); set_fallback(false); }
    catch { set_fallback(true); }
  };
  return <div className="brief-copy"><button className="button-secondary" type="button" onClick={copy} disabled={!text.trim()}>{copied === text && text ? 'brief copied' : 'copy discord brief'}</button>
    <span role="status">{copied === text && text ? 'ready to paste into discord. nothing has been sent.' : ''}</span>
    {fallback && <label>select and copy your brief<textarea aria-label="brief to copy manually" readOnly value={text} onFocus={(event) => event.currentTarget.select()} /></label>}
  </div>;
}
