//material-ui
import { Box, TextField } from '@mui/material';
import { useCallback } from 'react';
//resources
import { SubmitHandler, useForm } from 'react-hook-form';
//translate
import { tr } from 'shared/translate';
//validator
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSync } from '../../../../hooks/useSync';
import { Header } from '../../components/Header';
import * as styles from './styles';

type Inputs = {
  [key: string]: string;
};

type Props = {
  formRef: React.RefObject<HTMLFormElement>;
};

export const TestErpConnectionStep = ({ formRef }: Props) => {
  const { selectedERP, setSapErpConnectionInfo, testSapErpConnectionMutation } =
    useSync();

  const schema = yup
    .object({
      host: yup
        .string()
        .url('Invalid URL')
        .required(
          tr('shared.form.validations.required', { value: tr('shared.host') })
        ),
      dbname: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: tr('shared.dbname') })
        ),
      username: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('shared.username')
        })
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
      const input = {
        host: data.host,
        credentials: {
          dbname: data.dbname,
          username: data.username,
          password: data.password
        }
      };

      setSapErpConnectionInfo(input);
      testSapErpConnectionMutation.mutate(input);
    },
    [setSapErpConnectionInfo, testSapErpConnectionMutation]
  );

  return (
    <Box sx={styles.container}>
      <Header
        title={tr('shared.testConnection')}
        subTitle={tr('shared.testConnection.subTitle')}
      />
      <Box
        ref={formRef}
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={styles.inputs}>
          <TextField
            value={selectedERP?.toUpperCase()}
            disabled={true}
            label={`${tr('shared.erp')} / ${tr('shared.accountingSoftware')}`}
            sx={styles.textField}
          />
          <TextField
            autoFocus
            autoComplete="Host"
            label={tr('shared.host')}
            type="text"
            error={!!errors.host}
            helperText={errors.host?.message}
            sx={styles.textField}
            {...register('host')}
          />
          <TextField
            autoComplete="dbname"
            label={tr('shared.dbname')}
            type="text"
            error={!!errors.dbname}
            helperText={errors.dbname?.message}
            sx={styles.textField}
            {...register('dbname')}
          />
          <TextField
            autoComplete="username"
            label={tr('shared.username')}
            error={!!errors.username}
            helperText={errors.username?.message}
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
      </Box>
    </Box>
  );
};
