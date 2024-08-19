import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const withReactQuery = (Component: React.ReactNode) => {
  return () => (
    <QueryClientProvider client={queryClient}>{Component}</QueryClientProvider>
  );
};

export default withReactQuery;
