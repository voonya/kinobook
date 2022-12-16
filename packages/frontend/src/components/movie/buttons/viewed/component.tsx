import type { IconSize } from '@components';
import { IconButton, IconName } from '@components';
import styles from './styles.module.scss';

interface ViewedButtonProps {
  viewed: boolean;
  size?: IconSize;
  onClick?: () => void;
}

const ViewedButton = ({ viewed, size = 'lg', onClick }: ViewedButtonProps) => (
  <div className={`${styles.wrapper} ${viewed ? styles.viewed : ''}`}>
    <IconButton style={{}} onClick={onClick} size={size} icon={IconName.EYE} />
  </div>
);

export { ViewedButton };
