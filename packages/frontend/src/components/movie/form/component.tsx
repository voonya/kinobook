import type { IMovie, IGenre, ICountry, IDirector, IActor } from '@common';
import {
  Input,
  Button,
  Spinner,
  TextArea,
  IconButton,
  IconName,
} from '@components';
import { useForm, Controller } from 'react-hook-form';
import type { IMovieForm } from '@common';
import { movieSchema } from '@common';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState, useRef } from 'react';
import { MoviePoster } from '../poster';
import { useAppDispatch, useEntitiesLoading } from '@hooks';
import { createMovieFormData } from './create-form-data';
import {
  GenreSelect,
  ActorSelect,
  CountrySelect,
  DirectorSelect,
} from '../selects';
import { useNavigate } from 'react-router-dom';
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

  const [isLoading, setIsLoading] = useState(false);

  const posterRef = useRef<HTMLInputElement | null>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [isPosterFile, setIsPosterFile] = useState(false);

  const entitiesLoading = useEntitiesLoading();

  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      Object.keys(movie).forEach((item) => {
        switch (item) {
          case 'genres': {
            setValue(
              'genres',
              movie.genres.map((g: IGenre) => g.id),
            );
            break;
          }
          case 'directors': {
            setValue(
              'directors',
              movie[item].map((g: IDirector) => g.id),
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
          case 'releaseDate':
            setValue(item as any, '');
            movie['releaseDate'] &&
              setValue(
                item as any,
                new Date(movie['releaseDate']).toISOString().slice(0, 10),
              );
            break;
          case 'poster':
            movie['poster'] && setPoster(movie['poster']);
            break;
          default:
            setValue(item as any, movie[item as keyof IMovie]);
        }
      });
    }
    setIsLoading(false);
  }, [movie, entitiesLoading, dispatch, setValue]);

  const onSubmit = async (data: any) => {
    const formData = createMovieFormData({ ...data, poster });

    if (posterRef.current?.files?.[0]) {
      formData.append('poster', posterRef.current?.files?.[0]);
    }

    setIsLoading(true);
    onFormSubmit(formData).finally(() => setIsLoading(false));
  };

  const posterOnChange = (e: any) => {
    const files = e.target.files;

    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = function () {
        setPoster(fr.result as string);
        setIsPosterFile(true);
      };
      fr.readAsDataURL(files[0]);
    }
  };

  const onPosterClear = () => {
    setPoster(null);
    setIsPosterFile(false);

    if (posterRef.current?.value) {
      posterRef.current.value = '';
    }
  };

  return (
    <div className={styles.wrapper}>
      {isLoading || entitiesLoading ? (
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
              <GenreSelect
                value={value}
                ref={ref}
                error={errors.genres?.message}
                onChange={onChange}
                required
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
            name="directors"
            render={({ field: { onChange, value, ref } }) => (
              <DirectorSelect
                value={value || []}
                ref={ref}
                error={errors.directors?.message}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="actors"
            render={({ field: { onChange, value, ref } }) => (
              <ActorSelect
                value={value || []}
                ref={ref}
                error={errors.actors?.message}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="countries"
            render={({ field: { onChange, value, ref } }) => (
              <CountrySelect
                value={value || []}
                ref={ref}
                error={errors.countries?.message}
                onChange={onChange}
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
            label="Trailer (YouTube link)"
            error={errors.trailer?.message}
            {...register('trailer')}
          />
          <Input
            label="Megogo (link)"
            error={errors.megogoLink?.message}
            {...register('megogoLink')}
          />
          <div className={styles.posterWrapper}>
            <MoviePoster poster={poster} isBuffer={isPosterFile} />
            {(poster || movie?.poster) && (
              <div className={styles.clearPosterBtn}>
                <IconButton icon={IconName.XMARK} onClick={onPosterClear} />
              </div>
            )}
          </div>

          <Input
            type="file"
            label="Poster"
            accept=".jpg, .jpeg, .png"
            placeholder="Choose file"
            {...register('poster')}
            onChange={posterOnChange}
            ref={posterRef}
          />
          <div className={styles.controls}>
            <Button color="danger" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export { MovieForm };
