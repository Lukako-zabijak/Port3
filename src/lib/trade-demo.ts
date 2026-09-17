export type trade_state = { a: boolean; b: boolean; phase: 'offer' | 'validate' | 'complete' | 'rejected'; stale: boolean };
export type trade_action = 'confirm-a' | 'confirm-b' | 'stale' | 'resolve' | 'reset';
export const initial_trade: trade_state = { a: false, b: false, phase: 'offer', stale: false };

// illustrative local state machine; no production inventory or network calls.
export function transition_trade(state: trade_state, action: trade_action): trade_state {
  if (action === 'reset') return { ...initial_trade };
  if (action === 'resolve' && state.phase === 'validate') return { ...state, phase: state.stale ? 'rejected' : 'complete' };
  if (state.phase !== 'offer') return state;
  if (action === 'stale') return { ...state, stale: !state.stale };
  const next = { ...state, a: state.a || action === 'confirm-a', b: state.b || action === 'confirm-b' };
  return { ...next, phase: next.a && next.b ? 'validate' : 'offer' };
}

export function format_brief(input: string, context = '', devices = '', timeframe = '') {
  return [context && `inspiration: ${context}`, input.trim(), devices && `target devices: ${devices}`, timeframe.trim() && `desired timeframe: ${timeframe.trim()}`].filter(Boolean).join('\n\n');
}
