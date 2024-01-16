import { Box } from '@mui/material';
import { HistoryDataGrid } from '../../components/HistoryDataGrid';
import * as styles from './styles';

export const HistoryView = () => {
  return (
    <Box sx={styles.container}>
      <HistoryDataGrid />
    </Box>
  );
};
