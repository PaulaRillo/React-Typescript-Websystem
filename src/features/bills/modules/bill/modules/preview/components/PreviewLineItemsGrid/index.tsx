//resources
import { useMemo, useState } from 'react';
//core-components
import { DataGrid } from 'shared/grids/DataGrid/components/DataGrid';
//types
import { Box } from '@mui/material';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import type { ColumnDefProps } from 'shared/grids/DataGrid';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { tr } from 'shared/translate';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import * as styles from './styles';

export const PreviewLineItemsGrid = () => {
  const { data } = useGetInvoice();
  const { data: tenantSettings } = useGetTenantSettings();
  const { formatCurrencyValue, format } = useFormatValueAgGrid();

  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        headerName: tr('bills.bill.root.preview.description'),
        field: 'itemDescription',
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        flex: 1
      },
      {
        valueFormatter: (params) => format(params, 'quantity'),
        headerName: tr('bills.bill.root.preview.quantity'),
        field: 'quantity',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 136,
        type: 'rightAligned'
      },
      {
        valueFormatter: formatCurrencyValue,
        headerName: `${tr('bills.bill.root.preview.unitPrice')} (${
          tenantSettings?.localCurrency.iso4217_alpha3
        })`,
        field: 'unitPrice',
        filter: 'agNumberColumnFilter',
        width: 200,
        type: 'rightAligned'
      },
      {
        valueFormatter: (params) => formatCurrencyValue(params), // prettier-ignore
        headerName: `${tr('bills.bill.root.preview.amount')} (${
          data?.currency.iso4217Alpha3
        })`,
        field: 'lineTotal.value',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agNumberColumnFilter',
        width: 200,
        type: 'rightAligned',
        lockPosition: 'right'
      }
    ],
    [format, formatCurrencyValue]
  );

  const [columnDefs] = useState<ColumnDefProps[]>(columnDefsData);

  return (
    <Box sx={styles.container}>
      <DataGrid
        rowData={data?.invoiceLines}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        defaultColDef={{
          resizable: true,
          filter: true,
          sortable: true,
          minWidth: 100,
          flex: 1
        }}
      />
    </Box>
  );
};
