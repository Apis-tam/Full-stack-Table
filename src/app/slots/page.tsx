'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Lobby } from './Lobby';

export default function Auth() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Lobby />
    </QueryClientProvider>
  );
}
