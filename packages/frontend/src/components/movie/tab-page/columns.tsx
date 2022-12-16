import type { IGenre } from '@common';
import { GenreTag, MoviePoster } from '@components';
import type { CellProps } from 'react-table';

export const MOVIE_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    Header: 'Release date',
    accessor: 'releaseDate',
    Cell: (props: CellProps<{}>) => props.value ?? '-',
  },
  {
    Header: 'Genres',
    accessor: 'genres',
    Cell: (props: CellProps<{}>) => {
      console.log(props.value);

      if (!props.value) {
        return '-';
      }

      return (
        <>
          {props.value.map((e: IGenre) => (
            <GenreTag key={e.id} genre={e} />
          ))}
        </>
      );
    },
  },
  {
    Header: 'Poster',
    accessor: 'poster',
    Cell: (props: CellProps<{}>) => {
      console.log('cell props', props);

      return <MoviePoster poster={props.value} size="xs" />;
    },
  },
];
