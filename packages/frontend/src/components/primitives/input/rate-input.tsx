import React from 'react';
import { StarRate } from '@components';
import styles from './styles.module.scss';

interface IRateInputProps {
  placeholder?: string;
  labelRequiredMark?: boolean;
  label?: string;
  error?: string;
  errorBlock?: boolean;
  onChange?: (rate: number) => void;
  value: number;
}

export const RateInput = ({
  label,
  labelRequiredMark,
  error,
  errorBlock = true,
  onChange,
  value,
}: IRateInputProps) => (
  <div className={styles.wrapper}>
    <label className={styles.label}>
      {label}
      {labelRequiredMark && <span>*</span>}
    </label>
    <div className={styles.starInput}>
      <StarRate value={value} onChange={onChange} editable={true} />
    </div>
    {errorBlock && <div className={styles.error}>{error}</div>}
  </div>
);
