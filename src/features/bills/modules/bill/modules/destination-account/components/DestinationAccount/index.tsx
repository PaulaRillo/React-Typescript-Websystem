import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { Box, Button, Typography } from '@mui/material';
import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { tr } from 'shared/translate';
import { useCallback, useEffect, useState } from 'react';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { Loading } from 'shared/components/Loading';
import { Popover } from 'shared/components/Popover';
import { DestinationAccountList } from '../DestinationAccountList';
import * as styles from './styles';

export const DestinationAccount = () => {
  const { data: invoice } = useGetInvoice();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [destinationAccount, setDestinationAccount] = useState<DestinationAccountType | undefined>(invoice?.destinationAccount); //prettier-ignore

  useEffect(() => {
    const listener = invoice?.on('InvoiceUpdated', ({ data }) => {
      setDestinationAccount(data.destinationAccount);
    });
    return () => {
      invoice?.off(listener || '');
    };
  }, [invoice]);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
        sx={styles.popover}
      >
        {invoice ? <DestinationAccountList invoice={invoice} /> : <></>}
      </Popover>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        <Button
          fullWidth
          endIcon={invoice ? <UnfoldMoreOutlinedIcon /> : <Loading size={16} />}
          sx={styles.button}
          onClick={handleOpen}
        >
          <Box sx={styles.info}>
            <Typography
              variant="caption"
              fontWeight={500}
              color={destinationAccount ? 'primary.main' : 'grey.500'}
            >
              {destinationAccount &&
                `${destinationAccount?.currencyCode} ${
                  destinationAccount?.accountAlias ?? tr('destination_account')
                }`}
              {!destinationAccount && tr('shared.selectDestinationAccount')}
            </Typography>
            <Typography
              variant="caption"
              color={destinationAccount ? 'text.secondary' : 'grey.400'}
            >
              {destinationAccount?.redactedBankAccountNumber ||
                'XXXX-XXXX-XXXX'}
            </Typography>
          </Box>
        </Button>
      </Box>
    </>
  );
};
