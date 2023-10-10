import { axiosInstance } from '../instance';
import { ApiInvoiceLink, ApiTip, ApiWaiter } from '../entities';

export const get = () => {
  return axiosInstance.post<never, ApiTip[]>('tip.get');
};

type GetInvoiceLinkMethodParams = {
  waiterId: ApiWaiter['id'];
  tipsAmount: number;
  currency: string;
};

export const getInvoiceLink = (params: GetInvoiceLinkMethodParams) => {
  return axiosInstance.post<never, ApiInvoiceLink>('tip.getInvoiceLink', params);
};
