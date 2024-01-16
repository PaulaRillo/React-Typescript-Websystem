import core from 'core.v2';
import { tr } from 'shared/translate';
import { useEffect, useState } from 'react';
import { PaymentPanelInfo } from '../PaymentPanelInfo';

export const BillsSelected = () => {
  const [invoicesSelected, setInvoicesSelected] = useState<number>(0);

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setInvoicesSelected(data.invoices.length);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  return (
    <PaymentPanelInfo
      title={tr('shared.billsSelected')}
      value={String(invoicesSelected)}
    />
  );
};
