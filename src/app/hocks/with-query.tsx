import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ComponentType } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,

      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
  },
});

export const withQuery = (Component: ComponentType) => () => (
  <QueryClientProvider
    client={queryClient}
  >
    <ReactQueryDevtools />
    <Component />
  </QueryClientProvider>
);
