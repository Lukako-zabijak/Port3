import { describe, it, expect, vi } from 'vitest';
import { estimate_elaboration_message, getEstimate, localEstimate } from './estimate';

describe('price estimator engine', () => {
  it('prices a multi-screen UI spec as a standard build', () => {
    const e = localEstimate('a shop UI with clean tweening and a settings menu');
    expect(e.tier).toBe('standard');
    expect(e.price).toBe('$75 to $140');
    expect(e.time).toBe('6 to 12 hours');
  });

  it('prices a combat system as a medium build', () => {
    const e = localEstimate('a melee combat system with raycast hits and parry mechanics');
    expect(e.tier).toBe('medium');
    expect(e.price).toBe('$170 to $200');
    expect(e.time).toBe('1 to 2 days');
  });

  it('prices a full game backend as the largest tier', () => {
    const e = localEstimate(
      'full game: round-based combat with matchmaking, datastore saving for player profiles, trading, and anti-cheat'
    );
    expect(e.tier).toBe('xl');
    expect(e.price).toBe('$500+');
    expect(e.time).toBe('1 to 2 weeks');
  });

  it('caps build notes at three and leads with spec-specific advice', () => {
    const e = localEstimate('a combat system with datastore saving, trading and admin commands');
    expect(e.considerations.length).toBeLessThanOrEqual(3);
    expect(e.considerations[0]).toMatch(/server/i);
  });

  it('handles an empty spec without blowing up', () => {
    const e = localEstimate('   ');
    expect(e.tier).toBe('small');
    expect(e.considerations.length).toBeGreaterThan(0);
  });

  it('rejects nonsense before calling the estimator endpoint', async () => {
    const fetch_mock = vi.fn();
    vi.stubGlobal('fetch', fetch_mock);

    await expect(getEstimate(',')).rejects.toThrow(estimate_elaboration_message);
    expect(fetch_mock).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('shows the server cooldown message instead of producing a local estimate', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: 'Please wait three minutes between estimates.' }),
    }));

    await expect(getEstimate('a combat system with parries')).rejects.toThrow('Please wait three minutes');
    vi.unstubAllGlobals();
  });

  it('falls back to the built-in estimator when deployment infrastructure rejects the request', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => null,
    }));

    const estimate = await getEstimate('a combat system with parries');
    expect(estimate.source).toBe('local');
    vi.unstubAllGlobals();
  });

  it('raises broad production work above a single keyword match', () => {
    const e = localEstimate(
      'a production-ready multiplayer vehicle system with mobile and controller support, networking, customization, performance testing, and external api integration'
    );
    expect(['complex', 'xl']).toContain(e.tier);
  });

  it('keeps a basic standalone round system below the medium tier', () => {
    const e = localEstimate('a basic round system');
    expect(e.tier).toBe('standard');
    expect(e.price).toBe('$75 to $140');
  });

  it('allows ai complexity to raise the local estimate', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: JSON.stringify({
          complexity_score: 10,
          time: '2 weeks',
          considerations: ['integration risk'],
        }),
      }),
    }));

    const e = await getEstimate('a basic combat system');
    expect(e.tier).toBe('xl');
    expect(e.price).toBe('$500+');
    vi.unstubAllGlobals();
  });

  it('does not allow ai complexity to lower the local estimate', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: JSON.stringify({
          complexity_score: 0,
          time: '1 hour',
          considerations: ['review networking'],
        }),
      }),
    }));

    const e = await getEstimate('a melee combat system with raycast hits and parry mechanics');
    expect(e.tier).toBe('medium');
    expect(e.price).toBe('$170 to $200');
    vi.unstubAllGlobals();
  });
});
