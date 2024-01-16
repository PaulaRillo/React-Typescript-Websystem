import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const LinkedInvoiceCell = ({ value, data }: Props) => {
  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    navigate(`/bills/${data.id}`);
  }, [data.id, navigate]);

  return (
    <Box onClick={handleClick} sx={styles.container}>
      {value}
    </Box>
  );
};
