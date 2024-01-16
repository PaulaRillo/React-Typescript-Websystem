import { Box } from '@mui/material';
import core from 'core.v2';
import { useEffect, useRef } from 'react';
import { Header } from 'shared/components/Header';
import { DataGridReact } from 'shared/grids/DataGrid';
import { tr } from 'shared/translate';
import { CashFlowReviewOptions } from '../../components/CashFlowReviewOptions';
import { ReviewDataGridView } from '../../grids/ReviewDataGrid';
import * as styles from './styles';

export const Review = () => {
  const gridRef = useRef<DataGridReact>(null);

  useEffect(() => {
    core.store.paymentRequest.setIsEditable(false);
    return () => {
      core.store.paymentRequest.setIsEditable(true);
    };
  }, []);

  return (
    <Box sx={styles.container}>
      <Header
        title={tr('bills.payment.review.title')}
        subTitle={tr('bills.payment.review.description')}
        sx={styles.header}
        hideCrumbs
        end={
          <Box sx={styles.actions}>
            <CashFlowReviewOptions />
          </Box>
        }
      />
      <ReviewDataGridView
        gridRef={gridRef}
        rowData={core.store.paymentRequest.invoices}
        hideActions
        hideFooter
      />
    </Box>
  );
};
