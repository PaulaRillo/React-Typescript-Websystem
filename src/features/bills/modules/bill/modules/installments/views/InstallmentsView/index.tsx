import { Box } from '@mui/material';
import { tr } from 'shared/translate';
import { useMemo } from 'react';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { ColumnDefProps, DataGrid } from 'shared/grids/DataGrid';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';

import * as styles from './styles';

export const InstallmentsView = () => {
  const { data, isLoading } = useGetInvoice();
  const { formatPercentValue, format } = useFormatValueAgGrid();

  const columnDefs: ColumnDefProps[] = useMemo(
    () => [
      {
        headerName: tr('shared.id'),
        field: 'externalId',
        filter: 'agTextColumnFilter',
        width: 120,
        suppressMovable: true
      },
      {
        valueFormatter: formatPercentValue,
        headerName: tr('shared.percentage'),
        field: 'percent',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        headerName: tr('shared.installmentNumber'),
        field: 'number',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        headerName: tr('shared.due_date'),
        field: 'dueDate',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        valueFormatter: (params) => format(params, 'total'),
        headerName: tr('shared.total'),
        field: 'total',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        headerName: tr('bills.bill.installments.lastDunningDate'),
        field: 'lastDunningDate',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        headerName: tr('bills.bill.installments.dunningLevel'),
        field: 'dunningLevel',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        headerName: tr('bills.bill.installments.totalForeignCurrency'),
        field: 'totalAmountInForeignCurrency',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        headerName: tr('shared.ordered'),
        field: 'isPaymentOrdered',
        filter: 'agTextColumnFilter',
        flex: 2
      }
    ],
    [format, formatPercentValue]
  );

  return (
    <Box sx={styles.container}>
      <DataGrid
        rowData={isLoading ? undefined : data?.installments || []}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        overlayNoRowsTemplate={tr('shared.noInstallmentsFound')}
      />
    </Box>
  );
};

export default InstallmentsView;
