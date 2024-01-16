import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Info } from 'shared/components/Info';
import { Popover } from 'shared/components/Popover';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';
//translate
import { PaymentTermType } from 'core.v2/domain/invoice/types/payment-term.type';
import { tr } from 'shared/translate';

type Props = CellRenderProps & {
  value: PaymentTermType;
};

export const PaymentTermsCell = ({ value }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Popover
        id="grid-popover"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={styles.container}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Info title={tr('shared.additional_months') + ': '}>
              <Typography variant="caption">
                {value?.numberOfAdditionalMonths ?? ''}
              </Typography>
            </Info>
            <Info title={tr('shared.additional_days') + ': '}>
              <Typography variant="caption">
                {value?.numberOfAdditionalDays ?? ''}
              </Typography>
            </Info>
            <Info title={tr('shared.installments') + ': '}>
              <Typography variant="caption">
                {value?.numberOfInstallments ?? ''}
              </Typography>
            </Info>
            <Info title={tr('shared.tolerance_days') + ': '}>
              <Typography variant="caption">
                {value?.numberOfToleranceDays ?? ''}
              </Typography>
            </Info>
            <Info title={tr('shared.late_payment_interest_rate') + ': '}>
              <Typography variant="caption">
                {value?.latePaymentInterestRateCharge ?? ''}
              </Typography>
            </Info>
          </Box>
        </Box>
      </Popover>
      {value && (
        <Box sx={styles.cellContainer} onClick={handleOpen}>
          {value?.paymentTermsGroupName ?? ''}
          <IconButton aria-describedby="grid-popover" size="small">
            <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey.500' }} />
          </IconButton>
        </Box>
      )}
    </>
  );
};
