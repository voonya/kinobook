import { useState } from 'react';
import { Input, Button, PasswordInput, Spinner } from '@components';
import { Link } from 'react-router-dom';
import { SPARoutes } from '@common';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState('');

  const onSubmit = (data: any) => {
    setLoading(true);
    setBackendError('');

    fetch('http://localhost:8080/api/auth/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 400) {
          setBackendError(data.message[0]);
        }
      })
      .finally(() => setLoading(false));
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
            error={errors.password && 'password'}
            {...register('password', { required: true })}
          />
        </div>
        {backendError && (
          <div className={styles.backendError}>{backendError}</div>
        )}
        <Button type="submit">
          {loading ? <Spinner size="sm" color={'white'} /> : 'Зареєструватись'}
        </Button>
        <div className={styles.loginCaption}>
          Вже маєте акаунт? <Link to={SPARoutes.LOGIN}>Увійдіть</Link>
        </div>
      </form>
    </div>
  );
};
