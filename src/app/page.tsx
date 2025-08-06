'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TablePage } from './TablePage';
import { Flip, ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/ErrorBaudary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function Home() {
	return (
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
					<main className='flex flex-col w-[100%] gap-[32px] row-start-2 items-center sm:items-start'>
						<TablePage />
					</main>
					<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
						<ToastContainer
							position='bottom-right'
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick={false}
							rtl={false}
							pauseOnFocusLoss
							pauseOnHover
							theme='light'
							transition={Flip}
						/>
					</footer>
				</div>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ErrorBoundary>
	);
}
