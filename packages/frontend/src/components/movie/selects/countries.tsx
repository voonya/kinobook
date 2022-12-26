import { MultiSelect } from 'src/components/primitives';
import type { IOption } from '../form/type';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks';
import { dispatchGetCountries } from 'src/store';
import type { ICountry } from '@common';

interface CountrySelectProps {
  value: string[];
  ref: any;
  error?: string;
  onChange: (val: string[]) => void;
  required?: boolean;
}

const CountrySelect = ({
  value,
  ref,
  error,
  onChange,
  required = false,
}: CountrySelectProps) => {
  const countries = useAppSelector((state) => state.countries);
  const [countriesOptions, setCountriesOptions] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!countries.data && !countries.loading) {
      dispatch(dispatchGetCountries());
    } else if (countries.data) {
      setCountriesOptions(
        countries.data.map((el: ICountry) => ({
          value: el.id,
          label: el.name,
        })),
      );
    }
  }, [dispatch, countries.data, countries.loading]);

  return (
    <MultiSelect
      label={'Countries'}
      labelRequiredMark={required}
      options={countriesOptions}
      noOptionsMessage={'No countries'}
      ref={ref}
      value={countriesOptions.filter((c) => value?.includes(c.value))}
      error={error}
      onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
    />
  );
};

export { CountrySelect };
