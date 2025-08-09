'use client';
import { useState, useCallback, useReducer } from 'react';
import { Cell } from './components/Cell';
import { Loading } from './components/Loading';
import { Table } from './components/Table';
import { useTableData } from './hooks/useTableReqests';

import { Data } from './types/data';
import { Button } from './components/Button';
import { Pagination } from './components/Pagination';
import { toast } from 'react-toastify';
import { Modal } from './components/Modal';
import { ConfirmParams, CreateRowModal } from './components/Modal/CreateRowModal';

const editbleColums: Partial<keyof Data>[] = ['logText', 'owner'];
export const TablePage = () => {
	const { data, isLoading, update, create, deleteReq, currentPage, setPage, totalPages } = useTableData();
	const [isOpenAddModal, toggleAddModal] = useReducer((prev) => !prev, false);
	const [editRow, setEditRow] = useState<Data | null>(null);
	const [deletedId, setDeletedId] = useState('');

	const onEdit = useCallback(
		(rowId: string, column: string, value: string) => {
			if (editRow && editRow.id === rowId) {
				setEditRow((prev) => {
					return prev ? { ...prev, [column]: value, id: rowId } : prev;
				});
				return;
			}
			const updateData = { ...data.find((row) => row.id === rowId)!, [column]: value };
			setEditRow(updateData);
		},
		[data, editRow]
	);

	const onSave = useCallback(
		(id: string) => {
			if (editRow && editRow.id === id) {
				update(editRow);
				setEditRow(null);
				return;
			}
			toast('Nothing save at this row', { type: 'info', delay: 2000 });
		},
		[editRow, update]
	);

	const addRow = useCallback(
		(data: ConfirmParams) => {
			create(data);
			toggleAddModal();
		},
		[create]
	);
	return (
		<>
			<div className='flex justify-end  items-center p-2 mb-3 w-[100%]'>
				<p className='h-4 ml-2 mr-2'>Create new Row :</p>
				<Button className=' bg-emerald-600' onClick={toggleAddModal}>
					Create
				</Button>
			</div>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Table
						data={data}
						actionSlots={(row) => {
							return (
								<div className='w-[100%] flex justify-around'>
									<Button className='bg-orange-500 rounded-t-5 rounded-b-5' onClick={() => setDeletedId(row.id)}>
										Delete
									</Button>
									<Button disabled={row.id !== editRow?.id} onClick={() => onSave(row.id)} className={'bg-emerald-400 rounded-t-5 rounded-b-5'}>
										Save
									</Button>
								</div>
							);
						}}
						cell={({ item, column, rowIndex, cellIndex, rowId }) => {
							return (
								<Cell
									key={`${item}-${column}`}
									column={column}
									item={item}
									rowIndex={rowIndex}
									cellIndex={cellIndex}
									isEditble={editbleColums.includes(column)}
									rowId={rowId}
									onChange={onEdit}
								/>
							);
						}}
					/>
					<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
					<Modal
						onConfirm={() => {
							deleteReq(deletedId);
							setDeletedId('');
						}}
						title='Are you sure, remove this row?'
						isOpen={!!deletedId}
						onClose={() => setDeletedId('')}
					></Modal>
					<CreateRowModal onConfirm={addRow} title='Are you sure, remove this row?' isOpen={isOpenAddModal} onClose={toggleAddModal} />
				</>
			)}
		</>
	);
};
