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
    expect(terms_version).toBe('1.1');
    expect(terms_effective_date).toBe('21 July 2026');
  });

  it('publishes the minimum commission', () => {
    const payment = terms_sections.find((section) => section.id === 'payment');
    expect(payment?.bullets?.join(' ')).toContain('$10 or 4,000 Robux');
  });

  it('keeps playable access locked until full payment', () => {
    const payment_and_delivery = terms_sections
      .filter((section) => ['payment', 'revision', 'delivery'].includes(section.id))
      .flatMap((section) => section.paragraphs)
      .join(' ')
      .toLowerCase();

    expect(payment_and_delivery).toContain('not access to the test place');
    expect(payment_and_delivery).toContain('only after full cleared payment');
  });
});
