//material-ui
import { Box, Button, CircularProgress, TextField } from '@mui/material';
//resources
import { SubmitHandler, useForm } from 'react-hook-form';
//validator
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthError } from '../AuthError';
//translate
import { tr } from 'shared/translate';
//styles
import { useAuth } from 'features/auth/hooks/useAuth';
import { useCallback } from 'react';
import * as styles from './styles';

type Inputs = {
  [x: string]: unknown;
};

export const ResetPasswordForm = () => {
  const { isLoading, setView, resetPassword } = useAuth();

  const schema = yup
    .object({
      email: yup
        .string()
        .email(tr('shared.form.validations.email'))
        .required(
          tr('shared.form.validations.required', {
            value: tr('shared.email')
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    resetPassword(data.email as string);
  };

  const handleGoToSignIn = useCallback(() => {
    setView('SIGN_IN');
  }, [setView]);

  return (
    <Box
      component="form"
      noValidate
      sx={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthError />
      <TextField
        autoFocus
        required
        error={!!errors.email}
        autoComplete="email"
        helperText={errors.email?.message}
        label={tr('shared.email')}
        {...register('email')}
      />
      <Box sx={styles.actions}>
        <Button variant="contained" color="primary" size="large" type="submit">
          {isLoading && <CircularProgress color="secondary" size={24} />}
          {!isLoading && tr('shared.reset')}
        </Button>
        <Button color="primary" size="large" onClick={handleGoToSignIn}>
          {tr('shared.signIn')}
        </Button>
      </Box>
    </Box>
  );
};
