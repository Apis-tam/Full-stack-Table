'use client';
import { CellProps, Data } from '@/app/types/data';
import { ChangeEvent, memo, useCallback } from 'react';
import { Input } from '../Input';

type Props = CellProps & {
	isEditble: boolean;
	onChange?: (rowId: string, column: string, value: string) => void;
};
const dateColumns: Partial<keyof Data>[] = ['createdAt', 'updatedAt'];
export const Cell = memo(({ item, rowIndex, cellIndex, isEditble, column, onChange, rowId }: Props) => {
	const hadleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (onChange) {
				onChange(rowId, column, e.target.value);
			}
		},
		[column, onChange, rowId]
	);
	if (isEditble) {
		const value = typeof item === 'string' ? item : item?.toString();
		return (
			<Input
				name={column}
				id={column}
				defaultValue={value}
				onChange={hadleChange}
				key={`${item}-${column}-${rowId}`}
				data-index={`row-${rowIndex}-cell-${cellIndex}`}
				className={`p-1 flex justify-center align-middle rounded border border-transparent  hover:border-amber-300 focus:border-amber-600 ${
					column === 'logText' ? 'col-span-2' : ''
				} ${value ? '' : 'border-b-pink-500'}`}
			/>
		);
	}

	return (
		<div key={`${item}-${column}-${rowId}`} data-index={`row-${rowIndex}-cell-${cellIndex}`} className='p-1 flex  align-middle'>
			{dateColumns.includes(column) ? new Date(item as string).toLocaleDateString() : item}
		</div>
	);
});

Cell.displayName = 'Cell';
