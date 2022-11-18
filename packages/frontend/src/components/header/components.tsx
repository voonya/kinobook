import { navLinks, SPARoutes } from '@common';
import { Container } from '@components';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/images/kinobook-icon-xl.png';
import styles from './styles.module.scss';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const user = { username: 'voonya' };
  const userAbr = user.username.substring(0, 2).toUpperCase();

  const [isMenuOpen, setIsMenuOpen] = useState(true);

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
          <div className={styles.profileBtn}>{userAbr}</div>
        </nav>
      </Container>
    </div>
  );
};

export { Header };
