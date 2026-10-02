// Row shape of the `bookings` table (see data/schema.sql).
// Postgres NUMERIC columns arrive from the driver as strings.
export interface BookingRow {
  id: string;
  group_id: string;
  guest_email: string;
  nights: number;
  guests: number;
  nightly_rate: string; // NUMERIC(10,2), dollars, per room per night
  has_insurance: boolean;
  discount_cents: number; // promo discount applied to the stay
  deposit_amount: string; // NUMERIC(10,2), dollars, set by the group contract
  payment_mode: 'deposit' | 'full';
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled';
  created_at: string;
}
