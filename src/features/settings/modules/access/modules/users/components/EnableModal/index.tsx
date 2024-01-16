import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useUserEnable } from 'shared/api/mutations/useUserEnable';
import { Loading } from 'shared/components/Loading';
import { ModalContainer, ModalHeader } from 'shared/components/Modal';
import { Modal } from 'shared/components/Modal/components/Modal';
import { useAlert } from 'shared/hooks/useAlert';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = {
  open: boolean;
  user: any;
  onClose: () => void;
};

export const EnableModal = ({ open, user, onClose }: Props) => {
  const queryClient = useQueryClient();

  const { alert } = useAlert();
  const {
    handleSubmit,
    formState: { errors }
  } = useForm({});
  const { mutate, isLoading } = useUserEnable();

  const onSubmit: SubmitHandler<any> = useCallback(
    async (params) => {
      alert({
        severity: 'info',
        title: tr('shared.userEnableLoading', {
          name: `${user?.firstName} ${user?.lastName}`
        }),
        autoHideDuration: 20000
      });
      mutate(
        { userId: user?.id, email: user?.email },
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
              title: tr('shared.userEnableSuccess', {
                name: `${user?.firstName} ${user?.lastName}`
              })
            });
          },
          onError: () => {
            alert({
              severity: 'error',
              title: tr('shared.userEnableError', {
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
        title={`${tr('shared.enable')} ${user?.firstName} ${user?.lastName}`}
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
              {tr('shared.userEnableInfo', {
                name: `${user?.firstName} ${user?.lastName}`
              })}
            </Typography>
            <Button
              variant="contained"
              color="error"
              size="large"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <Loading size={16} /> : tr('shared.enable')}
            </Button>
          </Stack>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
