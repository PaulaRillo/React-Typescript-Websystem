import { Box, Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const DestinationAccount = ({ value }: Props) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.info}>
        <Typography
          variant="caption"
          fontWeight={500}
          color={value ? 'primary.main' : 'grey.500'}
        >
          {value?.accountAlias || 'Select destination'}
        </Typography>
        <Typography
          variant="caption"
          color={value ? 'text.secondary' : 'grey.400'}
        >
          {value?.redactedBankAccountNumber || 'XXXX-XXXX-XXXX'}
        </Typography>
      </Box>
    </Box>
  );
};
