//material-ui
import { Box, Button, TextField } from '@mui/material';
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

export const NewPasswordRequiredForm = () => {
  const { completeNewPassword } = useAuth();

  const translation = {
    passwordRequired: tr('shared.form.validations.required', {
      value: tr('shared.password')
    }),
    min10: tr('shared.form.validations.min', { value: 10 }),
    lowercase: tr('shared.form.validations.contains.atLeast.lowercase'),
    uppercase: tr('shared.form.validations.contains.atLeast.uppercase'),
    number: tr('shared.form.validations.contains.atLeast.number'),
    special: tr('shared.form.validations.contains.atLeast.special')
  };

  const schema = yup
    .object({
      password: yup
        .string()
        .required(translation.passwordRequired)
        .min(10, translation.min10)
        .matches(/([a-z])/, translation.lowercase)
        .matches(/([A-Z])/, translation.uppercase)
        .matches(/([0-9])/, translation.number)
        .matches(/([^A-Za-z0-9])/, translation.special)
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
    completeNewPassword(password);
  };

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
        error={!!errors.password}
        helperText={errors.password?.message}
        label={tr('shared.password')}
        {...register('password')}
      />
      <Button variant="contained" color="primary" size="large" type="submit">
        {tr('auth.newPassword.button.label')}
      </Button>
    </Box>
  );
};
