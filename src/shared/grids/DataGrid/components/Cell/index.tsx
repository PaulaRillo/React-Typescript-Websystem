import { Box } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const Cell = ({ value }: Props) => {
  return <Box sx={styles.container}>{value}</Box>;
};
