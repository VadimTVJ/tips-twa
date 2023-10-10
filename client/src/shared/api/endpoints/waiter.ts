import { axiosInstance } from '../instance';
import { ApiWaiter } from '../entities';

type GetWaiterByIdMethodParams = {
  waiterId: ApiWaiter['id'];
};

export const getById = (params: GetWaiterByIdMethodParams) => {
  return axiosInstance.post<never, ApiWaiter>('waiter.getById', params);
};
