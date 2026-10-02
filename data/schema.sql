-- Isla Weddings booking data (simplified). Postgres dialect.

CREATE TABLE bookings (
  id             TEXT PRIMARY KEY,
  group_id       TEXT NOT NULL,
  guest_email    TEXT NOT NULL,
  nights         INTEGER NOT NULL,
  guests         INTEGER NOT NULL,
  nightly_rate   NUMERIC(10,2) NOT NULL,     -- dollars, per room per night
  has_insurance  BOOLEAN NOT NULL DEFAULT FALSE,
  discount_cents INTEGER NOT NULL DEFAULT 0, -- promo discount on the stay
  deposit_amount NUMERIC(10,2) NOT NULL,     -- dollars, set by the group contract
  payment_mode   TEXT NOT NULL,              -- 'deposit' or 'full', chosen at checkout
  status         TEXT NOT NULL,              -- 'pending', 'confirmed', 'paid', 'cancelled'
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The quote the guest saw and accepted at checkout, persisted at that moment.
CREATE TABLE quotes (
  booking_id    TEXT PRIMARY KEY REFERENCES bookings(id),
  total_cents   INTEGER NOT NULL,
  deposit_cents INTEGER NOT NULL,
  accepted_at   TIMESTAMPTZ NOT NULL
);

-- Charges as reported by Stripe (one row per PaymentIntent outcome).
CREATE TABLE stripe_charges (
  id           TEXT PRIMARY KEY,
  booking_id   TEXT NOT NULL REFERENCES bookings(id),
  amount_cents INTEGER NOT NULL,
  status       TEXT NOT NULL,                -- 'succeeded', 'failed', 'refunded'
  created_at   TIMESTAMPTZ NOT NULL
);

-- Payments as recorded in the legacy CRM by the webhook (amounts in dollars).
CREATE TABLE crm_payments (
  id          SERIAL PRIMARY KEY,
  booking_id  TEXT NOT NULL,
  amount      NUMERIC(10,2) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL
);
