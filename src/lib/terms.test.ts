import { describe, expect, it } from 'vitest';
import { terms_effective_date, terms_sections, terms_version } from './terms';

describe('terms content', () => {
  it('keeps all numbered clauses in order', () => {
    expect(terms_sections).toHaveLength(14);
    expect(terms_sections.map((section) => section.number)).toEqual(
      Array.from({ length: 14 }, (_, index) => String(index + 1).padStart(2, '0'))
    );
  });

  it('uses unique stable anchor ids', () => {
    const ids = terms_sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => /^[a-z][a-z-]*$/.test(id))).toBe(true);
  });

  it('publishes the approved version and effective date', () => {
    expect(terms_version).toBe('1.0');
    expect(terms_effective_date).toBe('18 July 2026');
  });
});
