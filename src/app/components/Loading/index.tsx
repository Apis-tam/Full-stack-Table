'use client';
import React from 'react';

interface LoadingProps {
	size?: 'sm' | 'md' | 'lg';
	color?: 'blue' | 'gray' | 'red';
}

export const Loading = ({ size = 'md', color = 'blue' }: LoadingProps) => {
	const sizeClasses = {
		sm: 'w-6 h-6',
		md: 'w-12 h-12',
		lg: 'w-16 h-16',
	}[size];

	const colorClasses = {
		blue: 'border-blue-500 border-t-transparent',
		gray: 'border-gray-500 border-t-transparent',
		red: 'border-red-500 border-t-transparent',
	}[color];

	return (
		<div className='flex justify-center items-center w-[100%] h-[100%]'>
			<div className={`animate-spin rounded-full border-4 ${sizeClasses} ${colorClasses} rounded-t-5 rounded-b-5`}></div>
		</div>
	);
};
