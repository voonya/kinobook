import { Input, Button, PasswordInput } from '@components';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
        <Button type="submit">Увійти</Button>
      </form>
    </div>
  );
};
