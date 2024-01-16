import { Button } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { tr } from 'shared/translate';

export const BillsActionsCell = () => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<CreditCardOutlinedIcon />}
      sx={{ height: 32 }}
    >
      {tr('shared.pay')}
    </Button>
  );
};
