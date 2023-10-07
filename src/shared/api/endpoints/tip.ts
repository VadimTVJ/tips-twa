import { axiosInstance } from '../instance';
import { ApiInvoiceLink, ApiTip } from '../entities';

type GetMethodParams = {
  pageNum: number;
};

export const get = (params: GetMethodParams) => {
  return axiosInstance.post<never, ApiTip[]>('tip.get', params);
};

type GetInvoiceLinkMethodParams = {
  waiterId: number;
  amount: number;
};

export const getInvoiceLink = (params: GetInvoiceLinkMethodParams) => {
  return axiosInstance.post<never, ApiInvoiceLink>('tip.getInvoiceLink', params);
};
