import { Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const InvoiceTotalCell = ({ data }: Props) => {
  const currency = data.currency.id;
  const value = Number(data.bill.invoiceTotal).toFixed(2);

  return (
    <Typography variant="body2" sx={styles.title}>
      {currency} {value}
    </Typography>
  );
};
