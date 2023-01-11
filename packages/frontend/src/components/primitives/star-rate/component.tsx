import { useState } from 'react';
import { Icon, IconName } from '../icon';
import styles from './styles.module.scss';

interface IStarRateProps {
  value: number;
  editable?: boolean;
  size?: 'md' | 'lg' | 'xs';
  onChange?: (rate: number) => void;
}

export const StarRate = ({
  value,
  editable = false,
  size = 'md',
  onChange,
}: IStarRateProps) => {
  const roundedRate = Math.round(value);
  const [rateStar, setRateStar] = useState(roundedRate);

  const onStarClick = (index: number) => {
    if (!editable) return;
    setRateStar(index + 1);
    onChange?.(index + 1);
  };
  console.log(roundedRate);

  return (
    <div className={styles.wrapper}>
      {[...Array(5)].map((el, i) => (
        <button
          key={`${el}` + `${i}`}
          type={'button'}
          className={editable ? styles.editable : ''}
          onClick={() => onStarClick(i)}
        >
          <Icon
            size={size}
            name={i + 1 > rateStar ? IconName.STAR : IconName.STAR_FILLED}
          />
        </button>
      ))}
    </div>
  );
};
