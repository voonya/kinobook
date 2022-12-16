import type { IMovie, IGenre, ICountry, IWriter, IActor } from '@common';
import { Input, Button, MultiSelect, Spinner, TextArea } from '@components';
import { useForm, Controller } from 'react-hook-form';
import type { IOption } from './type';
import type { IMovieForm } from '@common';
import { movieSchema } from '@common';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState, useRef } from 'react';
import { MoviePoster } from '../poster';
import { useAppSelector, useAppDispatch } from '@hooks';
import { getGenres, getActors, getCountries, getWriters } from 'src/store';
import { createMovieFormData } from './create-form-data';
import styles from './styles.module.scss';

interface MovieFormProps {
  movie?: IMovie;
  onFormSubmit: (data: FormData) => Promise<void>;
}

const MovieForm = ({ movie, onFormSubmit }: MovieFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IMovieForm>({ resolver: joiResolver(movieSchema) });

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const posterRef = useRef<HTMLInputElement | null>(null);
  const [poster, setPoster] = useState<string | null>();

  const countries = useAppSelector((state) => state.countries);
  const [countriesOptions, setCountriesOptions] = useState<IOption[]>([]);

  const writers = useAppSelector((state) => state.writers);
  const [writersOptions, setWritersOptions] = useState<IOption[]>([]);

  const actors = useAppSelector((state) => state.actors);
  const [actorsOptions, setActorsOptions] = useState<IOption[]>([]);

  const genres = useAppSelector((state) => state.genres);
  const [genresOptions, setGenresOptions] = useState<IOption[]>([]);

  useEffect(() => {
    setIsLoading(
      genres.loading || actors.loading || writers.loading || actors.loading,
    );

    if (!genres.genres && !genres.loading) {
      dispatch(getGenres());
    } else if (genres.genres) {
      setGenresOptions(
        genres.genres.map((el: IGenre) => ({ value: el.id, label: el.name })),
      );
    }

    if (!actors.actors && !actors.loading) {
      dispatch(getActors());
    } else if (actors.actors) {
      setActorsOptions(
        actors.actors.map((el: IActor) => ({
          value: el.id,
          label: `${el.name} ${el.surname}`,
        })),
      );
    }

    if (!countries.countries && !countries.loading) {
      dispatch(getCountries());
    } else if (countries.countries) {
      setCountriesOptions(
        countries.countries.map((el: ICountry) => ({
          value: el.id,
          label: el.name,
        })),
      );
    }

    if (!writers.writers && !writers.loading) {
      dispatch(getWriters());
    } else if (writers.writers) {
      setWritersOptions(
        writers.writers.map((el: IWriter) => ({
          value: el.id,
          label: `${el.name} ${el.surname}`,
        })),
      );
    }

    if (movie) {
      console.log(movie);

      Object.keys(movie).forEach((item) => {
        switch (item) {
          case 'genres': {
            setValue(
              'genres',
              movie.genres.map((g: IGenre) => g.id),
            );
            break;
          }
          case 'writers': {
            setValue(
              'writers',
              movie[item].map((g: IWriter) => g.id),
            );
            break;
          }
          case 'actors': {
            setValue(
              'actors',
              movie[item].map((g: IActor) => g.id),
            );
            break;
          }
          case 'countries': {
            setValue(
              'countries',
              movie[item].map((g: ICountry) => g.id),
            );
            break;
          }
          case 'id':
          case 'createdAt':
          case 'updatedAt':
            break;
          default:
            setValue(item as any, movie[item as keyof IMovie]);
        }
      });
    }
  }, [movie, genres, actors, writers, countries, dispatch, setValue]);

  const onSubmit = async (data: any) => {
    const formData = createMovieFormData(data);

    if (posterRef.current?.files?.[0]) {
      formData.append('poster', posterRef.current?.files?.[0]);
    }

    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    setIsLoading(true);
    onFormSubmit(formData).finally(() => setIsLoading(false));
  };

  const posterOnChange = (e: any) => {
    const files = e.target.files;

    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = function () {
        setPoster(fr.result as string);
      };
      fr.readAsDataURL(files[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            labelRequiredMark
            {...register('title')}
            error={errors.title?.message}
          />
          <Input
            label="Tagline"
            {...register('tagline')}
            error={errors.tagline?.message}
          />
          <Controller
            control={control}
            name="genres"
            render={({ field: { onChange, value, ref } }) => (
              <MultiSelect
                label={'Genres'}
                labelRequiredMark
                options={genresOptions}
                noOptionsMessage={'No genres'}
                ref={ref}
                value={genresOptions.filter((c) => value?.includes(c.value))}
                error={errors.genres?.message}
                onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
              />
            )}
          />
          <TextArea
            labelRequiredMark
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />
          <Controller
            control={control}
            name="writers"
            render={({ field: { onChange, value, ref } }) => (
              <MultiSelect
                label={'Writers'}
                options={writersOptions}
                noOptionsMessage={'No Writers'}
                error={errors.writers?.message}
                ref={ref}
                value={writersOptions.filter((c) => value?.includes(c.value))}
                onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
              />
            )}
          />
          <Controller
            control={control}
            name="actors"
            render={({ field: { onChange, value, ref } }) => (
              <MultiSelect
                label={'Actors'}
                options={actorsOptions}
                noOptionsMessage={'No actors'}
                error={errors.actors?.message}
                ref={ref}
                value={actorsOptions.filter((c) => value?.includes(c.value))}
                onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
              />
            )}
          />
          <Controller
            control={control}
            name="countries"
            render={({ field: { onChange, value, ref } }) => (
              <MultiSelect
                label={'Countries'}
                options={countriesOptions}
                error={errors.countries?.message}
                noOptionsMessage={'No countries'}
                ref={ref}
                value={countriesOptions.filter((c) => value?.includes(c.value))}
                onChange={(val: IOption[]) => onChange(val.map((c) => c.value))}
              />
            )}
          />

          <Input
            label="Release date"
            type="date"
            {...register('releaseDate')}
            error={errors.releaseDate?.message}
          />
          <Input
            type="number"
            label="Runtime (min)"
            {...register('runtime')}
            error={errors.runtime?.message}
          />
          <Input
            type="number"
            label="Budget"
            {...register('budget')}
            error={errors.budget?.message}
          />
          <Input
            type="number"
            label="Revenue"
            {...register('revenue')}
            error={errors.revenue?.message}
          />
          <Input
            type="number"
            label="Average rate"
            {...register('averageRate')}
            error={errors.averageRate?.message}
          />
          <Input
            type="number"
            label="Number of votes"
            error={errors.countVotes?.message}
            {...register('countVotes')}
          />
          <Input
            label="Trailer (YouTube link)"
            error={errors.trailer?.message}
            {...register('trailer')}
          />
          <MoviePoster poster={poster || movie?.poster} isBuffer={!!poster} />
          <Input
            type="file"
            label="Poster"
            accept=".jpg, .jpeg, .png"
            placeholder="Choose file"
            onChange={posterOnChange}
            ref={posterRef}
          />
          <div className={styles.controls}>
            <Button color="danger">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export { MovieForm };
