import { ReactNode } from 'react';

export type DataResponse = {
	message: string;
	status: string;
	data: {
		page: string;
		pageSize: 10;
		result: Data[];
		total: number;
	};
};

export type Data = {
	id: string;
	owner: string;
	createdAt: string;
	updatedAt: string;
	logText: string;
};

export type CellProps = { item: ReactNode; column: keyof Data; rowIndex: number; cellIndex: number; rowId: string };
