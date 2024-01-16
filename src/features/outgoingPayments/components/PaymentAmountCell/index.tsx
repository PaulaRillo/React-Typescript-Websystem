import { Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const PaymentAmountCell = ({ data }: Props) => {
  const currency = data?.payment_amount?.isoCode ?? data?.currency?.symbol;
  const value = data?.payment_amount?.value ?? data?.totalAmountPaid;

  return (
    <Typography variant="body2" sx={styles.title}>
      {currency} {value}
    </Typography>
  );
};
