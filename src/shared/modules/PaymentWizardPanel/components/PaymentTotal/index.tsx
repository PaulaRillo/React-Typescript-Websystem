import core from 'core.v2';
import { tr } from 'shared/translate';
import { useEffect, useState } from 'react';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import { PaymentPanelInfo } from '../PaymentPanelInfo';

export const PaymentTotal = () => {
  const { formatCurrency } = useFormatValue();
  const [total, setTotal] = useState<number>(0);
  const [currencyCode, setCurrencyCode] = useState<string | undefined>();

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setTotal(data.total);
        setCurrencyCode(data.originAccount?.currencyCode);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  if (!currencyCode) {
    return <PaymentPanelInfo title={tr('shared.paymentTotal')} />;
  }

  return (
    <PaymentPanelInfo
      title={tr('shared.paymentTotal')}
      value={formatCurrency(currencyCode, total)}
    />
  );
};
