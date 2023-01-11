import styles from './styles.module.scss';

interface MovieTitleProps {
  title: string;
  tagline?: string | null;
}

const MovieTitle = ({ title, tagline }: MovieTitleProps) => (
  <div className={styles.wrapper}>
    <h2>{title}</h2>
    {tagline && <span>{tagline}</span>}
  </div>
);

export { MovieTitle };
