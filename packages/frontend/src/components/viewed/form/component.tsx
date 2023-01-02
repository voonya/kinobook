import type { IMovie, IViewed } from '@common';
import { Input, Button, TextArea, RateInput } from '@components';
import { useEffect, useState } from 'react';
import type { ICreateViewed } from 'src/common/dto/viewed';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  dispatchCreateViewed,
  dispatchUpdateViewed,
  closeViewModal,
} from 'src/store';
import styles from './styles.module.scss';
import { MoviePoster, Spinner } from '@components';

interface IViewedFormProps {
  movie: IMovie;
  viewed?: IViewed;
}

export const ViewedForm = ({ movie, viewed }: IViewedFormProps) => {
  const { register, setValue, handleSubmit } = useForm<ICreateViewed>();

  const [rate, setRate] = useState(viewed?.rate || 1);
  const isLoading = useAppSelector((state) => state.viewed.loading);

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    const newData = { ...data, rate, movieId: movie.id };

    if (viewed) {
      dispatch(dispatchUpdateViewed({ id: viewed.id, data: newData }));

      return;
    }

    dispatch(dispatchCreateViewed(newData));
  };

  useEffect(() => {
    setValue('private', true);

    if (viewed) {
      Object.keys(viewed).forEach((key) => {
        switch (key) {
          case 'private':
            setValue('private', viewed.private);
            break;
          case 'description':
            setValue('description', viewed.description);
            break;
          default:
            break;
        }
      });
    }
  }, [viewed, setValue]);

  const onCancel = () => {
    dispatch(closeViewModal());
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MoviePoster poster={movie.poster} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>
              <span>{movie.title}</span>
              <span className={styles.releaseDate}>
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString()
                  : 'No release'}
              </span>
            </div>
            <RateInput
              value={rate}
              onChange={setRate}
              label={'Rate'}
              labelRequiredMark
            />
            <Input
              type={'checkbox'}
              {...register('private')}
              label={'Private'}
              labelRequiredMark
            />
            <TextArea label="Description" {...register('description')} />
            <div className={styles.controls}>
              <Button color="danger" type={'button'} onClick={onCancel}>
                Cancel
              </Button>
              <Button color="primary" type={'submit'}>
                Save
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
