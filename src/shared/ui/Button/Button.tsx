import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  type = 'button',
  disabled = false,
}) => (
  <button
    className={cn(styles.button, className)}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);
