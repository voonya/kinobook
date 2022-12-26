import { useForm, Controller } from 'react-hook-form';
import {
  GenreSelect,
  CountrySelect,
  WriterSelect,
  ActorSelect,
} from '../selects';
import { Button, Spinner, Input } from '@components';
import { useEntitiesLoading } from '@hooks';
import { useState } from 'react';
import styles from './styles.module.scss';
import type { IMoviesFiltes } from '@common';
import { IconName, Icon } from '@components';

interface MovieFilterProps {
  onFiltersApply?: (data: IMoviesFiltes) => void;
}

const MovieFilter = ({ onFiltersApply }: MovieFilterProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const entitiesLoading = useEntitiesLoading();

  const onApply = (form: any) => {
    const data: IMoviesFiltes = {};

    Object.keys(form).forEach((key) => {
      switch (key) {
        case 'genresId':
        case 'writersId':
        case 'actorsId':
        case 'countriesId':
          data[key] =
            !form[key] || form[key].length === 0 ? undefined : form[key];
          break;
        case 'from':
        case 'to':
          if (form[key])
            data.releaseDate = data.releaseDate
              ? { ...data.releaseDate, [key]: form[key] }
              : { [key]: form[key] };
          break;
        case 'rateFrom':
          if (form['rateFrom'])
            data.averageRate = data.averageRate
              ? { ...data.averageRate, from: Number(form['rateFrom']) }
              : { from: Number(form['rateFrom']) };
          break;
        case 'rateTo':
          if (form['rateTo'])
            data.averageRate = data.averageRate
              ? { ...data.averageRate, to: Number(form['rateTo']) }
              : { to: Number(form['rateTo']) };
          break;
      }
    });

    onFiltersApply?.(data);
  };

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onReset = () => {
    reset();
    setEndDate('');
    setStartDate('');
  };

  const renderBody = () => {
    if (showFilters) {
      return (
        <>
          <div className={styles.openFilter}>
            <Button onClick={() => setShowFilters(false)} color={'secondary'}>
              <Icon name={IconName.XMARK} />
            </Button>
          </div>
          <form onSubmit={handleSubmit(onApply)}>
            <Controller
              control={control}
              name="genresId"
              render={({ field: { onChange, value, ref } }) => (
                <GenreSelect value={value} ref={ref} onChange={onChange} />
              )}
            />
            <Controller
              control={control}
              name="countriesId"
              render={({ field: { onChange, value, ref } }) => (
                <CountrySelect value={value} ref={ref} onChange={onChange} />
              )}
            />
            <Controller
              control={control}
              name="actorsId"
              render={({ field: { onChange, value, ref } }) => (
                <ActorSelect value={value} ref={ref} onChange={onChange} />
              )}
            />
            <Controller
              control={control}
              name="writersId"
              render={({ field: { onChange, value, ref } }) => (
                <WriterSelect value={value} ref={ref} onChange={onChange} />
              )}
            />
            <div className={styles.averageRate}>
              <span>Average rate</span>
              <div>
                <Input
                  type="number"
                  {...register('rateFrom')}
                  errorBlock={false}
                />
                <Input
                  type="number"
                  {...register('rateTo')}
                  errorBlock={false}
                />
              </div>
            </div>
            <Input
              label="Release date (from)"
              type="date"
              {...register('from')}
              onChange={(e: any) => setStartDate(e.target.value)}
              value={startDate}
              max={endDate}
            />
            <Input
              label="Release date (to)"
              type="date"
              {...register('to')}
              onChange={(e: any) => setEndDate(e.target.value)}
              value={endDate}
              min={startDate}
            />
            <div className={styles.controls}>
              <Button onClick={onReset} color="danger">
                Clear
              </Button>
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </>
      );
    }

    return (
      <div className={styles.openFilter}>
        <Button onClick={() => setShowFilters(true)} color={'secondary'}>
          <Icon name={IconName.FILTERS} />
        </Button>
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper} ${showFilters ? styles.open : ''}`}>
      {entitiesLoading ? <Spinner /> : renderBody()}
    </div>
  );
};

export { MovieFilter };
