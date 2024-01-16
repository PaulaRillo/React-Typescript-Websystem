import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl
} from '@mui/material';
import { Modal } from 'shared/components/Modal';
import { ModalHeader } from 'shared/components/Modal/components/ModalHeader';
import { ModalActions } from 'shared/components/Modal/components/ModalActions';
import * as styles from './styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { tr } from 'shared/translate';
import { useState } from 'react';
import { CellRenderProps } from 'shared/grids/DataGrid/types';

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
  value: string;
};

export const BillApprovalPolicyRuleEditModal = ({
  open,
  data,
  onClose
}: Props) => {
  const schema = yup
    .object({
      criteria: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: 'Criteria' })
        ),
      condition: yup
        .string()
        .required(
          tr('shared.form.validations.required', { value: 'condition' })
        ),
      value: yup
        .string()
        .required(tr('shared.form.validations.required', { value: 'value' }))
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [criterias] = useState<ISelect[]>([
    {
      label: 'Bill Amount',
      value: 'billAmount'
    },
    {
      label: 'Vendor',
      value: 'vendor'
    }
  ]);

  const [conditions] = useState<ISelect[]>([
    {
      label: 'Less than',
      value: 'lessThan'
    },
    {
      label: 'Greater than',
      value: 'greaterThan'
    },
    {
      label: 'Equal to',
      value: 'equalTo'
    }
  ]);

  const onSubmit: SubmitHandler<Inputs> = ({ criteria, condition, value }) => {
    onClose();
  };

  return (
    <Modal fullWidth={true} maxWidth="md" open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <ModalHeader title="Edit Policy Rule" divider onClose={onClose} />
        <Box
          component="form"
          sx={{ width: '100%' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={styles.inputs}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="criteria-select-label">Criteria</InputLabel>
              <Select
                required
                labelId="criteria-select-label"
                label="criteria"
                sx={styles.input}
                {...register('criteria')}
              >
                {criterias.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="condition-select-label">Condition</InputLabel>
              <Select
                required
                labelId="condition-select-label"
                label="condition"
                sx={styles.input}
                {...register('condition')}
              >
                {conditions.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              error={!!errors.value}
              helperText={errors.value?.message}
              label="value"
              sx={styles.input}
              {...register('value')}
            />
          </Box>
          <ModalActions divider>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" type="submit">
              {tr('shared.save')}
            </Button>
          </ModalActions>
        </Box>
      </Box>
    </Modal>
  );
};
