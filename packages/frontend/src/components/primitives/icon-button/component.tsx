import type { IconName, IconSize } from '@components';
import { Icon } from '@components';
import styles from './styles.module.scss';

interface IconButtonProps {
  icon: IconName;
  size?: IconSize;
  onClick?: () => void;
  style?: React.CSSProperties;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
}

const IconButton = ({
  icon,
  size = 'sm',
  onClick,
  style,
  color = 'primary',
}: IconButtonProps) => (
  <button
    onClick={onClick}
    className={styles.button}
    style={style}
    data-size={size}
    data-color={color}
    type="button"
  >
    <Icon size={size} name={icon} />
  </button>
);

export { IconButton };
