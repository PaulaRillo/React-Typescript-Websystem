//material-ui
import { Box, BoxProps, TextField } from '@mui/material';
import * as styles from './styles';
//validator
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
//translate
import { useCreationWizard } from 'shared/modules/CreationWizard';
import { tr } from 'shared/translate';
import { useNewUser } from '../../hooks/useNewUser';
import { CountrySelect } from './components/CountrySelect';

type Inputs = {
  [key: string]: string;
};

export const UserDetails = forwardRef<HTMLFormElement, BoxProps>(
  function UserDetails(props, ref) {
    const { data, setData } = useNewUser();
    const { setActiveStep } = useCreationWizard();

    const schema = yup
      .object()
      .shape({
        first_name: yup.string().required(
          tr('shared.form.validations.required', {
            value: tr('shared.firstName')
          })
        ),
        middle_name: yup.string(),
        last_name: yup.string().required(
          tr('shared.form.validations.required', {
            value: tr('shared.lastName')
          })
        ),
        email: yup
          .string()
          .email(tr('shared.invalidEmail'))
          .required(
            tr('shared.form.validations.required', {
              value: tr('shared.email')
            })
          ),
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
      async ({
        first_name,
        middle_name,
        last_name,
        email,
      }) => {
        const payload = {
          first_name,
          middle_name,
          last_name,
          email,
        };
        setData(payload);
        setActiveStep((prev) => prev + 1);
      },
      [setActiveStep, setData]
    );

    return (
      <Box
        ref={ref}
        component="form"
        sx={styles.container}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <TextField
          autoFocus
          required
          type="text"
          autoComplete="First Name"
          defaultValue={data?.first_name || ''}
          label={`${tr('shared.firstName')}`}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          fullWidth
          {...register('first_name')}
        />
        <TextField
          type="text"
          defaultValue={data?.middle_name || ''}
          autoComplete="Middle Name"
          label={tr('shared.middleName')}
          error={!!errors.middle_name}
          helperText={errors.middle_name?.message}
          fullWidth
          {...register('middle_name')}
        />
        <TextField
          type="text"
          required
          autoComplete="Last Name"
          defaultValue={data?.last_name || ''}
          label={`${tr('shared.lastName')}`}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          {...register('last_name')}
        />
        <TextField
          required
          type="text"
          autoComplete="E-mail"
          defaultValue={data?.email || ''}
          label={`${tr('shared.email')}`}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          {...register('email')}
        />
      </Box>
    );
  }
);
