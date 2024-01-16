import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Modal } from 'shared/components/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import * as styles from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { tr } from 'shared/translate';
import { Spacer } from 'shared/components/Spacer';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Inputs = {
  [x: string]: string;
};

export const NewBankModal = ({ open, onClose }: Props) => {
  const schema = yup
    .object({
      name: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: tr('shared.name') })
        ),
      code: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: tr('shared.code') })
        ),
      agency: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: tr('shared.agency') })
        ),
      account: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('shared.account')
        })
      ),
      holder: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: tr('shared.holder') })
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
    console.log(data);
  };

  return (
    <Modal open={open} maxWidth="md" onClose={onClose}>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography variant="h6">
            {tr('vendors.vendor.settings.paymentMethods.banks.modal.title')}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={styles.body}>
          <Box
            component="form"
            sx={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              required
              autoFocus
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              label={tr('shared.name')}
              sx={styles.textField}
              {...register('name')}
            />
            <TextField
              required
              autoComplete="code"
              error={!!errors.code}
              helperText={errors.code?.message}
              label={tr('shared.code')}
              sx={styles.textField}
              {...register('code')}
            />
            <TextField
              required
              autoComplete="agency"
              error={!!errors.agency}
              helperText={errors.agency?.message}
              label={tr('shared.agency')}
              sx={styles.textField}
              {...register('agency')}
            />
            <TextField
              required
              autoComplete="account"
              error={!!errors.account}
              helperText={errors.account?.message}
              label={tr('shared.account')}
              sx={styles.textField}
              {...register('account')}
            />
            <TextField
              required
              autoComplete="holder"
              error={!!errors.holder}
              helperText={errors.holder?.message}
              label={tr('shared.holder')}
              sx={styles.textField}
              {...register('holder')}
            />
            <Spacer />
            <Box sx={styles.formFooter}>
              <Button color="primary" onClick={onClose}>
                {tr('shared.cancel')}
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {tr('shared.save')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
