import { Box, Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { getLocaleDateTime } from 'shared/utils/string/getLocaleDate';
import * as styles from './styles';

type Props = CellRenderProps;

export const DateCell = ({ value }: Props) => {
  const paymentDate = getLocaleDateTime(value) || '';

  return (
    <Box sx={styles.container}>
      <Typography variant="body2">{paymentDate}</Typography>
    </Box>
  );
};
