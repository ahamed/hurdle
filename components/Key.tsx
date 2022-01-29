import React from 'react';
import { ButtonSize, ButtonTypes } from '../types.d';
import Button from './Button';

interface KeyProps {
  children?: React.ReactNode;
  value: string;
  onClick: (value: string) => void;
  type?: ButtonTypes;
  ref?: React.Ref<HTMLButtonElement>;
}

const Key = ({ children, onClick, value, type = ButtonTypes.secondary, ref }: KeyProps) => {
  return (
    <Button type={type} size={ButtonSize.large} onClick={() => onClick(value)} ref={ref}>
      {children || value.toUpperCase()}
    </Button>
  );
};

export default Key;
