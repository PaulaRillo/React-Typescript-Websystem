import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Alert, Box, Button, Typography } from '@mui/material';
import core from 'core.v2';
import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { SyntheticEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDestinationAccounts } from 'shared/api/queries/useGetDestinationAccounts';
import { Loading } from 'shared/components/Loading';
import { tr } from 'shared/translate';
import { DestinationAccountInfo } from '../DestinationAccountInfo';
import * as styles from './styles';

type Props = {
  invoice: Invoice;
};

export const DestinationAccountList = ({ invoice }: Props) => {
  const { data, isLoading, refetch, isRefetching } = useGetDestinationAccounts(
    invoice.invoiceFrom.id
  );

  useEffect(() => {
    if (data?.length === 0) {
      refetch();
    }
  }, [data?.length, refetch]);

  const handleChangeDestination = useCallback(
    (destination: DestinationAccountType) => {
      core.store.paymentRequest.setInvoiceDestinationAccount(
        invoice.id,
        destination
      );
    },
    [invoice]
  );

  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (event: SyntheticEvent) => {
      navigate(event.currentTarget.getAttribute('data-path') as string);
    },
    [navigate]
  );

  if (isLoading || isRefetching) {
    return (
      <Box sx={styles.container}>
        <Box sx={{ p: 1.5, height: 120 }}>
          <Loading size={24} />
        </Box>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={styles.container}>
        <>No data</>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      {data.length === 0 && (
        <Alert
          severity="warning"
          variant="outlined"
          title={tr('shared.missingCurrency.error.settings')}
          sx={{ width: 'fit-content' }}
        >
          <Typography variant="body2" mb={1}>
            {tr('shared.missingCurrency.error.settings')}
          </Typography>
          <Button
            color="warning"
            endIcon={<ArrowForwardRoundedIcon />}
            data-path={`/vendors/${invoice.invoiceFrom.visualId}/settings/payment-methods`}
            onClick={handleNavigate}
          >
            <Typography variant="button" py={1} sx={{ lineHeight: 1.2 }} noWrap>
              {tr('shared.settingsVendor.button')}
            </Typography>
          </Button>
        </Alert>
      )}
      {data.map((destination) => {
        return (
          <Box
            key={destination.redactedBankAccountNumber}
            sx={styles.buttonContainer}
          >
            <DestinationAccountInfo destination={destination} />
            <Button
              sx={styles.button}
              onClick={() => handleChangeDestination(destination)}
            >
              <Box sx={styles.info}>
                <Typography variant="caption" fontWeight={500}>
                  {`${destination?.currencyCode ?? '-'} ${
                    destination?.accountAlias ?? tr('destination_account')
                  }`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {destination.redactedBankAccountNumber}
                </Typography>
              </Box>
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};
