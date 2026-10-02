import { describe, expect, it } from 'vitest';
import { computeQuote, toCents } from '@/lib/pricing/quote';

const base = {
  nights: 5,
  nightly_rate: '189.99',
  has_insurance: true,
  discount_cents: 0,
  deposit_amount: '500.00',
};

describe('toCents', () => {
  it('converts dollar strings to integer cents', () => {
    expect(toCents('189.99')).toBe(18999);
    expect(toCents('0.10')).toBe(10);
  });
});

describe('computeQuote', () => {
  it('prices per room per night and adds insurance', () => {
    const q = computeQuote(base);
    expect(q.subtotalCents).toBe(94995);
    expect(q.insuranceCents).toBe(6650);
    expect(q.totalCents).toBe(101645);
  });

  it('applies the promo discount', () => {
    expect(computeQuote({ ...base, discount_cents: 5000 }).totalCents).toBe(96645);
  });

  it('uses the contracted deposit, capped at the total', () => {
    expect(computeQuote(base).depositCents).toBe(50000);
    expect(computeQuote({ ...base, nights: 1, has_insurance: false, deposit_amount: '500.00' }).depositCents).toBe(18999);
  });
});
