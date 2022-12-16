import { Footer, Header } from '@components';
import styles from './styles.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.innerWrapper}>{children}</div>
    <Footer />
  </div>
);

export { Layout };
