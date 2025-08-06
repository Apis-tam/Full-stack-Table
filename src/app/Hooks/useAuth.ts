'use client';
import { useMutation } from '@tanstack/react-query';
import { useState, useActionState } from 'react';
import { createUser, signInReq } from '../services/user.service';
import { User } from '../types/data';
import { useRouter } from 'next/navigation';

type FromType = { email: string; password: string; userName: string };
type CreateUserParams = Parameters<typeof createUser>;
type SignInUserParams = Parameters<typeof signInReq>;
export type TabParam = 'signin' | 'signup';

export const useAuth = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<TabParam>('signin');
	const [requeredFields, setRequeredFilds] = useState<Partial<User> | Record<keyof User, boolean>>({ userName: true, email: true, password: true });

	const create = useMutation({
		mutationFn: (...arg: CreateUserParams) => createUser(...arg),
		onSuccess: (res) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('accessToken', res.data.accessToken);
				//	localStorage.setItem('refreshToken', data.refreshToken);
			}
		},
	});

	const signIn = useMutation({
		mutationFn: (...arg: SignInUserParams) => signInReq(...arg),
		onSuccess: (res) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('accessToken', res.data.accessToken);
				//	localStorage.setItem('refreshToken', data.refreshToken);
			}
			if (res.status === 'success') {
				router.push('/');
			}
		},
	});

	const handler = (prevState: FromType, formData: FormData) => {
		const data = {
			userName: formData.get('userName')?.toString(),
			email: formData.get('email')?.toString(),
			password: formData.get('password')?.toString(),
		};
		setRequeredFilds(data);

		if (activeTab === 'signin' && data.email && data.password) {
			signIn.mutate({ email: data.email, password: data.password });
		}

		if (data.email && data.password && data.userName) {
			create.mutate({ email: data.email, password: data.password, userName: data.userName });
		}

		return prevState;
	};
	const [state, formAction, isPending] = useActionState<FromType, FormData>(handler, {
		email: '',
		password: '',
		userName: '',
	});

	return { state, formAction, isPending, requeredFields, setActiveTab, activeTab };
};
