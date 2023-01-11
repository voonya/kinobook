import styles from './styles.module.scss';

interface GenreTagProp {
  value: string;
}

export const EntityTag = ({ value }: GenreTagProp) => (
  <div className={styles.wrapper}>{value}</div>
);
