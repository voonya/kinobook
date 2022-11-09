import type { ReactNode } from 'react';
import authBg from '@assets/images/auth-bg.jpg'; //'public/images/auth-bg.jpg'
import styles from './styles.module.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className={styles.wrapper}>
    <main className={styles.innerWrapper}>
      <div className="children">{children}</div>
      <div className={styles.image}>
        <img src={authBg} alt="bg image" />
      </div>
    </main>
  </div>
);
