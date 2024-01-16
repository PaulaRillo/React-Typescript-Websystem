import { Box, TextField, Button, Typography } from '@mui/material';
import {
  Modal,
  ModalActions,
  ModalContainer,
  ModalHeader
} from 'shared/components/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { tr } from 'shared/translate';

import * as styles from './styles';
import { useCallback, useRef } from 'react';

type Inputs = {
  [x: string]: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CreateAccountModal = ({ open, onClose }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const schema = yup
    .object({
      alias: yup
        .string()
        .required(tr('shared.form.validations.required', { value: 'alias' })),
      bank_account_number: yup.string().required(
        tr('shared.form.validations.required', {
          value: 'bank account number'
        })
      ),
      bank_name: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: 'bank name' })
        ),
      bank_country: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: 'bank country' })
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

  const formRemoteSubmit = useCallback(() => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = ({ alias }) => {
    console.log(alias);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader divider title="Add Origin Account" onClose={onClose} />
      <ModalContainer sx={{ minWidth: 600 }}>
        <Box sx={styles.title}>
          <Typography variant="h5">New House Bank Account</Typography>
          <Typography variant="body2">
            Please fill out the new house bank account info to save to the
            vendor
          </Typography>
        </Box>
        <Box
          ref={formRef}
          component="form"
          sx={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            required
            autoFocus
            fullWidth
            autoComplete="alias"
            error={!!errors.alias}
            helperText={errors.alias?.message}
            label="Alias"
            {...register('alias')}
          />
          <TextField
            required
            autoFocus
            fullWidth
            autoComplete="bank_account_number"
            error={!!errors.bank_account_number}
            helperText={errors.bank_account_number?.message}
            label="Bank Account Number"
            {...register('bank_account_number')}
          />
          <TextField
            required
            autoFocus
            fullWidth
            autoComplete="bank_name"
            error={!!errors.bank_name}
            helperText={errors.bank_name?.message}
            label="Bank Name"
            {...register('bank_name')}
          />
          <TextField
            required
            autoFocus
            fullWidth
            autoComplete="bank_country"
            error={!!errors.bank_country}
            helperText={errors.bank_country?.message}
            label="Bank Country"
            {...register('bank_country')}
          />
        </Box>
      </ModalContainer>
      <ModalActions divider>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={formRemoteSubmit}
        >
          Create
        </Button>
      </ModalActions>
    </Modal>
  );
};
