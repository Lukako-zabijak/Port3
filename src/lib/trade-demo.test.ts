import { describe, expect, it } from 'vitest';
import { initial_trade, transition_trade, format_brief } from './trade-demo';

describe('illustrative trade', () => {
  it('requires both confirmations before resolving', () => {
    const first = transition_trade(initial_trade, 'confirm-a');
    expect(first.phase).toBe('offer');
    expect(transition_trade(first, 'resolve').phase).toBe('offer');
    const both = transition_trade(first, 'confirm-b');
    expect(both.phase).toBe('validate');
    expect(transition_trade(both, 'resolve').phase).toBe('complete');
  });
  it('rejects stale ownership and prevents changing a locked trade', () => {
    let state = transition_trade(initial_trade, 'stale');
    state = transition_trade(transition_trade(state, 'confirm-b'), 'confirm-a');
    expect(transition_trade(state, 'stale')).toEqual(state);
    state = transition_trade(state, 'resolve');
    expect(state.phase).toBe('rejected');
    expect(transition_trade(state, 'confirm-a')).toEqual(state);
    expect(transition_trade(state, 'reset')).toEqual(initial_trade);
  });
  it('does not allow duplicate completion or mutate the initial state', () => {
    const done = transition_trade(transition_trade(transition_trade(initial_trade, 'confirm-a'), 'confirm-b'), 'resolve');
    expect(transition_trade(done, 'resolve')).toEqual(done);
    expect(initial_trade.a).toBe(false);
  });
});
describe('commission handoff', () => {
  it('preserves the authored brief with optional context', () => {
    expect(format_brief('  my game  ', 'trading', 'mobile', 'two weeks')).toBe('inspiration: trading\n\nmy game\n\ntarget devices: mobile\n\ndesired timeframe: two weeks');
    expect(format_brief('my game')).toBe('my game');
  });
});
