import { Box, Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const OriginAccountCell = ({ data }: Props) => {
  const title = data.originAccount.accountName;
  const account = data.originAccount.redactedAccountNumber;

  return (
    <Box sx={styles.container}>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="caption" sx={styles.caption}>
        {account}
      </Typography>
    </Box>
  );
};
