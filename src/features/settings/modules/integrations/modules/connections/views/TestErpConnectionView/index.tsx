//material-ui
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//resources
import { useForm, SubmitHandler } from 'react-hook-form';
//translate
import { tr } from 'shared/translate';
//validator
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as styles from './styles';
import { useIntegration } from '../../hooks/useIntegration';

type Inputs = {
  [key: string]: string;
};

export const TestErpConnectionView = () => {
  const {
    error,
    isLoading,
    isConnectionSuccessful,
    isTestFinished,
    selectedERP,
    disableNextStep,
    handleTestSapErpConnection
  } = useIntegration();

  useEffect(() => {
    disableNextStep();
  }, [disableNextStep]);

  const schema = yup
    .object({
      host: yup
        .string()
        .url('Invalid URL')
        .required(tr('shared.form.validations.required', { value: 'Host' })),
      dbname: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: 'Database name' })
        ),
      username: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: 'Username' })
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

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      handleTestSapErpConnection({
        host: data.host,
        credentials: {
          dbname: data.dbname,
          username: data.username,
          password: data.password
        }
      });
    },
    [handleTestSapErpConnection]
  );

  return (
    <Box sx={styles.container}>
      <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Box sx={styles.error}>
            <Typography variant="body2" color="error">
              {tr(`shared.error.${error.code}`)}
            </Typography>
          </Box>
        )}
        <Box sx={styles.inputs}>
          <TextField
            value={selectedERP?.toUpperCase()}
            disabled={true}
            label="ERP / Accounting software"
            sx={styles.textField}
          />
          <TextField
            autoFocus
            type="text"
            autoComplete="host"
            label="Host"
            error={!!errors.host}
            helperText={errors.host?.message}
            sx={styles.textField}
            {...register('host')}
          />
          <TextField
            type="text"
            autoComplete="dbname"
            label="Database name"
            error={!!errors.dbname}
            helperText={errors.dbname?.message}
            sx={styles.textField}
            {...register('dbname')}
          />
          <TextField
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username?.message}
            label="username"
            sx={styles.textField}
            {...register('username')}
          />
          <TextField
            autoComplete="password"
            type="password"
            label={tr('shared.password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={styles.textField}
            {...register('password')}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: 'fit-content', mr: 2 }}
            >
              {tr(
                'settings.integrations.connectionSetup.testErpConnection.button.label'
              )}
            </Button>
            {isLoading && <CircularProgress color="secondary" size={20} />}
          </Box>
          {isTestFinished && (
            <Box sx={{ display: 'flex', alignCenter: 'center' }}>
              {isConnectionSuccessful && <CheckCircleIcon color="success" />}
              {!isConnectionSuccessful && <CancelIcon color="error" />}
              <Typography ml={1}>
                {isConnectionSuccessful &&
                  tr(
                    'settings.integrations.connectionSetup.testErpConnection.success'
                  )}
                {!isConnectionSuccessful &&
                  tr(
                    'settings.integrations.connectionSetup.testErpConnection.failure'
                  )}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
