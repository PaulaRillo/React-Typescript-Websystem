import { Box, Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const RequesterCell = ({ data }: Props) => {
  const firstName = data.requester.firstName;
  const lastName = data.requester.lastName;

  return (
    <Box sx={styles.container}>
      <Typography variant="body2">
        {firstName} {lastName}
      </Typography>
    </Box>
  );
};
