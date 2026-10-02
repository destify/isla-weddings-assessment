// The quote shown to guests on the room page and accepted at checkout.
// All amounts are integer cents.
import { INSURANCE_RATE } from '@/lib/pricing/config';
import type { BookingRow } from '@/lib/types';

export interface Quote {
  subtotalCents: number;
  insuranceCents: number;
  discountCents: number;
  totalCents: number;
  depositCents: number;
}

export function toCents(dollars: string | number): number {
  return Math.round(Number(dollars) * 100);
}

export type QuoteInput = Pick<
  BookingRow,
  'nights' | 'nightly_rate' | 'has_insurance' | 'discount_cents' | 'deposit_amount'
>;

export function computeQuote(booking: QuoteInput): Quote {
  // Rates are per room per night, regardless of how many guests share the room.
  const subtotalCents = toCents(booking.nightly_rate) * booking.nights;
  const insuranceCents = booking.has_insurance ? Math.round(subtotalCents * INSURANCE_RATE) : 0;
  const discountCents = booking.discount_cents;
  const totalCents = subtotalCents + insuranceCents - discountCents;
  // The deposit is fixed by the group contract, not derived from the total.
  const depositCents = Math.min(toCents(booking.deposit_amount), totalCents);
  return { subtotalCents, insuranceCents, discountCents, totalCents, depositCents };
}
