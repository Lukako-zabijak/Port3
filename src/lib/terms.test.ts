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
    expect(terms_version).toBe('1.4');
    expect(terms_effective_date).toBe('5 October 2026');
  });

  it('uses hourly or budget billing without preset project prices', () => {
    const payment = terms_sections.find((section) => section.id === 'payment');
    const copy = payment?.bullets?.join(' ') ?? '';
    expect(copy).toContain('$27 USD per hour');
    expect(copy).toContain('fits your budget');
    expect(copy).not.toMatch(/minimum commission|55,000|135,000|270,000/);
  });

  it('accepts payment through robux gamepasses or paypal', () => {
    const payment = terms_sections.find((section) => section.id === 'payment');
    const copy = [...(payment?.paragraphs ?? []), ...(payment?.bullets ?? [])].join(' ');
    expect(copy).toContain('Robux');
    expect(copy).toContain('gamepasses');
    expect(copy).toMatch(/paypal/i);
  });

  it('allows portfolio use by default with an explicit opt-out and confidentiality limits', () => {
    const copy = terms_sections.find((section) => section.id === 'confidentiality')?.paragraphs.join(' ') ?? '';
    expect(copy).toContain('do not need to ask for separate approval');
    expect(copy).toContain('You may prohibit or limit portfolio use');
    expect(copy).toContain('does not override an NDA');
    expect(copy).toContain('third-party rights');
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
