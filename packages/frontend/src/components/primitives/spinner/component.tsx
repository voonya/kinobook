import styles from './styles.module.scss';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'dark' | 'white';
}

const Spinner = ({ size, color }: SpinnerProps) => (
  <div className={styles.wrapper} data-size={size} data-color={color}></div>
);

export { Spinner };
