'use client';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

type Props = { onClick?: () => void; className?: string; children: ReactNode; disabled?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo(({ onClick, className, children, disabled, ...arg }: Props) => {
	return (
		<button
			{...arg}
			disabled={disabled}
			onClick={onClick}
			className={`p-1  rounded border-0 hover:bg-blue-300 focus:border-b-fuchsia-500  ${className} ${disabled ? 'bg-gray-200 text-black' : ''}`}
		>
			{children}
		</button>
	);
});
Button.displayName = 'Button';
