import { AvatarButton, StarRate } from '@components';
import type { IViewed } from '@common';
import styles from './styles.module.scss';

interface ICommentProps {
  viewed: IViewed;
}

export const Comment = ({ viewed }: ICommentProps) => (
  <div className={styles.wrapper}>
    <div className={styles.avatar}>
      <AvatarButton user={viewed.user} />
      <StarRate value={viewed.rate} size={'xs'} />
    </div>

    <div className={styles.innerWrapper}>
      <div className={styles.username}>
        <span>{viewed.user.username}</span>

        <span>{viewed.createdAt?.slice(0, 10)}</span>
      </div>

      <div className={styles.description}>
        {viewed.description || 'No description'}
      </div>
    </div>
  </div>
);
