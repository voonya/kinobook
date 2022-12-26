import Select from 'react-select';
import styles from './styles.module.scss';
import { customStyles } from './custom-styles';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectOption {
  options: Option[];
  label?: string;
  labelRequiredMark?: boolean;
  placeholder?: string;
  noOptionsMessage?: string;
  value?: Option[];
  ref?: any;
  onChange?: (newValue: any) => void;
  error?: string;
}

export const MultiSelect = ({
  options,
  label,
  labelRequiredMark,
  placeholder = '',
  noOptionsMessage,
  value,
  onChange,
  ref,
  error,
}: MultiSelectOption) => (
  <div className={styles.wrapper}>
    <label className={styles.label}>
      {label}
      {labelRequiredMark && <span>*</span>}
    </label>
    <Select
      styles={customStyles}
      closeMenuOnSelect={false}
      isMulti
      placeholder={placeholder}
      noOptionsMessage={() => noOptionsMessage}
      options={options}
      onChange={onChange}
      value={value}
      ref={ref}
    />
    <div className={styles.error}>{error}</div>
  </div>
);
