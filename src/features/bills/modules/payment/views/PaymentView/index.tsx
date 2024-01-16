import { Box } from '@mui/material';
import { tr } from 'shared/translate';
import { lazy, Suspense, useMemo } from 'react';
import { Container } from 'shared/components/Container';
import { Header } from 'shared/components/Header';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { Action, CreationWizard, Step } from 'shared/modules/CreationWizard';
import { BillsToPayAction } from '../../components/BillsToPayAction';
import { ReviewAction } from '../../components/ReviewAction';
import * as styles from './styles';

const BillsToPay = lazy(() =>
  import('../../steps/BillsToPay').then((mod) => ({
    default: mod.BillsToPay
  }))
);

const Review = lazy(() =>
  import('../../steps/Review').then((mod) => ({
    default: mod.Review
  }))
);

const AuthenticatePay = lazy(() =>
  import('../../steps/AuthenticatePay').then((mod) => ({
    default: mod.AuthenticatePay
  }))
);

const Success = lazy(() =>
  import('../../steps/Success').then((mod) => ({
    default: mod.Success
  }))
);

export const PaymentView = () => {
  const steps = useMemo<Step[]>(
    () => [
      {
        label: tr('shared.billsToPay')
      },
      {
        label: tr('shared.review')
      },
      {
        label: `${tr('shared.authenticate')}/${tr('shared.pay')}`
      }
    ],
    []
  );

  const actions = useMemo<Action[]>(
    () => [
      {
        forward: {
          render: (props) => <BillsToPayAction {...props} />
        },
        backward: {
          defaultProps: {
            disabled: true
          }
        }
      },
      {
        forward: {
          render: (props) => <ReviewAction {...props} />
        }
      },
      {
        forward: {
          defaultProps: {
            disabled: true
          }
        }
      },
      {
        forward: {
          defaultProps: {
            disabled: true
          }
        },
        backward: {
          defaultProps: {
            disabled: true
          }
        }
      }
    ],
    []
  );

  return (
    <Container>
      <Header
        title={tr('shared.paymentWizard')}
        crumbs={[{ label: tr('shared.bills'), to: path.bills.root }]}
      />
      <Box sx={styles.wizard}>
        <CreationWizard steps={steps} actions={actions}>
          <Suspense fallback={<Loading title={tr('shared.billsToPay')} />}>
            <BillsToPay />
          </Suspense>
          <Suspense fallback={<Loading title={tr('shared.review')} />}>
            <Review />
          </Suspense>
          <Suspense fallback={<Loading title={tr('shared.pay')} />}>
            <AuthenticatePay />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Success />
          </Suspense>
        </CreationWizard>
      </Box>
    </Container>
  );
};

export default PaymentView;
