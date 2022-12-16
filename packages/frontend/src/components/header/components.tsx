import logo from '@assets/images/kinobook-icon-xl.png';
import { navLinks, SPARoutes } from '@common';
import {
  AvatarButton,
  Button,
  Container,
  IconButton,
  IconName,
} from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from 'src/store/auth';
import styles from './styles.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const redirectToProfile = (id: string) => {
    navigate(SPARoutes.PROFILE.replace(':id', id));
  };

  const renderBurgerMenu = () => (
    <>
      <div
        className={
          isMenuOpen ? `${styles.burgerBtn} ${styles.open}` : styles.burgerBtn
        }
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
      </div>
      <nav
        className={
          isMenuOpen
            ? `${styles.burgerMenu} ${styles.menuOpen}`
            : styles.burgerMenu
        }
      >
        <ul>
          <>
            {navLinks.map((el) => (
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

            {user ? (
              <>
                <li>
                  <NavLink to={SPARoutes.PROFILE.replace(':id', user.id)}>
                    Профіль
                  </NavLink>
                </li>
                <Button onClick={logoutHandler}>Вийти</Button>
              </>
            ) : (
              <Button onClick={() => navigate(SPARoutes.LOGIN)}>Увійти</Button>
            )}
          </>
        </ul>
      </nav>
    </>
  );

  const renderMenu = () => (
    <nav className={styles.menu}>
      <ul>
        <>
          {navLinks.map((el) => (
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
        </>
      </ul>
      {user ? (
        <>
          <AvatarButton
            onClick={() => redirectToProfile(user.id)}
            user={user}
          />{' '}
          <IconButton icon={IconName.EXIT} size="lg" onClick={logoutHandler} />
        </>
      ) : (
        <Button onClick={() => navigate(SPARoutes.LOGIN)}>Увійти</Button>
      )}
    </nav>
  );

  return (
    <div className={styles.wrapper}>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
          position: 'relative',
        }}
      >
        <div className={styles.logo} onClick={() => navigate(SPARoutes.HOME)}>
          <img src={logo} alt="logo" />
          KinoBook
        </div>
        {renderMenu()}

        {renderBurgerMenu()}
      </Container>
    </div>
  );
};

export { Header };
