import { MultiSelect } from 'src/components/primitives';
import type { IOption } from '../form/type';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks';
import { dispatchGetGenres } from 'src/store';
import type { IGenre } from '@common';

interface GenreSelectProps {
  value: string[];
  ref: any;
  error?: string;
  onChange: (val: string[]) => void;
  required?: boolean;
}

const GenreSelect = ({
  value,
  ref,
  error,
  onChange,
  required = false,
}: GenreSelectProps) => {
  const genres = useAppSelector((state) => state.genres);
  const [genresOptions, setGenresOptions] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!genres.data && !genres.loading) {
      dispatch(dispatchGetGenres());
    } else if (genres.data) {
      setGenresOptions(
        genres.data.map((el: IGenre) => ({ value: el.id, label: el.name })),
      );
    }
  }, [dispatch, genres.data, genres.loading]);

  return (
    <MultiSelect
      label={'Genres'}
      labelRequiredMark={required}
      options={genresOptions}
      noOptionsMessage={'No genres'}
      ref={ref}
      value={genresOptions.filter((c) => value?.includes(c.value))}
      error={error}
      onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
    />
  );
};

export { GenreSelect };
