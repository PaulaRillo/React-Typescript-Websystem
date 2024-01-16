//material-ui
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
//resources
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/constants/path';
//validator
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';
import { useAuth } from 'features/auth/hooks/useAuth';
import { SyntheticEvent, useCallback } from 'react';

type Inputs = {
  [x: string]: unknown;
};

export const MfaForm = () => {
  const { confirmSignIn, error, isLoading } = useAuth();

  const schema = yup
    .object({
      mfaCode: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('auth.mfa.mfaCode')
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
    const mfaCode = data.mfaCode as string;
    confirmSignIn(mfaCode, 'SMS_MFA');
  };

  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (event: SyntheticEvent) => {
      navigate(event.currentTarget.getAttribute('data-path') as string);
    },
    [navigate]
  );

  return (
    <Box
      component="form"
      noValidate
      sx={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <Box sx={styles.error}>
          <Typography variant="body2" color="error">
            {tr(`shared.error.${error.code}`)}
          </Typography>
        </Box>
      )}
      <TextField
        autoFocus
        required
        error={!!errors.mfaCode}
        helperText={errors.mfaCode?.message}
        label={tr('auth.mfa.mfaCode')}
        {...register('mfaCode')}
      />
      <Box sx={styles.actions}>
        <Button variant="contained" color="primary" size="large" type="submit">
          {!isLoading && tr('auth.mfa.authenticate')}
          {isLoading && <CircularProgress color="secondary" size={24} />}
        </Button>
        <Button
          variant="text"
          color="primary"
          size="large"
          data-path={path.root}
          onClick={handleNavigate}
        >
          {tr('shared.cancel')}
        </Button>
      </Box>
    </Box>
  );
};
