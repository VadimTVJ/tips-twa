import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ComponentType } from 'react';

const queryClient = new QueryClient();

export const withQuery = (Component: ComponentType) => () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <Component />
  </QueryClientProvider>
);
