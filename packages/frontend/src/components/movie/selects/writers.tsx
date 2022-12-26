import { MultiSelect } from 'src/components/primitives';
import type { IOption } from '../form/type';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks';
import { dispatchGetWriters } from 'src/store';
import type { IWriter } from '@common';

interface WriterSelectProps {
  value: string[];
  ref: any;
  error?: string;
  onChange: (val: string[]) => void;
  required?: boolean;
}

const WriterSelect = ({
  value,
  ref,
  error,
  onChange,
  required = false,
}: WriterSelectProps) => {
  const writers = useAppSelector((state) => state.writers);
  const [writersOptions, setWritersOptions] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!writers.data && !writers.loading) {
      dispatch(dispatchGetWriters());
    } else if (writers.data) {
      setWritersOptions(
        writers.data.map((el: IWriter) => ({
          value: el.id,
          label: `${el.name}` + (el.surname ? ` ${el.surname}` : ''),
        })),
      );
    }
  }, [dispatch, writers.data, writers.loading]);

  return (
    <MultiSelect
      label={'Writers'}
      labelRequiredMark={required}
      options={writersOptions}
      noOptionsMessage={'No writers'}
      ref={ref}
      value={writersOptions.filter((c) => value?.includes(c.value))}
      error={error}
      onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
    />
  );
};

export { WriterSelect };
