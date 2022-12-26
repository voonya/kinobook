import React from 'react';
import type { IconName } from '@components';
import { Icon } from '@components';
import styles from './styles.module.scss';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'date'
    | 'file'
    | 'range'
    | 'checkbox';
  placeholder?: string;
  labelRequiredMark?: boolean;
  label?: string;
  error?: string;
  errorBlock?: boolean;
  icon?: IconName;
  color?: 'dark' | 'lightdark';
  accept?: string;
  onIconClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelRequiredMark,
      type = 'text',
      icon,
      onIconClick,
      error,
      color = 'lightdark',
      errorBlock = true,
      ...props
    }: InputProps,
    ref,
  ) => (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}
        {labelRequiredMark && <span>*</span>}
      </label>
      <div className={styles.inner}>
        <input ref={ref} type={type} {...props} data-bgcolor={color} />
        {icon && (
          <span className="icon" onClick={() => onIconClick?.()}>
            <Icon name={icon} />
          </span>
        )}
      </div>
      {errorBlock && <div className={styles.error}>{error}</div>}
    </div>
  ),
);
