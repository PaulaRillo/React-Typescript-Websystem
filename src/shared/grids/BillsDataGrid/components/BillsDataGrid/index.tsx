//material-ui
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, Button } from '@mui/material';
//resources
import { RefObject, useCallback, useMemo, useState } from 'react';
//core-components
import { Pagination } from 'shared/components/Pagination';
import { DataGrid } from 'shared/grids/DataGrid/components/DataGrid';
//translate
import { tr } from 'shared/translate';
//types
import { DataGridReact, ToolbarDataGrid } from 'shared/grids/DataGrid';
//grid
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { BillGridLinkedInvoiceCell } from 'shared/grids/BillsDataGrid/components/BillsGridLinkedInvoiceCell';
import { BillGridLinkedVendorCell } from '../BillsGridLinkedVendorCell';
import { BillsGridPaymentTermsCell } from '../BillsGridPaymentTermsCell';
//styles
import {
  Permission,
  PermissionKey,
  usePermission
} from 'shared/modules/Permission';
//numbers
import core from 'core.v2';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { useShowLoadingOverlayAgGrid } from 'shared/hooks/useShowLoadingOverlayAgGrid';
import { getLocaleDate } from '../../../../utils/string/getLocaleDate';
import { StatusCell } from '../StatusCell';
import * as styles from './styles';

type Props = DataGridReact['props'] & {
  gridRef: RefObject<DataGridReact>;
  hideActions?: boolean;
  hideFooter?: boolean;
  pagesCount?: number;
  totalRecords?: number;
  isFetching?: boolean;
};

export const BillsDataGrid = ({
  gridRef,
  hideActions,
  hideFooter,
  isFetching,
  totalRecords,
  pagesCount,
  ...props
}: Props) => {
  useShowLoadingOverlayAgGrid(gridRef, isFetching);
  const { matchAll } = usePermission();
  const { formatCurrencyValue } = useFormatValueAgGrid();
  const [selectedRows, setSelectedRows] = useState<Invoice[]>();
  const hasSelectedRows = Boolean(selectedRows && selectedRows.length > 0);
  const hasPermission = useMemo(() => ({manageBill: matchAll([PermissionKey.MANAGE_BILL, PermissionKey.PAY_BILL])}),[matchAll]); //prettier-ignore

  const onSelectionChanged = useCallback(() => {
    if (!gridRef?.current) return;
    const selectedRows = gridRef?.current.api.getSelectedRows();
    setSelectedRows(selectedRows);
  }, [gridRef]);

  const billDueDate = useCallback((params: ValueFormatterParams) => {
    return getLocaleDate(params?.data?.dueDate);
  }, []);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'externalId',
        headerName: tr('shared.id'),
        filter: 'agTextColumnFilter',
        cellRenderer: BillGridLinkedInvoiceCell,
        checkboxSelection: hasPermission.manageBill,
        headerCheckboxSelection: hasPermission.manageBill,
        suppressMovable: true,
        minWidth: 120
      },
      {
        field: 'externalApInvoiceNumber',
        headerName: tr('shared.number.abbreviated'),
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        field: 'referenceNumberExternal',
        headerName: tr('shared.external_reference_number'),
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        field: 'invoiceFrom.name',
        headerName: tr('shared.vendor'),
        cellRenderer: BillGridLinkedVendorCell,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        field: 'currency.iso4217Alpha3',
        headerName: tr('shared.currency'),
        filter: 'agTextColumnFilter'
      },
      {
        valueFormatter: formatCurrencyValue,
        field: 'summary.invoiceTotal.value',
        headerName: tr('shared.total'),
        minWidth: 120,
        filter: 'agNumberColumnFilter'
      },
      {
        valueFormatter: formatCurrencyValue,
        field: 'summary.balanceDue.value',
        headerName: tr('shared.balance_due'),
        minWidth: 120
      },
      {
        field: 'paymentTerm',
        headerName: tr('shared.payment_terms'),
        cellRenderer: BillsGridPaymentTermsCell,
        filter: 'agTextColumnFilter',
        sortable: true,
        minWidth: 104
      },
      {
        headerName: tr('shared.due_date'),
        valueFormatter: billDueDate,
        filter: 'agDateColumnFilter',
        sortable: true,
        minWidth: 96
      },
      {
        field: 'invoiceStatus',
        headerName: tr('shared.status'),
        filter: 'agTextColumnFilter',
        cellRenderer: StatusCell,
        sortable: true
      }
    ],
    [billDueDate, formatCurrencyValue, hasPermission.manageBill]
  );

  const handleAddBillsToPay = useCallback(() => {
    if (!selectedRows) return;
    core.store.paymentRequest.addInvoices(selectedRows);
  }, [selectedRows]);

  return (
    <Box sx={styles.container}>
      {!hideActions && (
        <Box sx={styles.actions}>
          <ToolbarDataGrid gridRef={gridRef}>
            <Permission matchAll={[PermissionKey.PAY_BILL]}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<PostAddIcon />}
                disabled={!hasSelectedRows}
                onClick={handleAddBillsToPay}
              >
                {tr('shared.addToPay')}
              </Button>
            </Permission>
          </ToolbarDataGrid>
        </Box>
      )}
      <DataGrid
        ref={gridRef}
        className="ag-theme-hco-square"
        columnDefs={columnDefs}
        onSelectionChanged={onSelectionChanged}
        suppressPaginationPanel
        rowSelection="multiple"
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
          flex: 1
        }}
        tooltipShowDelay={0}
        {...props}
      />
      {!hideFooter && (
        <Box sx={styles.tableFooter}>
          <Pagination totalRecords={totalRecords} pagesCount={pagesCount} />
        </Box>
      )}
    </Box>
  );
};
