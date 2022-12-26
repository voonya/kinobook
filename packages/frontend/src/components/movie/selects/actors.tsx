import { MultiSelect } from 'src/components/primitives';
import type { IOption } from '../form/type';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks';
import { dispatchGetActors } from 'src/store';
import type { IActor } from '@common';

interface ActorSelectProps {
  value: string[];
  ref: any;
  error?: string;
  onChange: (val: string[]) => void;
  required?: boolean;
}

const ActorSelect = ({
  value,
  ref,
  error,
  onChange,
  required = false,
}: ActorSelectProps) => {
  const actors = useAppSelector((state) => state.actors);
  const [actorsOptions, setActorsOptions] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!actors.data && !actors.loading) {
      dispatch(dispatchGetActors());
    } else if (actors.data) {
      console.log(actors.data);

      setActorsOptions(
        actors.data.map((el: IActor) => ({
          value: el.id,
          label: `${el.name}` + (el.surname ? ` ${el.surname}` : ''),
        })),
      );
    }
  }, [dispatch, actors.data, actors.loading]);

  return (
    <MultiSelect
      label={'Actors'}
      labelRequiredMark={required}
      options={actorsOptions}
      noOptionsMessage={'No actors'}
      ref={ref}
      value={actorsOptions.filter((c) => value?.includes(c.value))}
      error={error}
      onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
    />
  );
};

export { ActorSelect };
