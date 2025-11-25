import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

export default function QuryCacheClientProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
