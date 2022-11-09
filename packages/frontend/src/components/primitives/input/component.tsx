import React from 'react';
import type { IconName } from '@components';
import { Icon } from '@components';
import styles from './styles.module.scss';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  type?: 'text' | 'number' | 'password';
  placeholder?: string;
  labelRequiredMark?: boolean;
  label?: string;
  error?: string;
  icon?: IconName;
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
        <input ref={ref} type={type} placeholder="myInput" {...props} />
        {icon && (
          <span className="icon" onClick={() => onIconClick?.()}>
            <Icon name={icon} />
          </span>
        )}
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  ),
);
