import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo } from 'react';

type Props = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	className?: string;
	dataIndex?: string;
	required?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = memo(({ onChange, value, className, dataIndex, required, ...rest }: Props) => {
	return (
		<input
			{...rest}
			required={required}
			value={value}
			onChange={onChange}
			data-index={dataIndex}
			className={`p-1 flex justify-center align-middle rounded border border-transparent  hover:border-amber-300 focus:border-amber-600	${className} ${
				required ? 'border-b-red-600' : ''
			} `}
		/>
	);
});
Input.displayName = 'Input';
