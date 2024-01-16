import { Box, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const DestinationAccount = ({ value }: Props) => {
  return (
    <Box sx={styles.info}>
      <Typography
        variant="caption"
        fontWeight={500}
        color={value ? 'primary.main' : 'grey.500'}
      >
        {value && `${value.currency_code} ${value.account_alias}`}
        {!value && tr('shared.selectDestination')}
      </Typography>
      <Typography
        variant="caption"
        color={value ? 'text.secondary' : 'grey.400'}
      >
        {value?.redacted_bank_account_number || 'XXXX-XXXX-XXXX'}
      </Typography>
    </Box>
  );
};
