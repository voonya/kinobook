import type { IconName, IconSize } from '@components';
import { Icon } from '@components';
import styles from './styles.module.scss';

interface IconButtonProps {
  icon: IconName;
  size?: IconSize;
  onClick: () => void;
  style?: React.CSSProperties;
}

const IconButton = ({ icon, size = 'sm', onClick, style }: IconButtonProps) => (
  <button
    onClick={onClick}
    className={styles.button}
    style={style}
    data-size={size}
  >
    <Icon size={size} name={icon} />
  </button>
);

export { IconButton };
