//material-ui
import { Box, Button, CircularProgress, TextField } from '@mui/material';
//resources
import { SubmitHandler, useForm } from 'react-hook-form';
//validator
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';
//hooks
import { useAuth } from 'features/auth/hooks/useAuth';
import { useCallback } from 'react';
import { AuthError } from '../AuthError';

type Inputs = {
  [x: string]: string;
};

export const SignInForm = () => {
  const { signIn, isLoading, setView } = useAuth();

  const schema = yup
    .object({
      login: yup
        .string()
        .email(tr('shared.form.validations.email'))
        .required(
          tr('shared.form.validations.required', { value: tr('shared.login') })
        ),
      password: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('shared.password')
        })
      )
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = ({ login, password }) => {
    signIn(login, password);
  };

  const handleGoToResetPassword = useCallback(() => {
    setView('RESET_PASSWORD');
  }, [setView]);

  return (
    <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <AuthError />
      <Box sx={styles.inputs}>
        <TextField
          required
          autoFocus
          autoComplete="username"
          error={!!errors.login}
          helperText={errors.login?.message}
          label={tr('shared.login')}
          sx={styles.textField}
          {...register('login')}
        />
        <TextField
          required
          type="password"
          autoComplete="password"
          label={tr('shared.password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={styles.textField}
          {...register('password')}
        />
      </Box>
      <Box sx={styles.actions}>
        <Button variant="contained" color="primary" size="large" type="submit">
          {isLoading && <CircularProgress color="secondary" size={24} />}
          {!isLoading && tr('auth.signIn.button')}
        </Button>
        <Button
          variant="text"
          color="primary"
          size="large"
          onClick={handleGoToResetPassword}
        >
          {tr('shared.forgotPassword')}
        </Button>
      </Box>
    </Box>
  );
};
