'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from './SignIn';

export default function Auth() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SignIn />
    </QueryClientProvider>
  );
}
