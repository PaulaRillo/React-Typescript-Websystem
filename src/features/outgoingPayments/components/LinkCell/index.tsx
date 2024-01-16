import { Box, Link, Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const LinkCell = ({ value }: Props) => {
  return (
    <Typography variant="body2" sx={styles.title}>
      <Link underline="hover" sx={styles.link}>
        {value}
      </Link>
    </Typography>
  );
};
