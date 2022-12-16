import type { IGenre } from '@common';
import styles from './styles.module.scss';

interface GenreTagProp {
  genre: IGenre;
}

export const GenreTag = ({ genre }: GenreTagProp) => (
  <div className={styles.wrapper}>{genre.name}</div>
);
