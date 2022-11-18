import type { IUser } from '@common';
import { RoleName } from '@common';
import { Container, Avatar } from '@components';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

interface ProfileProps {
  user: IUser;
}

const Profile = ({ user }: ProfileProps) => {
  const { id } = useParams();

  const isUserProfile = id === user.id;

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <Avatar size={'lg'} user={user} />
          <p>{user.username}</p>
        </div>
        <div className={styles.info}>
          <table className={styles.table}>
            <tbody>
              {isUserProfile && (
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
};

export { Profile };
