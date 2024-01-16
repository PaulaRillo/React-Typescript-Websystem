import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material';
//resources
import { SubmitHandler, useForm } from 'react-hook-form';
//validator
import { yupResolver } from '@hookform/resolvers/yup';
import core from 'core.v2';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { tr } from 'shared/translate';
import { useCallback, useState } from 'react';
import { Popover } from 'shared/components/Popover';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import { useNumbers } from 'shared/hooks/useNumbers';
import * as yup from 'yup';
import * as styles from './styles';

type Props = CellRenderProps;

type Inputs = {
  [x: string]: string;
};

export const PaymentAmountCell = ({ value, data }: Props) => {
  const invoice = data as Invoice;
  const balanceDue = invoice.summary.balanceDue.value;
  const { totalHtmlInputStep } = useNumbers();
  const { formatCurrency } = useFormatValue();

  const schema = yup
    .object({
      paymentAmount: yup
        .number()
        .typeError(tr('shared.error.generic.validValue'))
        .moreThan(
          0,
          tr('shared.form.validations.number.greaterThan', { value: 0 })
        )
        .max(
          balanceDue,
          tr('shared.form.validations.number.lessThan', {
            value: balanceDue
          })
        )
        .required(
          tr('shared.form.validations.required', {
            value: tr('shared.paymentAmount')
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

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    ({ paymentAmount }) => {
      core.store.paymentRequest.setInvoicePaymentAmount(
        invoice.id,
        Number(paymentAmount)
      );
    },
    [invoice.id]
  );

  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handleClose}
      >
        <Box
          component="form"
          sx={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            autoFocus
            {...register('paymentAmount')}
            label={tr('shared.paymentAmount')}
            size="small"
            error={!!errors.paymentAmount}
            helperText={
              errors?.paymentAmount?.message ||
              tr('shared.form.validations.number.range', {
                min: formatCurrency(invoice.currency.symbol, 0.01),
                max: formatCurrency(invoice.currency.symbol, balanceDue)
              })
            }
            defaultValue={value}
            type="number"
            InputProps={{
              inputProps: {
                step: totalHtmlInputStep()
              },
              startAdornment: (
                <InputAdornment position="start">
                  {invoice.currency.symbol || ''}
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
          >
            {tr('shared.save')}
          </Button>
        </Box>
      </Popover>
      <Box sx={styles.container}>
        {formatCurrency(invoice.currency.symbol, value)}
        <Tooltip title={tr('shared.edit')}>
          <IconButton size="small" onClick={handleOpen}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
