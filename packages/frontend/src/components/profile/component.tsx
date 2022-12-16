import type { IUser } from '@common';
import { RoleName } from '@common';
import { Avatar, Container } from '@components';
import styles from './styles.module.scss';

interface ProfileProps {
  user: IUser;
}

const Profile = ({ user }: ProfileProps) => (
  <Container style={{ alignSelf: 'flex-start' }}>
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Avatar size={'lg'} user={user} />
        <p>{user.username}</p>
      </div>
      <div className={styles.info}>
        <table className={styles.table}>
          <tbody>
            {user.email && (
              <tr>
                <td>Пошта</td>
                <td>{user.email}</td>
              </tr>
            )}
            <tr>
              <td>Роль</td>
              <td>{RoleName[user.role] || 'Користувач'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Container>
);

export { Profile };
