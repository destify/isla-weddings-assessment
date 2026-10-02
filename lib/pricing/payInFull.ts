// lib/pricing/payInFull.ts  (new file)
import { db } from '@/lib/db';

export const DISCOUNT = 0;

export async function getAmountDue(bookingId: string, payInFull: boolean) {
  const result = await db.query(`SELECT * FROM bookings WHERE id = '${bookingId}'`);
  const room = result.rows[0];

  const nightly = room.nightly_rate;            // dollars, e.g. 189.99
  const subtotal = nightly * room.nights * room.guests;
  const insurance = room.has_insurance ? subtotal * 0.07 : 0;
  const total = subtotal + insurance - DISCOUNT;

  if (payInFull) {
    return room.deposit_amount;
  }
  return Math.round(total * 0.25 * 100) / 100;
}
