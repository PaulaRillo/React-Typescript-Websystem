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
import { useAuth } from 'features/auth/hooks/useAuth';
import { AuthError } from '../AuthError';
import * as styles from './styles';

type Inputs = {
  [x: string]: string;
};

export const ResetPasswordConfirmationForm = () => {
  const { isLoading, resetPasswordConfirmation } = useAuth();

  const translation = {
    newPasswordRequired: tr('shared.form.validations.required', {
      value: tr('shared.newPassword')
    }),
    confirmNewPasswordRequired: tr('shared.form.validations.required', {
      value: tr('auth.resetPasswordConfirmation.confirmNewPassword')
    }),
    min10: tr('shared.form.validations.min', { value: 10 }),
    lowercase: tr('shared.form.validations.contains.atLeast.lowercase'),
    uppercase: tr('shared.form.validations.contains.atLeast.uppercase'),
    number: tr('shared.form.validations.contains.atLeast.number'),
    special: tr('shared.form.validations.contains.atLeast.special'),
    match: tr('shared.form.validations.match', {
      value01: tr('shared.newPassword'),
      value02: tr('auth.resetPasswordConfirmation.confirmNewPassword')
    })
  };

  const schema = yup
    .object({
      verificationCode: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('shared.verificationCode')
        })
      ),
      newPassword: yup
        .string()
        .required(translation.newPasswordRequired)
        .min(10, translation.min10)
        .matches(/([a-z])/, translation.lowercase)
        .matches(/([A-Z])/, translation.uppercase)
        .matches(/([0-9])/, translation.number)
        .matches(/([^A-Za-z0-9])/, translation.special),
      confirmNewPassword: yup
        .string()
        .test('passwords-match', translation.match, function (value) {
          return this.parent.newPassword === value;
        })
        .required(translation.confirmNewPasswordRequired)
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = ({
    verificationCode,
    newPassword
  }) => {
    resetPasswordConfirmation(verificationCode, newPassword);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthError />
      <Box sx={styles.inputs}>
        <TextField
          autoFocus
          required
          type="text"
          autoComplete="verificationCode"
          error={!!errors.verificationCode}
          helperText={errors.verificationCode?.message}
          label={tr('shared.verificationCode')}
          {...register('verificationCode')}
        />
        <TextField
          required
          type="password"
          autoComplete="password"
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          label={tr('shared.newPassword')}
          {...register('newPassword')}
        />
        <TextField
          required
          type="password"
          autoComplete="password"
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword?.message}
          label={tr('auth.resetPasswordConfirmation.confirmNewPassword')}
          {...register('confirmNewPassword')}
        />
      </Box>
      <Button variant="contained" color="primary" size="large" type="submit">
        {isLoading && <CircularProgress color="secondary" size={24} />}
        {!isLoading && `${tr('shared.reset')} ${tr('shared.password')}`}
      </Button>
    </Box>
  );
};
