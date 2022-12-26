import { NavLink, Outlet } from 'react-router-dom';
import { dashBoardLinks, Role } from '@common';
import { Container, Layout, ProtectedRoute } from '@components';
import styles from './styles.module.scss';

const Component = () => (
  <Layout>
    <Container style={{ width: '100%' }}>
      <div className={styles.wrapper}>
        <ul className={styles.nav}>
          {dashBoardLinks.map((el) => (
            <li key={el.name + el.link}>
              <NavLink
                to={el.link}
                className={({ isActive }) =>
                  isActive ? styles.current : undefined
                }
              >
                {el.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.childrenWrapper}>
          <Outlet />
        </div>
      </div>
    </Container>
  </Layout>
);

export const DashBoardLayout = () => (
  <ProtectedRoute role={Role.MODERATOR}>
    <Component />
  </ProtectedRoute>
);
