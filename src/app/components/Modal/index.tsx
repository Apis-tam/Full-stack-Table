import React, { useRef } from 'react';
import { Button } from '../Button';
import { createPortal } from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	children?: React.ReactNode;
	confirmButtonText?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, onConfirm, confirmButtonText = 'Yes' }) => {
	const container = useRef<HTMLElement>(null);
	if (!isOpen) return null;
	if (document.getElementById('portal')) {
		container.current = document.getElementById('portal');
	} else {
		const portalContainer = document.createElement('div');
		document.body.append(portalContainer);
		portalContainer.id = 'portal';
		container.current = portalContainer;
	}

	return (
		container.current &&
		createPortal(
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50'>
				<div className='bg-gray-800 rounded-lg shadow-xl max-w-lg w-full m-4'>
					<div className='flex justify-between items-center p-4 border-b'>
						{title && <h2 className='text-xl font-semibold text-gray-200'>{title}</h2>}
						<Button aria-label='Close modal' className='text-gray-500 hover:text-gray-700 focus:outline-none' onClick={onClose}>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
						</Button>
					</div>
					{children ? <div className='p-4'>{children}</div> : null}
					<div className='flex p-4 border-t gap-2'>
						<Button onClick={onConfirm} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
							{confirmButtonText}
						</Button>
						<Button onClick={onClose} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
							Close
						</Button>
					</div>
				</div>
			</div>,
			container.current
		)
	);
};
