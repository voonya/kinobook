import type { IconSize } from '@components';
import { IconButton, IconName } from '@components';
import styles from './styles.module.scss';

interface ViewedButtonProps {
  viewed: boolean;
  size?: IconSize;
  onClick?: () => void;
}

const ViewedButton = ({ viewed, size = 'lg', onClick }: ViewedButtonProps) => (
  <div className={styles.wrapper}>
    <IconButton
      style={{}}
      onClick={onClick}
      size={size}
      icon={viewed ? IconName.EYE_SLASHED : IconName.EYE}
    />
  </div>
);

export { ViewedButton };
