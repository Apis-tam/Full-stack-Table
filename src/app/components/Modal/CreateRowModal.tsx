'use client';
import { useCallback, useRef, useState } from 'react';
import { Input } from '../Input';
import { Modal } from './index';

export type ConfirmParams = { owner: string; logText: string };
export type RequiredFields = { owner: boolean; logText: boolean };

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: ({ owner, logText }: ConfirmParams) => void;
  title?: string;
};
export const CreateRowModal = ({ onClose, isOpen, onConfirm, title = 'Create new row' }: Props) => {
  const [required, setRequired] = useState<RequiredFields>({
    owner: false,
    logText: false,
  });
  const owner = useRef<HTMLInputElement>(null);
  const logText = useRef<HTMLInputElement>(null);
  const handleConfirm = useCallback(() => {
    if (owner.current?.value && logText.current?.value) {
      onConfirm({ owner: owner.current.value, logText: logText.current.value });
      setRequired({ owner: false, logText: false });
      return;
    }
    setRequired({
      owner: !owner.current?.value,
      logText: !logText.current?.value,
    });
  }, [onConfirm]);
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose} onConfirm={handleConfirm}>
      <div className="flex flex-col gap-2">
        <label className=" colorcaret-black">
          Owner:
          <Input ref={owner} required={required.owner} className="caret-black bg-gray-600" />
        </label>
        <label className="caret-black">
          Log Text:
          <Input ref={logText} required={required.logText} className="caret-black bg-gray-600" />
        </label>
      </div>
    </Modal>
  );
};
