'use client';

import { TablePage } from '@/app/TablePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer, Flip } from 'react-toastify';
import ErrorBoundary from '../ErrorBaudary';

const ClientPage = () => {
	const queryClient = new QueryClient();
	return (
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
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
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ErrorBoundary>
	);
};

export default ClientPage;
