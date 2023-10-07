import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Api } from '../../shared/api';
import { InvoiceLink, Tip } from './model';

type UseTipsQueryConfig = {
  options?: Omit<UseQueryOptions<Tip[], Error, Tip[], string[]>, 'queryFn' | 'queryKey'>
};

export const useTipsQuery = ({ options }: UseTipsQueryConfig = {}) => {
  const {
    data, isError, isLoading, refetch, ...rest
  } = useQuery({
    queryKey: ['tips'],
    queryFn: async () => Api.tip.get({ pageNum: 1 }),

    refetchOnWindowFocus: false,
    refetchInterval: 0,

    ...options,
  });

  return {
    fetchTips: refetch,
    tips: data,
    isTipsError: isError,
    isTipsLoading: isLoading,
    ...rest,
  };
};

type UseInvoiceLinkQueryConfig = {
  options?: Omit<UseQueryOptions<InvoiceLink, Error, InvoiceLink, string[]>, 'queryFn' | 'queryKey'>
};

export const useInvoiceLinkQuery = ({ options }: UseInvoiceLinkQueryConfig = {}) => {
  const {
    data, isError, isLoading, refetch, ...rest
  } = useQuery({
    queryKey: ['invoice-link'],
    queryFn: async () => Api.tip.getInvoiceLink({ waiterId: 1, amount: 100 }),

    refetchOnWindowFocus: false,
    refetchInterval: 0,
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
