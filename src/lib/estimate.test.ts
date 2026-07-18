import { describe, it, expect } from 'vitest';
import { localEstimate } from './estimate';

describe('price estimator engine', () => {
  it('prices a simple UI-only spec at the entry tier', () => {
    const e = localEstimate('a shop UI with clean tweening and a settings menu');
    expect(e.tier).toBe('small');
    expect(e.price).toBe('$65 – $125');
    expect(e.time).toBe('2 – 12 hours');
  });

  it('prices a combat system as a medium build', () => {
    const e = localEstimate('a melee combat system with raycast hits and parry mechanics');
    expect(e.tier).toBe('medium');
    expect(e.price).toBe('$225 – $375');
    expect(e.time).toBe('1 – 2 days');
  });

  it('prices a full game backend as the largest tier', () => {
    const e = localEstimate(
      'full game: round-based combat with matchmaking, datastore saving for player profiles, trading, and anti-cheat'
    );
    expect(e.tier).toBe('xl');
    expect(e.price).toBe('$750+');
    expect(e.time).toBe('1 – 2 weeks');
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
});
