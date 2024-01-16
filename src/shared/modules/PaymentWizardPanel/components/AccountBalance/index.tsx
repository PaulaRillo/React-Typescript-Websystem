import { Typography, useTheme } from '@mui/material';
import core from 'core.v2';
import { OriginAccount } from 'core.v2/domain/origin-account/entity/origin-account';
import { tr } from 'shared/translate';
import { useEffect, useState } from 'react';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import { PaymentPanelInfo } from '../PaymentPanelInfo';

export const AccountBalance = () => {
  const { palette } = useTheme();
  const { formatCurrency } = useFormatValue();
  const [originAccount, setOriginAccount] = useState<OriginAccount | null>(
    null
  );

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setOriginAccount(data.originAccount);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  if (!originAccount) {
    return <PaymentPanelInfo title={tr('shared.accountBalance')} />;
  }

  return (
    <PaymentPanelInfo
      title={tr('shared.accountBalance')}
      value={
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: originAccount.isBalanceNegative
              ? palette.error.main
              : 'text.primary'
          }}
        >
          {formatCurrency(
            originAccount.currencyCode,
            originAccount.balanceInLocalCurrency
          )}
        </Typography>
      }
    />
  );
};
