import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  BoxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { tr } from 'shared/translate';
import { forwardRef, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreationWizard } from 'shared/modules/CreationWizard';
import * as yup from 'yup';
import { useNewUser } from '../../hooks/useNewUser';
import * as styles from './styles';
import { useGetRoles } from 'shared/api/queries/useGetRoles';

export const UserRoles = forwardRef<HTMLFormElement, BoxProps>(
  function UserRoles(props, ref) {
    const { data, setData } = useNewUser();
    const { setActiveStep } = useCreationWizard();
    const { data: roles } = useGetRoles();

    const schema = yup
      .object({
        userRole: yup.string().required(
          // tr('shared.form.validations.required', {
          tr('shared.form.radio.validations.required', {
            value: tr('shared.userRoles')
          })
        )
      })
      .required();

    const {
      handleSubmit,
      control,
      formState: { errors }
    } = useForm({
      defaultValues: {
        userRole: data?.userRole || ''
      },
      resolver: yupResolver(schema)
    });

    const onSubmit = useCallback(
      ({ userRole }) => {
        setData((prev: any) => ({
          ...prev,
          role: { id: userRole, is_system_managed: true }
        }));
        setActiveStep((prev) => prev + 1);
      },
      [setActiveStep, setData, data]
    );

    const translateRoleName = (roleName: string) => {
      const translations: { [key: string]: string } = {
        Accountant: tr('shared.accountant'),
        Administrator: tr('shared.administrator'),
        Approver: tr('shared.approver'),
        Auditor: tr('shared.auditor'),
        Payer: tr('shared.payer')
      };
      return translations[roleName] || roleName;
    };

    return (
      <Box
        ref={ref}
        component="form"
        sx={styles.container}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <FormControl error={!!errors.userRole}>
          <FormLabel id="user-roles">{tr('shared.userRoles')}</FormLabel>
          <FormHelperText>{errors?.userRole?.message}</FormHelperText>
          <Controller
            rules={{ required: true }}
            control={control}
            name="userRole"
            render={({ field }) => (
              <RadioGroup {...field}>
                {roles &&
                  roles.length > 0 &&
                  roles.map((role: any) => {
                    return (
                      <FormControlLabel
                        key={role.id}
                        value={role.id}
                        control={<Radio />}
                        label={translateRoleName(role.name)}
                      />
                    );
                  })}
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>
    );
  }
);
