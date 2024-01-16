//material-ui
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Checkbox,
  Typography
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//resources
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
//core-components
import { Modal } from 'shared/components/Modal';
import { ModalHeader } from 'shared/components/Modal/components/ModalHeader';
import { ModalActions } from 'shared/components/Modal/components/ModalActions';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
//validator
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

type Props = {
  open: boolean;
  data?: CellRenderProps;
  onClose: () => void;
};

type Inputs = {
  [x: string]: string;
};

type ISelect = {
  label: string;
  type: 'group' | 'user';
  value: object;
};

export const ApprovalGroupCreateModal = ({ open, onClose }: Props) => {
  const [approvers] = useState<ISelect[]>([
    {
      label: 'John Doe',
      type: 'user',
      value: {
        id: '123',
        firstname: 'John',
        lastname: 'Doe'
      }
    },
    {
      label: 'Paula Rillo',
      type: 'user',
      value: {
        id: '234',
        firstname: 'Paula',
        lastname: 'Rillo'
      }
    },
    {
      label: 'Raphael Joer',
      type: 'user',
      value: {
        id: '345',
        firstname: 'Raphael',
        lastname: 'Joer'
      }
    }
  ]);

  const schema = yup
    .object({
      approvalGroupName: yup
        .string()
        .max(100, tr('shared.form.validations.max100'))
        .required(
          tr('shared.form.validations.required', { value: tr('shared.name') })
        ),
      approvers: yup.mixed()
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = ({
    approvers,
    approvalGroupName
  }) => {
    onClose();
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Modal fullWidth={true} maxWidth="md" open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <ModalHeader
          title={tr('settings.accounting.billApprovalPolicyGroup.create')}
          divider
          onClose={onClose}
        />
        <Box
          component="form"
          sx={styles.fullwidth}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={styles.inputs}>
            <TextField
              required
              id="approvalGroupName"
              autoFocus
              error={!!errors.approvalGroupName}
              helperText={
                errors.approvalGroupName
                  ? errors.approvalGroupName.message
                  : tr('shared.form.validations.max100')
              }
              label={tr(
                'settings.accounting.billApprovalPolicyGroup.fieldName'
              )}
              sx={styles.fullwidth}
              {...register('approvalGroupName')}
            />
            <Typography variant="body2">
              {tr('settings.accounting.billApprovalPolicyGroup.description')}
            </Typography>
            <Autocomplete
              multiple
              id="approvers"
              options={approvers}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              groupBy={(option) => option.type.toUpperCase()}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
              sx={styles.fullwidth}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Approvers"
                    placeholder="Approvers"
                    error={!!errors.approvers}
                    helperText={errors.approvers?.message}
                    {...register('approvers')}
                  />
                );
              }}
            />
          </Box>
          <ModalActions divider>
            <Button onClick={onClose}>{tr('shared.cancel')}</Button>
            <Button variant="contained" type="submit">
              {tr('shared.save')}
            </Button>
          </ModalActions>
        </Box>
      </Box>
    </Modal>
  );
};
