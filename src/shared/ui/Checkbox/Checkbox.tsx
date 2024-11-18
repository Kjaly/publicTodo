import React from 'react';
import styles from './Checkbox.module.scss';
import cn from 'classnames';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  className,
}) => (
  <label className={cn(styles.checkbox, className)}>
    <input checked={checked} type="checkbox" onChange={onChange} />
    {label && <span className={styles.label}>{label}</span>}
  </label>
);
