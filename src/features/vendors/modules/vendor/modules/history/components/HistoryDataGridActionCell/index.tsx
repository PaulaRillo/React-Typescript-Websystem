import { Box } from '@mui/material';
import { Action } from 'shared/components/Action';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const HistoryDataGridActionCell = ({ value }: Props) => {
  return (
    <Box sx={styles.container}>
      <Action action={value} />
    </Box>
  );
};
