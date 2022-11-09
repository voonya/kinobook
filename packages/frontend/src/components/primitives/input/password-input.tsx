import { useState } from 'react';
import React from 'react';
import { IconName, Icon } from '@components';
import styles from './styles.module.scss';

interface PasswordInputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  labelRequiredMark?: boolean;
  label?: string;
  error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { label, labelRequiredMark, type, error, ...props }: PasswordInputProps,
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const passwordIcon = passwordVisible ? IconName.EYE : IconName.EYE_SLASHED;

    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>
          {label}
          {labelRequiredMark && <span>*</span>}
        </label>
        <div className={styles.inner}>
          <input ref={ref} type={type} placeholder="myInput" {...props} />
          <span
            className="icon"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon name={passwordIcon} />
          </span>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    );
  },
);

export { PasswordInput };
