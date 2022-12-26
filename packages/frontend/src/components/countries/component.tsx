import type { ICountry, ICountryForm } from '@common';
import { countrySchema, ENTITY_PER_PAGE } from '@common';
import { Button, Input, Spinner, Table, PaginationBar } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles.module.scss';
import { COUNTRIES_COLUMNS } from './table/columns';
import { useAppDispatch, useAppSelector, usePagination } from '@hooks';
import {
  dispatchGetCountries,
  dispatchCreateCountry,
  dispatchUpdateCountry,
  dispatchDeleteCountry,
} from 'src/store';

const CountriesTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ICountryForm>({ resolver: joiResolver(countrySchema) });
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();
  const [countryEdit, setCountryEdit] = useState<ICountry | null>(null);

  const countriesCount = (countries.data || []).length;
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPages,
  } = usePagination({ contentPerPage: ENTITY_PER_PAGE, count: countriesCount });

  const paginatedValues = useMemo(
    () => countries.data?.slice(firstContentIndex, lastContentIndex),
    [countries, firstContentIndex, lastContentIndex],
  );

  if (countriesCount <= ENTITY_PER_PAGE && page !== 1) setPage(1);

  useEffect(() => {
    if (!countries.data && !countries.loading) {
      dispatch(dispatchGetCountries());
    }
  }, [countries, dispatch]);

  const onCreateHandler = (data: any) => {
    if (countryEdit) {
      dispatch(dispatchUpdateCountry({ id: countryEdit.id, name: data.name }));

      return;
    }

    dispatch(dispatchCreateCountry(data.name));
  };

  const onEdit = (data: ICountry) => {
    setCountryEdit(data);

    setValue('name', data.name);
  };

  const onDeleteHandler = (id: string) => {
    dispatch(dispatchDeleteCountry(id));
  };

  const onCancelHandler = () => {
    setCountryEdit(null);
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
          error={errors.name?.message}
        />
        {countryEdit ? (
          <div className={styles.formControls}>
            <Button disabled={countries.loading} type="submit">
              {countries.loading ? <Spinner size="xs" /> : 'Save'}
            </Button>
            <Button disabled={countries.loading} onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={countries.loading}>
            {countries.loading ? <Spinner size="xs" /> : 'Create'}
          </Button>
        )}
      </form>
      {countries.loading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          disabled={!!countryEdit}
          data={countries.data || []}
          columns={COUNTRIES_COLUMNS}
          onEdit={(data) => onEdit(data as ICountry)}
          onDelete={onDeleteHandler}
        />
      )}
      {countriesCount > 0 && (
        <PaginationBar
          firstPage={1}
          page={page}
          lastPage={totalPages}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />
      )}
    </div>
  );
};

export { CountriesTabPage };
