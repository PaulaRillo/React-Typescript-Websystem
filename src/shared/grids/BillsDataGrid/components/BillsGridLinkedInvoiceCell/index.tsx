import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const BillGridLinkedInvoiceCell = ({ data, value }: Props) => {
  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    navigate(`/bills/${data?.id}`);
  }, [data?.id, navigate]);

  if (!value)
    return (
      <Box sx={styles.loading}>
        <Loading size={16} />
      </Box>
    );

  return (
    <Box onClick={handleClick} sx={styles.container}>
      {value}
    </Box>
  );
};
