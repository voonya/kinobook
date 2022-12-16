import styles from './styles.module.scss';
import authBg from '@assets/images/kinobook-icon-xl.png';
import { Layout } from '@components';

const NotFoundPage = () => (
  <Layout>
    <div className={styles.wrapper}>
      <span>
        <img src={authBg}></img>404
      </span>
      <span>Йой, такої сторінки не знайдено :&#40;</span>
    </div>
  </Layout>
);

export { NotFoundPage };
