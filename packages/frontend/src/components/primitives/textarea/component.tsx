import React from 'react';
import type { IconName } from '@components';
import { Icon } from '@components';
import styles from './styles.module.scss';

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  placeholder?: string;
  labelRequiredMark?: boolean;
  label?: string;
  error?: string;
  icon?: IconName;
  accept?: string;
  onIconClick?: () => void;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      labelRequiredMark,
      icon,
      onIconClick,
      error,
      ...props
    }: TextAreaProps,
    ref,
  ) => (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}
        {labelRequiredMark && <span>*</span>}
      </label>
      <div className={styles.inner}>
        <textarea ref={ref} {...props} />
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
