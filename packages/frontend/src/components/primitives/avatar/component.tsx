import type { IUser } from '@common';
import { ColorsAvatar } from '@common';
import styles from './styles.module.scss';

export type AvatarSize = 'sm' | 'lg';

interface AvatarProps {
  user: IUser;
  size?: AvatarSize;
}

const Avatar = ({ user, size = 'sm' }: AvatarProps) => {
  const userAbbr = user.username.substring(0, 2).toUpperCase();
  const colors = Object.values(ColorsAvatar);
  const colorByName = colors[user.username.charCodeAt(0) % colors.length ?? 0];

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: colorByName }}
      data-size={size}
    >
      {user.avatar ? <img src={user.avatar} /> : <p>{userAbbr}</p>}
    </div>
  );
};

export { Avatar };
