import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useUserDisable } from 'shared/api/mutations/useUserDisable';
import { Loading } from 'shared/components/Loading';
import { ModalContainer, ModalHeader } from 'shared/components/Modal';
import { Modal } from 'shared/components/Modal/components/Modal';
import { useAlert } from 'shared/hooks/useAlert';
import { tr } from 'shared/translate';
import * as yup from 'yup';
import * as styles from './styles';

type Props = {
  open: boolean;
  user: any;
  onClose: () => void;
};

export const DisableModal = ({ open, user, onClose }: Props) => {
  const queryClient = useQueryClient();

  const { alert } = useAlert();
  const schema = yup
    .object({
      userEmail: yup.string().matches(
        user?.email,
        tr('shared.form.validations.match', {
          value01: 'email',
          value02: user?.email
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
  const { mutate, isLoading } = useUserDisable();

  const onSubmit: SubmitHandler<any> = useCallback(
    async (params) => {
      alert({
        severity: 'info',
        title: tr('shared.userDisableLoading', {
          name: `${user?.firstName} ${user?.lastName}`
        }),
        autoHideDuration: 20000
      });
      mutate(
        { userId: user?.id, email: params.userEmail },
        {
          onSuccess: () => {
            queryClient.setQueryData('@users', (prev: any) => {
              return prev?.map((item: any) => {
                if (item?.id !== user?.id) return item;
                return { ...item, statusId: '2' };
              });
            });
            queryClient.invalidateQueries('@users');
            alert({
              severity: 'success',
              title: tr('shared.userDisableSuccess', {
                name: `${user?.firstName} ${user?.lastName}`
              })
            });
          },
          onError: () => {
            alert({
              severity: 'error',
              title: tr('shared.userDisableError', {
                name: `${user?.firstName} ${user?.lastName}`
              })
            });
          },
          onSettled: () => {
            onClose();
          }
        }
      );
    },
    [
      alert,
      mutate,
      onClose,
      queryClient,
      user?.firstName,
      user?.id,
      user?.lastName
    ]
  );

  return (
    <Modal open={open} onClose={onClose} maxWidth={false}>
      <ModalHeader
        divider
        title={`${tr('shared.disable')} ${user?.firstName} ${user?.lastName}`}
        sx={{ bgcolor: 'grey.100' }}
        onClose={onClose}
      />
      <ModalContainer>
        <Box
          component="form"
          noValidate
          sx={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Typography textAlign="center">
              {tr('shared.userDisableInfo', {
                name: `${user?.firstName} ${user?.lastName}`
              })}
            </Typography>
            <TextField
              autoFocus
              required
              fullWidth
              error={!!errors.userEmail}
              helperText={errors.userEmail?.message}
              label={`${tr('shared.user')} ${tr('shared.email')}`}
              {...register('userEmail')}
            />

            <Button
              variant="contained"
              color="error"
              size="large"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <Loading size={16} /> : tr('shared.disable')}
            </Button>
          </Stack>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
