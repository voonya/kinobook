import { MultiSelect } from 'src/components/primitives';
import type { IOption } from '../form/type';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks';
import { dispatchGetDirectors } from 'src/store';
import type { IDirector } from '@common';

interface DirectorSelectProps {
  value: string[];
  ref: any;
  error?: string;
  onChange: (val: string[]) => void;
  required?: boolean;
}

const DirectorSelect = ({
  value,
  ref,
  error,
  onChange,
  required = false,
}: DirectorSelectProps) => {
  const directors = useAppSelector((state) => state.directors);
  const [directorsOptions, setDirectorsOptions] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!directors.data && !directors.loading) {
      dispatch(dispatchGetDirectors());
    } else if (directors.data) {
      setDirectorsOptions(
        directors.data.map((el: IDirector) => ({
          value: el.id,
          label: `${el.name}` + (el.surname ? ` ${el.surname}` : ''),
        })),
      );
    }
  }, [dispatch, directors.data, directors.loading]);

  return (
    <MultiSelect
      label={'Directors'}
      labelRequiredMark={required}
      options={directorsOptions}
      noOptionsMessage={'No directors'}
      ref={ref}
      value={directorsOptions.filter((c) => value?.includes(c.value))}
      error={error}
      onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
    />
  );
};

export { DirectorSelect };
