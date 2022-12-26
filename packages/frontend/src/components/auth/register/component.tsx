import { useEffect } from 'react';
import { Input, Button, PasswordInput, Spinner } from '@components';
import { Link } from 'react-router-dom';
import { SPARoutes } from '@common';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks';
import { registerUser, clearAuthErrors } from 'src/store';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const authError = useAppSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(clearAuthErrors());
  }, [dispatch]);

  const onSubmit = (data: any) => {
    dispatch(registerUser(data));
  };

  return (
    <div className={styles.wrapper}>
      <h3>Зареєструватись</h3>
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
          <Input
            label="Ім'я користувача"
            labelRequiredMark
            error={errors.username && 'username'}
            {...register('username', { required: true })}
          />
        </div>
        <div className={styles.inputWrapper}>
          <PasswordInput
            label="Пароль"
            labelRequiredMark
            error={(errors.password?.message as string) || authError}
            {...register('password', { required: true })}
          />
        </div>
        <Button type="submit">
          {isLoading ? (
            <Spinner size="sm" color={'white'} />
          ) : (
            'Зареєструватись'
          )}
        </Button>
        <div className={styles.loginCaption}>
          Вже маєте акаунт? <Link to={SPARoutes.LOGIN}>Увійдіть</Link>
        </div>
      </form>
    </div>
  );
};
