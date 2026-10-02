// Client for the legacy CRM (system of record for payments today).
// Stubbed for this exercise: records calls in memory instead of calling the CRM API.
export interface CrmPayment {
  bookingId: string;
  amount: number;
}

export const recorded: CrmPayment[] = [];

export const crm = {
  async recordPayment(payment: CrmPayment): Promise<void> {
    recorded.push(payment);
  },
};
