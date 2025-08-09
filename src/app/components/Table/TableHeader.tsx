'use client';
import { memo } from 'react';

type Props = {
	columns: string[];
	withEditColumns: boolean;
	className?: string;
};

export const TableHeader = memo(({ columns, withEditColumns, className }: Props) => {
	return (
		<div className={`grid  justify-items-center align-items-center  bg-blue-600 gap-1 ${className} `}>
			{columns.map((column) => (
				<div key={column} className={`p-1 ${column === 'logText' ? 'col-span-2' : ''}`}>
					{column}
				</div>
			))}
			{withEditColumns ? (
				<>
					<div className='p-1  bg-blue-600'></div>
					<div className='p-1  bg-blue-600'></div>
				</>
			) : null}
		</div>
	);
});
TableHeader.displayName = 'TableHeader';
