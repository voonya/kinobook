import type { IconSize } from '@components';
import { IconButton, IconName } from '@components';
import styles from './styles.module.scss';

interface BookmarksButtonProps {
  added: boolean;
  size?: IconSize;
  onClick?: () => void;
}

const BookmarkButton = ({
  added,
  size = 'lg',
  onClick,
}: BookmarksButtonProps) => (
  <div className={styles.wrapper}>
    <IconButton
      style={{}}
      onClick={onClick}
      size={size}
      icon={added ? IconName.STAR_FILLED : IconName.STAR}
    />
  </div>
);

export { BookmarkButton };
