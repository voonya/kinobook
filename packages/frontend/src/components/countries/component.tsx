import type { ICountry, ICountryForm } from '@common';
import { countrySchema } from '@common';
import { Button, Input, Spinner, Table } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createCountry,
  deleteCountry,
  getAllCountries,
  updateCountry,
} from 'src/services';
import styles from '../styles.module.scss';
import { COUNTRIES_COLUMNS } from './table/columns';

const CountriesTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ICountryForm>({ resolver: joiResolver(countrySchema) });
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [countryEdit, setCountryEdit] = useState<ICountry | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getAllCountries()
      .then((data) => {
        if (!data.error) {
          setCountries(data.countries);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onCreateHandler = (data: any) => {
    setFormError('');
    setIsLoading(true);

    let request;
    if (countryEdit) {
      request = updateCountry(countryEdit.id, data.name);
    } else {
      request = createCountry(data.name);
    }

    request
      .then((res) => {
        if (res.error && res.statusCode === 400) {
          setFormError(res.error[0]);

          return;
        }

        return getAllCountries();
      })
      .then((data) => {
        if (!data.error) {
          setCountries(data.countries);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onEdit = (data: ICountry) => {
    setCountryEdit(data);

    setValue('name', data.name);
  };

  const onDeleteHandler = (id: string) => {
    setIsLoading(true);
    deleteCountry(id)
      .then((res) => {
        if (res.error) {
          return;
        }

        return getAllCountries();
      })
      .then((data) => {
        if (!data.error) {
          setCountries(data.countries);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onCancelHandler = () => {
    setCountryEdit(null);
    setFormError('');
    reset();
  };

  return (
    <div>
      <span>
        {countryEdit ? `Edit coutry: ${countryEdit.id}` : 'Create new country:'}
      </span>
      <form onSubmit={handleSubmit(onCreateHandler)}>
        <Input
          label="Name"
          labelRequiredMark
          {...register('name')}
          error={errors.name?.message || formError}
        />
        {countryEdit ? (
          <div className={styles.formControls}>
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Spinner size="xs" /> : 'Save'}
            </Button>
            <Button disabled={isLoading} onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="xs" /> : 'Create'}
          </Button>
        )}
      </form>
      {isLoading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          disabled={!!countryEdit}
          data={countries}
          columns={COUNTRIES_COLUMNS}
          onEdit={(data) => onEdit(data as ICountry)}
          onDelete={onDeleteHandler}
        />
      )}
    </div>
  );
};

export { CountriesTabPage };
