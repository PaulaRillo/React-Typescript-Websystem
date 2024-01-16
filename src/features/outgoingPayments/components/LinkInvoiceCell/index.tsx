import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const LinkInvoiceCell = ({ value, data }: Props) => {
  const navigate = useNavigate();

  const bill = data.bill;

  const handleClick = () => {
    navigate(`/bills/${bill.id}`);
  };

  return (
    <Box onClick={handleClick} sx={styles.container}>
      {value}
    </Box>
  );
};
