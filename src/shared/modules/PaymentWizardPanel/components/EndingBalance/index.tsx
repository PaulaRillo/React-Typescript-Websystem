import { Typography, useTheme } from '@mui/material';
import core from 'core.v2';
import { OriginAccount } from 'core.v2/domain/origin-account/entity/origin-account';
import { tr } from 'shared/translate';
import { useEffect, useState } from 'react';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import { PaymentPanelInfo } from '../PaymentPanelInfo';

export const EndingBalance = () => {
  const { palette } = useTheme();
  const { formatCurrency } = useFormatValue();

  const [originAccount, setOriginAccount] = useState<OriginAccount>();
  const [isBalanceSufficient, setIsBalanceSufficient] = useState<boolean | undefined>(); //prettier-ignore
  const [endingBalance, setEndingBalance] = useState<number>(0);

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setOriginAccount(data.originAccount);
        setEndingBalance(data.endingBalance);
        setIsBalanceSufficient(data.isBalanceSufficient);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  if (!originAccount) {
    return <PaymentPanelInfo title={tr('shared.endingBalance')} />;
  }

  return (
    <PaymentPanelInfo
      title={tr('shared.endingBalance')}
      value={
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: isBalanceSufficient ? 'text.primary' : palette.error.main
          }}
        >
          {formatCurrency(originAccount.currencyCode, endingBalance)}
        </Typography>
      }
    />
  );
};
