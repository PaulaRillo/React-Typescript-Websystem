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
//styles
import { StatusCell } from 'shared/grids/BillsDataGrid/components/StatusCell';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { getLocaleDate } from 'shared/utils/string/getLocaleDate';
import { DestinationAccount } from '../../components/DestinationAccount';
import * as styles from './styles';

type Props = DataGridReact['props'] & {
  gridRef?: RefObject<DataGridReact>;
  hideActions?: boolean;
  hideFooter?: boolean;
  pagesCount?: number;
  totalRecords?: number;
  isFetching?: boolean;
};

export const ReviewDataGridView = ({ gridRef, ...props }: Props) => {
  const { formatCurrencyValue } = useFormatValueAgGrid();

  const billDueDate = useCallback((params: ValueGetterParams) => {
    return getLocaleDate(params?.data?.dueDate);
  }, []);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'externalId',
        headerName: tr('shared.id'),
        width: 120,
        suppressMovable: true
      },
      {
        field: 'externalApInvoiceNumber',
        headerName: tr('shared.number.abbreviated'),
        width: 120
      },
      {
        field: 'referenceNumberExternal',
        headerName: tr('shared.external_reference_number'),
        width: 160
      },
      {
        field: 'invoiceFrom.name',
        headerName: tr('shared.vendor'),
        flex: 1
      },
      {
        valueFormatter: formatCurrencyValue,
        field: 'summary.invoiceTotal.value',
        headerName: tr('shared.total'),
        width: 160
      },
      {
        valueFormatter: formatCurrencyValue,
        field: 'summary.balanceDue.value',
        headerName: tr('shared.balance_due'),
        width: 160
      },
      {
        field: 'dueDate',
        headerName: tr('shared.due_date'),
        valueGetter: billDueDate,
        width: 104
      },
      {
        field: 'invoiceStatus',
        headerName: tr('shared.status'),
        cellRenderer: StatusCell,
        width: 160
      },
      {
        headerName: tr('shared.paymentAmount'),
        valueFormatter: formatCurrencyValue,
        field: 'paymentAmount',
        width: 160,
        pinned: 'right',
        suppressMovable: true
      },
      {
        field: 'destinationAccount',
        headerName: tr('shared.destination'),
        cellRenderer: DestinationAccount,
        width: 240,
        pinned: 'right',
        suppressMovable: true
      }
    ],
    [billDueDate, formatCurrencyValue]
  );

  return (
    <Box component="section" sx={styles.container}>
      <DataGrid
        ref={gridRef}
        columnDefs={columnDefs}
        suppressPaginationPanel
        defaultColDef={{
          flex: 1,
          resizable: true,
          filter: false,
          sortable: false,
          minWidth: 100
        }}
        tooltipShowDelay={0}
        {...props}
      />
    </Box>
  );
};
