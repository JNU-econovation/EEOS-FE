"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Provider = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        useErrorBoundary: true,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="light"
        pauseOnFocusLoss={false}
      />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
