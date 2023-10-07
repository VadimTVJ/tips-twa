export type ApiTip = {
  id: number;
  create_date: string;
  waiter: {
    name: string;
    photo: string;
    restaurant: string;
  };
  amount: number;
};

export type ApiInvoiceLink = string;
