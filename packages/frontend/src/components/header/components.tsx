import type { IUser } from '@common';
import { navLinks, SPARoutes, Role } from '@common';
import { Container, AvatarButton } from '@components';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/images/kinobook-icon-xl.png';
import styles from './styles.module.scss';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const user: IUser = {
    id: '1',
    email: 'dlyarobot@gmail.com',
    username: 'voonya',
    role: Role.ADMIN,
  };

  return (
    <div className={styles.wrapper}>
      <Container style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.logo} onClick={() => navigate(SPARoutes.HOME)}>
          <img src={logo} alt="logo" />
          KinoBook
        </div>
        <div
          className={
            isMenuOpen ? `${styles.burgerBtn} ${styles.open}` : styles.burgerBtn
          }
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
        </div>
        <nav className={isMenuOpen ? styles.menuOpen : ''}>
          <ul>
            {navLinks.map((el) => (
              <li key={el.name + el.link}>
                <a href={el.link}>{el.name}</a>
              </li>
            ))}
          </ul>
          <AvatarButton
            onClick={() => navigate(SPARoutes.PROFILE.replace(':id', user.id))}
            user={user}
          />
        </nav>
      </Container>
    </div>
  );
};

export { Header };
