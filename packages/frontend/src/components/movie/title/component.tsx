import styles from './styles.module.scss';

interface MovieTitleProps {
  title: string;
}

const MovieTitle = ({ title }: MovieTitleProps) => (
  <div className={styles.wrapper}>
    <h2>{title}</h2>
  </div>
);

export { MovieTitle };
