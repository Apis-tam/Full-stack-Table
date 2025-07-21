import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createReq, deleteReq, getReq, updateReq } from '../services/table.service';
import { toast } from 'react-toastify';
import { Data } from '../types/data';
import { useMemo, useState } from 'react';

type CreateReqParams = Parameters<typeof createReq>;
type DeleteReqParams = Parameters<typeof deleteReq>;
type UpdateReqParams = Parameters<typeof updateReq>;

export const useTableData = () => {
	const queryClient = useQueryClient();
	const [data, setData] = useState<Data[]>([]);
	const [currentPage, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const params = {
		page: currentPage.toString(),
	};

	const {
		data: fetchData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['data', currentPage],
		queryFn: () => getReq(params),
	});

	const createData = useMutation({
		mutationFn: (...args: CreateReqParams) => createReq(...args),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['data'] });

			toast('Row Created', { delay: 2000, type: 'success' });
		},
		onError(error) {
			toast('Error: ' + error.message, { delay: 2000, type: 'error' });
		},
	});

	useMemo(() => {
		if (fetchData) {
			setData(fetchData.data.result);
			setTotalPages(Math.max(1, Math.ceil(fetchData.data.total / fetchData.data.pageSize)));
			setPage(Number(fetchData.data.page));
		}
	}, [fetchData]);

	const updateData = useMutation({
		mutationFn: (...args: UpdateReqParams) => updateReq(...args),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['data'] });
			toast('Row Updated', { delay: 2000, type: 'success' });
		},
		onError(error) {
			toast('Error: ' + error.message, { delay: 2000, type: 'error' });
		},
	});

	const deleteData = useMutation({
		mutationFn: (...args: DeleteReqParams) => deleteReq(...args),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['data'] });
			toast('Row Deleted', { delay: 2000, type: 'success' });
		},
		onError(error) {
			toast('Error: ' + error.message, { delay: 2000, type: 'error' });
		},
	});

	return {
		currentPage,
		setPage,
		totalPages,
		data,
		isLoading: isLoading || updateData.isPending || createData.isPending || deleteData.isPending,
		isError: error || createData.error || deleteData.error || updateData.error,
		update: updateData.mutate,
		create: createData.mutate,
		deleteReq: deleteData.mutate,
	};
};
