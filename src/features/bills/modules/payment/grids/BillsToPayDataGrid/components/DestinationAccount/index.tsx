import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { Box, Button, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { useCallback, useMemo, useState } from 'react';
import { useGetDestinationAccounts } from 'shared/api/queries/useGetDestinationAccounts';
import { AlertPopoverButton } from 'shared/components/AlertPopoverButton';
import { Loading } from 'shared/components/Loading';
import { Popover } from 'shared/components/Popover';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { IAlert } from 'shared/types/alert';
import { DestinationAccountList } from '../DestinationAccountList';
import * as styles from './styles';

type Props = CellRenderProps;

export const DestinationAccount = ({ value, data }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { isLoading } = useGetDestinationAccounts(data.invoiceFrom.id);

  const alert = useMemo<IAlert>(
    () => ({
      severity: 'error',
      title: tr(
        'bills.payment.billsToPay.destinationAccount.error.required.title'
      ),
      message: tr(
        'bills.payment.billsToPay.destinationAccount.error.required.message'
      )
    }),
    []
  );

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
        <DestinationAccountList invoice={data} />
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
          endIcon={
            isLoading ? <Loading size={16} /> : <UnfoldMoreOutlinedIcon />
          }
          sx={styles.button}
          onClick={handleOpen}
        >
          <Box sx={styles.info}>
            <Typography
              variant="caption"
              fontWeight={500}
              color={value ? 'primary.main' : 'grey.500'}
            >
              {value &&
                `${value.currencyCode} ${
                  value.accountAlias ?? tr('destination_account')
                }`}
              {!value && tr('shared.selectDestinationAccount')}
            </Typography>
            <Typography
              variant="caption"
              color={value ? 'text.secondary' : 'grey.400'}
            >
              {value?.redactedBankAccountNumber || 'XXXX-XXXX-XXXX'}
            </Typography>
          </Box>
        </Button>
        <Box sx={styles.alertContainer}>
          {!value && <AlertPopoverButton alert={alert} />}
        </Box>
      </Box>
    </>
  );
};
