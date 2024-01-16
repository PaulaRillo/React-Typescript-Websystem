import { Box, Button, Typography } from '@mui/material';
import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { tr } from 'shared/translate';
import { useCallback, useEffect } from 'react';
import { useGetDestinationAccounts } from 'shared/api/queries/useGetDestinationAccounts';
import { Loading } from 'shared/components/Loading';
import { DestinationAccountInfo } from '../DestinationAccountInfo';
import * as styles from './styles';

type Props = {
  invoice: Invoice;
};

export const DestinationAccountList = ({ invoice }: Props) => {
  const { data, isLoading, refetch, isRefetching } = useGetDestinationAccounts(invoice.invoiceFrom.id); //prettier-ignore

  useEffect(() => {
    if (data?.length === 0) {
      refetch();
    }
  }, [data?.length, refetch]);

  const handleChangeDestination = useCallback(
    (destination: DestinationAccountType) => {
      invoice.setDestinationAccount(destination);
    },
    [invoice]
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
