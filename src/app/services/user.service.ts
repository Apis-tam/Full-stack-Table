'use client';
import { config } from '../../../envConfig';
import { ApiError, AuthUserResponse, User } from '../types/data';

export const createUser = async (user: User): Promise<AuthUserResponse> => {
	try {
		const res = await fetch(`${config.url}/auth/create`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		return res.json();
	} catch (err) {
		console.error(err);
		throw Error((err as ApiError).message);
	}
};

export const signInReq = async (user: Omit<User, 'userName'>): Promise<AuthUserResponse> => {
	try {
		const res = await fetch(`${config.url}/auth`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		return res.json();
	} catch (err) {
		console.error(err);
		throw Error((err as ApiError).message);
	}
};
