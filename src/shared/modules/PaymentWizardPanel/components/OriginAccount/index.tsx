import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { Box, Button, Typography } from '@mui/material';
import core from 'core.v2';
import { OriginAccount as Origin } from 'core.v2/domain/origin-account/entity/origin-account';
import { tr } from 'shared/translate';
import { useEffect, useState } from 'react';
import { useGetOrigins } from 'shared/api/queries/useGetOrigins';
import { Loading } from 'shared/components/Loading';
import { Popover } from 'shared/components/Popover';
import { OriginAccountList } from '../OriginAccountList';
import * as styles from './styles';

export const OriginAccount = () => {
  const [isEditable, setIsEditable] = useState(true);
  const { isLoading } = useGetOrigins();
  const [originAccount, setOriginAccount] = useState<Origin | null>(null);

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setOriginAccount(data.originAccount);
        setIsEditable(data.isEditable);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
        sx={styles.popover}
      >
        <OriginAccountList />
      </Popover>
      <Button
        variant="outlined"
        endIcon={isLoading ? <Loading size={16} /> : <UnfoldMoreOutlinedIcon />}
        sx={styles.button}
        onClick={handleOpen}
        disabled={isLoading || !isEditable}
      >
        <Box sx={styles.info}>
          {originAccount && (
            <Box sx={styles.titleContainer}>
              <Typography
                variant="caption"
                fontWeight={500}
                color="primary.main"
              >
                {originAccount?.currencyCode || ''}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={500}
                color="primary.main"
              >
                {originAccount?.accountAlias || ''}
              </Typography>
            </Box>
          )}
          {!originAccount && (
            <Typography variant="caption" fontWeight={500} color="grey.500">
              {tr('shared.selectOriginAccount')}
            </Typography>
          )}
          <Typography
            variant="caption"
            color={originAccount ? 'text.secondary' : 'grey.400'}
          >
            {originAccount?.redactedBankAccountNumber || 'XXXX-XXXX-XXXX'}
          </Typography>
        </Box>
      </Button>
    </>
  );
};
