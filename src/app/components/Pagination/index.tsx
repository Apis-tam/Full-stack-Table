'use client';
import React from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxPagesToShow = 5;
		const halfRange = Math.floor(maxPagesToShow / 2);

		let startPage = Math.max(1, currentPage - halfRange);
		const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

		if (endPage - startPage + 1 < maxPagesToShow) {
			startPage = Math.max(1, endPage - maxPagesToShow + 1);
		}

		if (startPage > 1) {
			pages.push(1);
			if (startPage > 2) pages.push('...');
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	};

	const handlePageChange = (page: number | string) => {
		if (typeof page === 'number') {
			onPageChange(page);
		}
	};

	return (
		<nav className='flex items-center justify-center space-x-2 my-4'>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='px-3 py-1 rounded-md bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200'
			>
				Previous
			</button>

			{getPageNumbers().map((page, index) => (
				<button
					key={index}
					onClick={() => handlePageChange(page)}
					disabled={page === '...' || page === currentPage}
					className={`px-3 py-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${
						page === '...' ? 'cursor-default' : ''
					}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='px-3 py-1 rounded-md bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200'
			>
				Next
			</button>
		</nav>
	);
};
