import type { IGenre } from '@common';
import { EntityTag, MoviePoster } from '@components';
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
    Cell: (props: CellProps<{}>) => (
      <>{props.value ? new Date(props.value).toLocaleDateString() : '-'}</>
    ),
  },
  {
    Header: 'Genres',
    accessor: 'genres',
    Cell: (props: CellProps<{}>) => {
      if (!props.value) {
        return <>-</>;
      }

      return (
        <>
          {props.value.map((e: IGenre) => (
            <EntityTag key={e.id} value={e.name} />
          ))}
        </>
      );
    },
  },
  {
    Header: 'Poster',
    accessor: 'poster',
    Cell: (props: CellProps<{}>) => (
      <MoviePoster poster={props.value} size="xs" />
    ),
  },
];
