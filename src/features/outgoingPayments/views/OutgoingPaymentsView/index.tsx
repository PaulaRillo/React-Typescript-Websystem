import { Header } from 'shared/components/Header';
import { Container } from 'shared/components/Container';
import { OutgoingPaymentsDataGrid } from 'features/outgoingPayments/components/OutgoingPaymentsDataGrid';
//translate
import { tr } from 'shared/translate';

export const OutgoingPaymentsView = () => {
  return (
    <Container>
      <Header title={tr('app.nav.workspace.outgoingPayments')} />
      <OutgoingPaymentsDataGrid />
    </Container>
  );
};
