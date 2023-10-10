import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Api } from '../../shared/api';
import { InvoiceLink, Tip } from './model';

type UseTipsQueryConfig = {
  options?: Omit<UseQueryOptions<Tip[], AxiosError, Tip[], string[]>, 'queryFn' | 'queryKey'>
};

export const useTipsQuery = ({ options }: UseTipsQueryConfig = {}) => {
  const {
    data, isError, isLoading, refetch, ...rest
  } = useQuery({
    queryKey: ['tips'],
    queryFn: async () => Api.tip.get(),

    ...options,
  });

  const hasTips = rest.isFetched && data && data?.length > 0;

  return {
    fetchTips: refetch,
    tips: data,
    isTipsError: isError,
    isTipsLoading: isLoading,
    hasTips,
    ...rest,
  };
};

type UseInvoiceLinkQueryConfig = {
  params: {
    waiterId: number;
    tipsAmount: number;
    currency: string;
  };
  options?: Omit<UseQueryOptions<InvoiceLink, AxiosError, InvoiceLink, string[]>, 'queryFn' | 'queryKey'>;
};

export const useInvoiceLinkQuery = ({ options, params }: UseInvoiceLinkQueryConfig) => {
  const {
    data, isError, isLoading, refetch, ...rest
  } = useQuery({
    queryKey: ['invoice-link'],
    queryFn: async () => Api.tip.getInvoiceLink(params),
    enabled: false,

    ...options,
  });

  return {
    fetchInvoiceLink: refetch,
    invoiceLink: data,
    isInvoiceLinkError: isError,
    isInvoiceLinkLoading: isLoading,
    ...rest,
  };
};
