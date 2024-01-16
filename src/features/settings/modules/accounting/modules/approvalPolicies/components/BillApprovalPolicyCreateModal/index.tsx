//material-ui
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Autocomplete,
  Checkbox,
  IconButton
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
//core-components
import { Modal } from 'shared/components/Modal';
import { ModalHeader } from 'shared/components/Modal/components/ModalHeader';
import { ModalActions } from 'shared/components/Modal/components/ModalActions';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
//resources
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
//validator
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//translate
import { tr } from 'shared/translate';
//style
import * as styles from './styles';
import { AddCircleOutline } from '@mui/icons-material';

type Props = {
  open: boolean;
  data?: CellRenderProps;
  onClose: () => void;
};

type Inputs = {
  [x: string]: string;
};

type GSelect = {
  label: string;
  type: 'group' | 'user';
  value: object;
};

type ISelect = {
  label: string;
  value: string;
};

export const BillApprovalPolicyCreateModal = ({
  open,
  data,
  onClose
}: Props) => {
  const [rulesFields, setRulesFields] = useState([{ rulesInputs: '' }]);

  const addRulesFields = () => {
    setRulesFields([...rulesFields, { rulesInputs: '' }]);
  };

  const removeRulesFields = (i: number) => {
    const newRulesFields = [...rulesFields];
    newRulesFields.splice(i, 1);
    setRulesFields(newRulesFields);
  };

  const [approvers] = useState<GSelect[]>([
    {
      label: 'Managers',
      type: 'group',
      value: {
        id: '345',
        firstname: 'Raphael',
        lastname: 'Joer'
      }
    },
    {
      label: 'HR Managers',
      type: 'group',
      value: {
        id: '345',
        firstname: 'Raphael',
        lastname: 'Joer'
      }
    },
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

  const schema = yup
    .object({
      criteria: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('settings.accounting.billApprovalPolicies.fieldCriteria')
        })
      ),
      condition: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('settings.accounting.billApprovalPolicies.fieldCondition')
        })
      ),
      value: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('settings.accounting.billApprovalPolicies.fieldValue')
        })
      ),
      policyName: yup
        .string()
        .max(100, tr('shared.form.validations.max100'))
        .required(
          tr('shared.form.validations.required', {
            value: tr('settings.accounting.billApprovalPolicies.fieldName')
          })
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
    policyName,
    criteria,
    condition,
    value,
    approvers
  }) => {
    onClose();
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Modal fullWidth={true} maxWidth="md" open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <ModalHeader
          title={tr('settings.accounting.billApprovalPolicies.create')}
          divider
          onClose={onClose}
        />
        <Box
          component="form"
          sx={{ width: '100%' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={styles.inputs}>
            <TextField
              required
              autoFocus
              id="policyName"
              error={!!errors.policyName}
              helperText={
                errors.policyName
                  ? errors.policyName.message
                  : tr('shared.form.helperText.max100')
              }
              label={tr('settings.accounting.billApprovalPolicies.fieldName')}
              sx={styles.input}
              {...register('policyName')}
            />
          </Box>
          <Typography variant="body2" sx={styles.label}>
            {tr('settings.accounting.billApprovalPolicies.description')}
          </Typography>
          <Box sx={styles.rule}>
            <Box sx={styles.inputs}>
              <FormControl sx={styles.input}>
                <InputLabel id="criteria-select-label">
                  {tr('settings.accounting.billApprovalPolicies.fieldCriteria')}
                </InputLabel>
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
                <InputLabel id="condition-select-label">
                  {tr(
                    'settings.accounting.billApprovalPolicies.fieldCondition'
                  )}
                </InputLabel>
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
                label={tr(
                  'settings.accounting.billApprovalPolicies.fieldValue'
                )}
                sx={styles.input}
                {...register('value')}
              />
            </Box>
          </Box>
          {rulesFields.map((e, index) => (
            <Box key={index} sx={styles.inputs}>
              <FormControl sx={styles.input}>
                <InputLabel id="criteria-select-label">
                  {tr('settings.accounting.billApprovalPolicies.fieldCriteria')}
                </InputLabel>
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
                <InputLabel id="condition-select-label">
                  {tr(
                    'settings.accounting.billApprovalPolicies.fieldCondition'
                  )}
                </InputLabel>
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
                label={tr(
                  'settings.accounting.billApprovalPolicies.fieldValue'
                )}
                sx={styles.input}
                {...register('value')}
              />
              <IconButton
                edge="start"
                color="inherit"
                aria-label="remove"
                onClick={() => removeRulesFields(index)}
                disableRipple
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          <Box sx={styles.addButton}>
            <Button
              variant="text"
              size="small"
              onClick={() => addRulesFields()}
              startIcon={<AddCircleOutline />}
            >
              {tr('settings.accounting.billApprovalPolicy.rule.add')}
            </Button>
          </Box>

          <Typography variant="body2" sx={styles.label}>
            {tr('settings.accounting.billApprovalPolicyGroup.description')}
          </Typography>
          <Box sx={styles.inputs}>
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
              sx={styles.input}
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
        </Box>
        <ModalActions divider>
          <Button onClick={onClose}>{tr('shared.cancel')}</Button>
          <Button variant="contained" type="submit">
            {tr('shared.save')}
          </Button>
        </ModalActions>
      </Box>
    </Modal>
  );
};
