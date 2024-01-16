import core from 'core.v2';
import { tr } from 'shared/translate';
import { useEffect, useState } from 'react';
import { PaymentPanelInfo } from '../PaymentPanelInfo';

type Props = {
  title: string;
  value?: string | JSX.Element;
};

export const CurrentCurrency = ({ title }: Props) => {
  const [currencyCode, setCurrencyCode] = useState<string | null>(null);

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setCurrencyCode(data?.originAccount?.currencyCode);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  return (
    <PaymentPanelInfo
      title={title}
      value={currencyCode || ''}
    />
  );
};
