import React from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  placeholder?: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className,
}) => (
  <input
    className={cn(styles.input, className)}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
  />
);
