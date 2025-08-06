import { config } from '../../../envConfig';
import { Data, DataResponse } from '../types/data';

type UpdateReqData = {
	id: string;
} & Partial<Omit<Data, 'createdAt' | 'updatedAt'>>;

type CreatePostData = {
	owner: string;
	logText: string;
};

export type GetQueryParams = {
	page: string;
	pageSize?: string;
};
const errorResponse = (res: Response) => {
	throw new Error(`Update request Error: ${res.status}, ${res.statusText}`);
};

const baseHeaders = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''}`,
	credentials: 'include',
};

export const getReq = async (params: GetQueryParams, signal: AbortSignal): Promise<DataResponse> => {
	const queryParams = new URLSearchParams(params);

	const queryString = queryParams.toString();
	try {
		const response = await fetch(`${config.url}/table?${queryString}`, {
			headers: { ...baseHeaders },
			signal,
		});
		if (!response.ok) {
			errorResponse(response);
		}
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const createReq = async (data: CreatePostData): Promise<DataResponse> => {
	try {
		const response = await fetch(`${config.url}/table`, {
			method: 'POST',
			headers: { ...baseHeaders },
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			errorResponse(response);
		}
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const updateReq = async (data: UpdateReqData): Promise<DataResponse> => {
	try {
		const response = await fetch(`${config.url}/table/${data.id}`, {
			method: 'PUT',
			headers: {
				...baseHeaders,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			errorResponse(response);
		}
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const deleteReq = async (id: string): Promise<void> => {
	try {
		const response = await fetch(`${config.url}/table/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			errorResponse(response);
		}
	} catch (error) {
		throw error;
	}
};
