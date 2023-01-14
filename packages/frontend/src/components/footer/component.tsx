import { Icon, IconName, Container } from '@components';
import logo from '@assets/images/kinobook-icon-xl.png';
import styles from './styles.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.wrapper}>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          KinoBook
        </div>
        <div className={styles.info}>
          <h5>Contact:</h5>
          <ul>
            <li>
              <Icon name={IconName.MAIL} />
              <a href="mailto:nikolaiev.i03@gmail.com" target="blank">
                Email
              </a>
            </li>
            <li>
              <Icon name={IconName.TELEGRAM} />
              <a href="https://t.me/n1kola1ev" target="blank">
                Telegram
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.copyright}>
          {currentYear}&#169; Nikolaiev Ivan
        </div>
      </Container>
    </div>
  );
};

export { Footer };
