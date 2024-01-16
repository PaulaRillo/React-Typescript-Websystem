//material-ui
import { Box } from '@mui/material';
//resources
import { RefObject, useCallback, useMemo } from 'react';
//core-components
import { DataGrid } from 'shared/grids/DataGrid/components/DataGrid';
//translate
import { tr } from 'shared/translate';
//types
import { DataGridReact } from 'shared/grids/DataGrid';
//grid
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { LinkedVendorCell } from 'features/bills/modules/payment/grids/BillsToPayDataGrid/components/LinkedVendorCell';
import { PaymentTermsCell } from 'features/bills/modules/payment/grids/BillsToPayDataGrid/components/PaymentTermsCell';
//styles
import { Currency } from 'features/bills/modules/payment/grids/BillsToPayDataGrid/components/Currency';
import { DestinationAccount } from 'features/bills/modules/payment/grids/BillsToPayDataGrid/components/DestinationAccount';
import { LinkedInvoiceCell } from 'features/bills/modules/payment/grids/BillsToPayDataGrid/components/LinkedInvoiceCell';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { PermissionKey, usePermission } from 'shared/modules/Permission';
import { getLocaleDate } from 'shared/utils/string/getLocaleDate';
import { PaymentAmountCell } from '../../components/PaymentAmountCell';
import { StatusCell } from '../../components/StatusCell';
import * as styles from './styles';

type Props = DataGridReact['props'] & {
  gridRef?: RefObject<DataGridReact>;
  hideActions?: boolean;
  hideFooter?: boolean;
  pagesCount?: number;
  totalRecords?: number;
  isFetching?: boolean;
};

export const BillsToPayDataGridView = ({ gridRef, ...props }: Props) => {
  const { matchAll } = usePermission();
  const { formatCurrencyValue } = useFormatValueAgGrid();

  const hasPermission = useMemo(
    () => ({
      manageBill: matchAll([PermissionKey.MANAGE_BILL, PermissionKey.PAY_BILL])
    }),
    [matchAll]
  );

  const billDueDate = useCallback((params: ValueGetterParams) => {
    return getLocaleDate(params?.data?.dueDate);
  }, []);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'externalId',
        headerName: tr('shared.id'),
        filter: 'agTextColumnFilter',
        cellRenderer: LinkedInvoiceCell,
        checkboxSelection: hasPermission.manageBill,
        headerCheckboxSelection: hasPermission.manageBill,
        sortable: false,
        width: 120,
        suppressMovable: true
      },
      {
        field: 'externalApInvoiceNumber',
        headerName: tr('shared.number.abbreviated'),
        filter: 'agTextColumnFilter',
        width: 80
      },
      {
        field: 'referenceNumberExternal',
        headerName: tr('shared.external_reference_number'),
        filter: 'agTextColumnFilter',
        width: 120
      },
      {
        field: 'invoiceFrom.name',
        headerName: tr('shared.vendor'),
        cellRenderer: LinkedVendorCell,
        filter: 'agTextColumnFilter',
        width: 200
      },
      {
        headerName: tr('shared.currency'),
        field: 'currency.iso4217Alpha3',
        filter: 'agTextColumnFilter',
        cellRenderer: Currency,
        width: 120
      },
      {
        valueFormatter: formatCurrencyValue,
        field: 'summary.invoiceTotal.value',
        headerName: tr('shared.total'),
        filter: 'agNumberColumnFilter',
        width: 160
      },
      {
        valueFormatter: formatCurrencyValue,
        field: 'summary.balanceDue.value',
        headerName: tr('shared.balance_due'),
        filter: 'agNumberColumnFilter',
        width: 140
      },
      {
        field: 'paymentTerm',
        headerName: tr('shared.payment_terms'),
        cellRenderer: PaymentTermsCell,
        filter: 'agTextColumnFilter',
        width: 160
      },
      {
        headerName: tr('shared.due_date'),
        field: 'dueDate',
        valueGetter: billDueDate,
        filter: 'agDateColumnFilter',
        width: 160
      },
      {
        headerName: tr('shared.status'),
        field: 'invoiceStatus',
        filter: 'agTextColumnFilter',
        cellRenderer: StatusCell,
        width: 160
      },
      {
        headerName: tr('shared.paymentAmount'),
        field: 'paymentAmount',
        cellRenderer: PaymentAmountCell,
        width: 160,
        pinned: 'right',
        suppressMovable: true
      },
      {
        headerName: tr('shared.destination'),
        field: 'destinationAccount',
        cellRenderer: DestinationAccount,
        width: 260,
        pinned: 'right',
        suppressMovable: true
      }
    ],
    [billDueDate, formatCurrencyValue, hasPermission.manageBill]
  );

  return (
    <Box component="section" sx={styles.container}>
      <DataGrid
        ref={gridRef}
        columnDefs={columnDefs}
        suppressPaginationPanel
        rowSelection="multiple"
        defaultColDef={{
          resizable: true,
          filter: true,
          sortable: true,
          minWidth: 100,
          flex: 1
        }}
        tooltipShowDelay={0}
        {...props}
      />
    </Box>
  );
};
