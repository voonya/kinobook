import styles from './styles.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
const Container = ({ children, style }: ContainerProps) => (
  <div className={styles.wrapper} style={style}>
    {children}
  </div>
);

export { Container };
