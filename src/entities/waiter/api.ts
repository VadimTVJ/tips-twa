import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Api } from '../../shared/api';
import { Waiter } from './model';

type UseWaiterByIdQueryConfig = {
  params: { waiterId: Waiter['id'] },
  options?: Omit<UseQueryOptions<Waiter | null, AxiosError, Waiter | null, string[]>, 'queryFn' | 'queryKey'>
};

export const useWaiterByIdQuery = ({ options, params }: UseWaiterByIdQueryConfig) => {
  const {
    data, isError, isLoading, refetch, fetchStatus, ...rest
  } = useQuery({
    queryKey: ['waiter'],
    queryFn: async () => {
      if (!params.waiterId) {
        return Promise.resolve(null);
      }

      return Api.waiter.getById(params!);
    },
    enabled: false,
    cacheTime: 0,
    ...options,
  });

  return {
    fetchWaiter: refetch,
    waiterFetchStatus: fetchStatus,
    waiter: data,
    isWaiterError: isError,
    isWaiterLoading: isLoading,
    ...rest,
  };
};
