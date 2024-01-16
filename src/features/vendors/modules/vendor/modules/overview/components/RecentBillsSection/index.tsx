import { ValueFormatterParams } from 'ag-grid-community';
import { useGetVendor } from 'features/vendors/modules/vendor/queries/useGetVendor';
import { useCallback, useMemo } from 'react';
import { useGetInvoiceQuery } from 'shared/api/queries/useGetInvoiceQuery';
import {
  Section,
  SectionContent,
  SectionHeader
} from 'shared/components/Section';
import { StatusCell } from 'shared/grids/BillsDataGrid/components/StatusCell';
import { ColumnDefProps, DataGrid } from 'shared/grids/DataGrid';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { tr } from 'shared/translate';
import { getLocaleDate } from 'shared/utils/string/getLocaleDate';
import { LinkedCell } from '../../../shared/components/LinkedCell';

export const RecentBillsSection = () => {
  const { formatCurrencyValue } = useFormatValueAgGrid();

  const billDueDate = useCallback((params: ValueFormatterParams) => {
    return getLocaleDate(params?.data?.dueDate);
  }, []);

  const { data: vendor } = useGetVendor();

  const { data } = useGetInvoiceQuery({
    vendorExternalId: vendor?.visualId,
    sortColumn: 'posting_date',
    sortDirection: 'desc',
    skip: 0,
    take: 15
  });

  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'visualId',
        headerName: tr('shared.invoice'),
        filter: '',
        cellRenderer: LinkedCell,
        width: 160
        // checkboxSelection: true,
        // headerCheckboxSelection: true,
      },
      {
        field: 'invoiceStatus',
        headerName: tr('shared.status'),
        filter: '',
        cellRenderer: StatusCell,
        sortable: false,
        width: 96
      },
      {
        field: 'currency.iso4217Alpha3',
        filter: '',
        headerName: tr('shared.currency'),
        width: 112
      },
      {
        field: 'summary.balanceDue.value',
        filter: '',
        valueFormatter: formatCurrencyValue,
        headerName: tr('shared.balance_due'),
        minWidth: 120,
        sortable: false
      },
      {
        field: 'dueDate',
        headerName: tr('shared.due_date'),
        filter: '',
        valueFormatter: billDueDate,
        width: 80
      },
      {
        field: 'postingDate',
        headerName: tr('bills.bill.root.details.postingDate'),
        filter: '',
        valueFormatter: billDueDate,
        width: 80
      }
    ],
    [billDueDate, formatCurrencyValue]
  );

  return (
    <Section>
      <SectionHeader title={tr('shared.recentBills')} />
      <SectionContent sx={{ minHeight: 240 }}>
        <DataGrid
          rowData={data?.data}
          className="ag-theme-hco-rounded"
          suppressPaginationPanel
          rowSelection="multiple"
          tooltipShowDelay={0}
          columnDefs={columnDefsData}
          defaultColDef={{
            resizable: true,
            sortable: true,
            minWidth: 100,
            flex: 1
          }}
        />
      </SectionContent>
    </Section>
  );
};
