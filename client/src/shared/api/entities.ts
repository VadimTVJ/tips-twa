export type ApiWaiter = {
  id: number;
  name: string;
  photo: string;
  restaurant: string;
};

export type ApiTip = {
  id: number;
  create_date: string;
  waiter: ApiWaiter;
  amount: number;
  currency: string;
};

export type ApiInvoiceLink = string;
