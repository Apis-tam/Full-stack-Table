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

export const getReq = async (params: GetQueryParams): Promise<DataResponse> => {
	const queryParams = new URLSearchParams(params);

	const queryString = queryParams.toString();

	const response = await fetch(`${config.url}?${queryString}`);
	if (!response.ok) {
		errorResponse(response);
	}
	return response.json();
};

export const createReq = async (data: CreatePostData): Promise<DataResponse> => {
	const response = await fetch(config.url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		errorResponse(response);
	}
	return response.json();
};

export const updateReq = async (data: UpdateReqData): Promise<DataResponse> => {
	const response = await fetch(`${config.url}/${data.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		errorResponse(response);
	}
	return response.json();
};

export const deleteReq = async (id: string): Promise<void> => {
	const response = await fetch(`${config.url}/${id}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		errorResponse(response);
	}
};
