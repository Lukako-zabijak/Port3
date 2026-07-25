import { describe, expect, it } from 'vitest';
import { estimate_elaboration_message, validate_estimate_spec } from './estimate-guard';

describe('estimate specification guard', () => {
  it.each([',', '...', 'hello there', 'aaaa aaaa', 'ui'])('rejects a vague input: %s', (spec) => {
    expect(validate_estimate_spec(spec)).toBe(estimate_elaboration_message);
  });

  it('accepts a concise but meaningful system request', () => {
    expect(validate_estimate_spec('a combat system with parries')).toBeNull();
  });

  it('accepts a detailed custom-system request', () => {
    expect(validate_estimate_spec('a vehicle garage with saving and upgrades')).toBeNull();
  });
});
