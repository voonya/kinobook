import { dashBoardLinks } from '@common';
import { Container, Layout } from '@components';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const DashBoardLayout = () => (
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

export { DashBoardLayout };
