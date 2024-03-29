import { SPARoutes } from '@common';
import { Button, Input, PasswordInput, Spinner } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginUser, clearAuthErrors } from 'src/store';
import styles from './styles.module.scss';
import { useEffect } from 'react';

export const LoginForm = () => {
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
    dispatch(loginUser(data));
  };

  return (
    <div className={styles.wrapper}>
      <h3>Login</h3>
      <form
        className={styles.formWrapper}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className={styles.inputWrapper}>
          <Input
            label="Email"
            labelRequiredMark
            error={errors.email && 'email'}
            {...register('email', { required: true })}
          />
        </div>
        <div className={styles.inputWrapper}>
          <PasswordInput
            label="Password"
            labelRequiredMark
            error={(errors.password?.message as string) || authError}
            {...register('password', { required: true })}
          />
        </div>
        {/* {authError && <div className={styles.backendError}>{authError}</div>} */}
        <Button type="submit">
          {isLoading ? <Spinner size="sm" color={'white'} /> : 'Login'}
        </Button>
        <div className={styles.registerCaption}>
          Don`t have an account? <Link to={SPARoutes.REGISTER}>Register</Link>
        </div>
      </form>
    </div>
  );
};
