import { BillRouter } from '../modules/bill';
import { ListRouter } from '../modules/list';
import { PaymentRouter } from '../modules/payment';

export const BillsRouter = () => {
  return (
    <>
      {ListRouter()}
      {BillRouter()}
      {PaymentRouter()}
    </>
  );
};
