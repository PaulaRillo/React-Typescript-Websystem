import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SyncProblemTwoToneIcon from '@mui/icons-material/SyncProblemTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import { SelectionChangedEvent } from 'ag-grid-community';
import core from 'core.v2';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { BillsToPayDataGridView } from 'features/bills/modules/payment/grids/BillsToPayDataGrid/views/BillsToPayDataGridView';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from 'shared/components/Header';
import { DataGridReact } from 'shared/grids/DataGrid';
import { tr } from 'shared/translate';
import { CashFlowOptions } from '../../components/CashFlowOptions';
import * as styles from './styles';

export const BillsToPay = () => {
  const gridRef = useRef<DataGridReact>(null);
  const {
    invoices,
    isAllInvoicesPayable,
    selectedInvoices,
    setSelectedInvoices,
    removeInvoices,
    removeInvoicesWithIssues
  } = usePaymentRequestInvoices(gridRef);

  useEffect(() => {
    core.store.paymentRequest.setWasReviewed(false);
  }, []);

  const handleSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      setSelectedInvoices(event.api.getSelectedRows());
    },
    [setSelectedInvoices]
  );

  return (
    <Box sx={styles.container}>
      <Header
        title={tr('shared.billsToPay')}
        subTitle={tr('bills.payment.billsToPay.description')}
        hideCrumbs
        sx={styles.header}
        end={
          <Box sx={styles.actions}>
            <Tooltip title={tr('shared.removeInvoicesWithIssues')} arrow>
              <span>
                <IconButton
                  disabled={isAllInvoicesPayable}
                  onClick={removeInvoicesWithIssues}
                >
                  <SyncProblemTwoToneIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={tr('shared.remove')} arrow>
              <span>
                <IconButton
                  onClick={removeInvoices}
                  disabled={selectedInvoices?.length === 0}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
            <CashFlowOptions />
          </Box>
        }
      />
      <BillsToPayDataGridView
        gridRef={gridRef}
        rowData={invoices}
        onSelectionChanged={handleSelectionChanged}
        hideActions
        hideFooter
        overlayNoRowsTemplate={tr('bills.payment.billsToPay.noBills')}
        enableCellChangeFlash
      />
    </Box>
  );
};

const usePaymentRequestInvoices = (gridRef: React.RefObject<DataGridReact>) => {
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>(core.store.paymentRequest.invoices); //prettier-ignore
  const [isAllInvoicesPayable, setIsAllInvoicesPayable] = useState<boolean>(core.store.paymentRequest.isAllInvoicesPayable()); //prettier-ignore

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setInvoices(data.invoices);
        setIsAllInvoicesPayable(data.isAllInvoicesPayable);
        gridRef.current?.api?.refreshCells();
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, [gridRef]);

  const removeInvoicesWithIssues = useCallback(() => {
    core.store.paymentRequest.removeInvoicesWithIssues();
    gridRef.current?.api?.deselectAll();
    setSelectedInvoices([]);
  }, [gridRef]);

  const removeInvoices = useCallback(() => {
    if (!gridRef.current) return;
    const rows = gridRef.current.api.getSelectedRows();
    const idsToRemove = rows.map((invoice) => invoice.id);
    core.store.paymentRequest.removeInvoices(idsToRemove);
  }, [gridRef]);

  return {
    invoices,
    isAllInvoicesPayable,
    selectedInvoices,
    setSelectedInvoices,
    removeInvoices,
    removeInvoicesWithIssues
  };
};
