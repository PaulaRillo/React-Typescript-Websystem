import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Alert, Box, Button, Typography } from '@mui/material';
import core from 'core.v2';
import { OriginAccount } from 'core.v2/domain/origin-account/entity/origin-account';
import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOrigins } from 'shared/api/queries/useGetOrigins';
import { Loading } from 'shared/components/Loading';
import { tr } from 'shared/translate';
import { OriginAccountInfo } from '../OriginAccountInfo';
import * as styles from './styles';

export const OriginAccountList = () => {
  const { data, isLoading } = useGetOrigins();
  const navigate = useNavigate();

  const handleSelectOrigin = useCallback((originAccount: OriginAccount) => {
    core.store.paymentRequest.setOriginAccount(originAccount);
  }, []);

  const handleNavigate = useCallback(
    (event: SyntheticEvent) => {
      navigate(event.currentTarget.getAttribute('data-path') as string);
    },
    [navigate]
  );

  if (isLoading) {
    return (
      <Box sx={styles.loading}>
        <Loading size={24} />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      {data &&
        data?.map((originAccount) => {
          return (
            <Box
              key={originAccount.paymentMethodId}
              sx={styles.buttonContainer}
            >
              <Button
                sx={styles.button}
                onClick={() => handleSelectOrigin(originAccount)}
              >
                <Box sx={styles.info}>
                  <Box sx={styles.titleContainer}>
                    <Typography variant="caption" fontWeight={500}>
                      {`${originAccount?.currencyCode || ''}
                    ${originAccount?.accountAlias || ''}`}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {originAccount?.redactedBankAccountNumber || ''}
                  </Typography>
                </Box>
              </Button>
              <OriginAccountInfo origin={originAccount} />
            </Box>
          );
        })}
      {data?.length === 0 && (
        <Alert severity="info" variant="outlined">
          <Typography
            variant="body2"
            mb={1}
            sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: 280 }}
          >
            {tr('shared.error.originAccounts.pending')}
          </Typography>
          <Button
            color="info"
            size="small"
            endIcon={<ArrowForwardRoundedIcon />}
            data-path={'/settings/company/bank-accounts'}
            onClick={handleNavigate}
            sx={styles.warningButton}
          >
            <Typography variant="button" py={1} sx={{ lineHeight: 1.2 }} noWrap>
              {tr('shared.error.originAccounts.pendingButton')}
            </Typography>
          </Button>
        </Alert>
      )}
    </Box>
  );
};
