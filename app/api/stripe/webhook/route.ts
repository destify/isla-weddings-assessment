// app/api/stripe/webhook/route.ts  (modified)
import { db } from '@/lib/db';
import { crm } from '@/lib/crm';

export async function POST(req: Request) {
  const event = await req.json();
  console.log('stripe event', JSON.stringify(event));

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    await crm.recordPayment({
      bookingId: pi.metadata.bookingId,
      amount: pi.amount / 100,
    });
    await db.query(`UPDATE bookings SET status = 'paid' WHERE id = '${pi.metadata.bookingId}'`);
  }
  return new Response('ok');
}
