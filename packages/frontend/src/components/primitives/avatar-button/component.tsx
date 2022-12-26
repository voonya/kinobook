import type { AvatarSize } from '@components';
import { Avatar } from '@components';
import type { IUser } from '@common';
import styles from './styles.module.scss';

interface AvatarButtonProps {
  user: IUser;
  size?: AvatarSize;
  onClick?: () => void;
}

const AvatarButton = ({ user, size, onClick }: AvatarButtonProps) => (
  <button onClick={onClick} className={styles.button}>
    <Avatar user={user} size={size} />
  </button>
);

export { AvatarButton };
