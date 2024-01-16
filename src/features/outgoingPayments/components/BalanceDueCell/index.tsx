import { Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const BalanceDueCell = ({ data }: Props) => {
  // TODO: Apply transfer sum amount field
  // const currency =
  //   data?.balance_due?.isoCode ?? data?.apInvoice.currency.isoCode;
  // const value = data?.balance_due?.value ?? data?.apInvoice.balance_due?.value;

  const currency = data?.balance_due?.isoCode ?? data?.currency.symbol;
  const value = data?.balance_due?.value ?? data?.transferSumAmount;

  return (
    <Typography variant="body2" sx={styles.title}>
      {currency} {value}
    </Typography>
  );
};
