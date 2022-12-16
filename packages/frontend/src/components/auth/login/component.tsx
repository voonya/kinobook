import { SPARoutes } from '@common';
import { Button, Input, PasswordInput, Spinner } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from 'src/store/auth';
import styles from './styles.module.scss';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const authError = useAppSelector((state) => state.auth.error);

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    dispatch(loginUser(data)).then(() => navigate(SPARoutes.HOME));
  };

  return (
    <div className={styles.wrapper}>
      <h3>Увійти</h3>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <Input
            label="Електронна пошта"
            labelRequiredMark
            error={errors.email && 'email'}
            {...register('email', { required: true })}
          />
        </div>
        <div className={styles.inputWrapper}>
          <PasswordInput
            label="Пароль"
            labelRequiredMark
            error={errors.password && 'apss'}
            {...register('password', { required: true })}
          />
        </div>
        {authError && <div className={styles.backendError}>{authError}</div>}
        <Button type="submit">
          {isLoading ? <Spinner size="sm" color={'white'} /> : 'Увійти'}
        </Button>
        <div className={styles.registerCaption}>
          Не маєте акаунту? <Link to={SPARoutes.REGISTER}>Зареєструйтесь</Link>
        </div>
      </form>
    </div>
  );
};
