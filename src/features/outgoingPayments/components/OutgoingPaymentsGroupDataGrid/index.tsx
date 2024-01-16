import { useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { Pagination } from 'shared/components/Pagination';
import {
  DataGrid,
  DataGridReact,
  ToolbarDataGrid
} from 'shared/grids/DataGrid';
import { BalanceDueCell } from '../BalanceDueCell';
import { PaymentAmountCell } from '../PaymentAmountCell';
import { LinkCell } from '../LinkCell';
import { DestinationAccountCell } from '../DestinationAccountCell';
import { StatusCell } from '../StatusCell';
import { outgoingPaymentsData } from 'features/outgoingPayments/mockdata';
import { InvoiceTotalCell } from '../InvoiceTotalCell';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';
import { useGetPayments } from 'features/outgoingPayments/queries/getPayments';
import { LinkInvoiceCell } from '../LinkInvoiceCell';
import { LinkVendorCell } from '../LinkVendorCell';
import { RequesterCell } from '../RequesterCell';
import { OpenModalCell } from '../OpenModalCell';
import { OriginAccountCell } from '../OriginAccountCell';

type Props = {
  pagesCount?: number;
};

export const OutgoingPaymentsGroupDataGrid = ({ pagesCount }: Props) => {
  const gridRef = useRef<DataGridReact>(null);
  const [rowData, setRowData] = useState<any[] | undefined>(undefined);
  const [pages, setPages] = useState<number | undefined>(undefined);
  const [totalRecords, setTotalRecords] = useState<number | undefined>(
    undefined
  );
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const take = parseInt(query.get('take') || '20', 10);
  const takeMocked = take === [20, 50, 100].find((i) => take === i) ? take : 20;
  const skip = page * takeMocked - takeMocked;

  const columnDefs = useMemo<ColDef[]>(
    () => [
      // {
      //   field: 'id',
      //   headerName: tr('outgoing.payment.id'),
      //   filter: 'agTextColumnFilter'
      // },
      {
        field: 'bill.visualId',
        headerName: tr('outgoing.payment.bill'),
        cellRenderer: LinkInvoiceCell,
        filter: 'agTextColumnFilter',
        minWidth: 150
      },
      {
        field: 'vendor.tradeName',
        headerName: tr('shared.vendor'),
        cellRenderer: LinkVendorCell,
        filter: 'agNumberColumnFilter',
        minWidth: 200
      },
      {
        field: 'requester.firstName',
        headerName: tr('outgoing.payment.requester'),
        cellRenderer: RequesterCell,
        filter: 'agTextColumnFilter',
        suppressMovable: true,
        minWidth: 200
      },
      {
        field: 'outgoingPayment.outgoingPaymentGroupId',
        headerName: tr('outgoing.payment.paymentGroup'),
        cellRenderer: OpenModalCell,
        filter: 'agTextColumnFilter',
        minWidth: 200,
        suppressMovable: true
      },
      {
        // field: 'paymentTransaction.createdAt',
        field: 'createdAt',
        headerName: tr('outgoing.payment.paymentDate'),
        filter: 'agTextColumnFilter',
        minWidth: 200
      },
      {
        field: 'outgoingPayment.transferReference',
        headerName: tr('outgoing.payment.paymentReference'),
        filter: 'agNumberColumnFilter',
        minWidth: 150
      },
      {
        field: 'currency.name',
        headerName: tr('outgoing.payment.currency'),
        minWidth: 150
      },
      {
        field: 'bill.invoiceTotal',
        headerName: tr('outgoing.payment.invoiceTotal'),
        cellRenderer: InvoiceTotalCell,
        minWidth: 150
      },
      // {
      //   field: 'balanceDue',
      //   headerName: tr('outgoing.payment.balanceDue'),
      //   cellRenderer: BalanceDueCell,
      //   minWidth: 150
      // },
      {
        field: 'originAccount.',
        headerName: tr('outgoing.payment.originAccount'),
        cellRenderer: OriginAccountCell,
        filter: 'agTextColumnFilter',
        minWidth: 180
      },
      // {
      //   field: 'destination_account',
      //   headerName: tr('outgoing.payment.destinationAccount'),
      //   cellRenderer: DestinationAccountCell,
      //   filter: 'agTextColumnFilter',
      //   minWidth: 180
      // },
      // {
      //   field: 'cashFlow.name',
      //   headerName: tr('shared.cashFlow'),
      //   filter: 'agTextColumnFilter'
      // },
      {
        field: 'totalAmountPaid',
        headerName: tr('outgoing.payment.paymentAmount'),
        cellRenderer: PaymentAmountCell,
        pinned: 'right',
        suppressMovable: true,
        minWidth: 150
      },
      {
        field: 'paymentTransaction.status',
        headerName: tr('shared.status'),
        cellRenderer: StatusCell,
        pinned: 'right',
        suppressMovable: true,
        minWidth: 150
      }
    ],
    []
  );

  const { data, isFetching } = useGetPayments({
    skip: skip.toString() || '0',
    take: takeMocked.toString()
  });

  useEffect(() => {
    if (data) {
      setRowData(data.data);
      setPages(data.pagination.total);
      setTotalRecords(data.totalRecords);
    }
  }, [data, takeMocked]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.actions}>
        <ToolbarDataGrid gridRef={gridRef} />
      </Box>
      <DataGrid
        ref={gridRef}
        className="ag-theme-hco-square"
        rowData={rowData}
        columnDefs={columnDefs}
        suppressPaginationPanel
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
          flex: 1
        }}
      />
      <Box sx={styles.tableFooter}>
        <Pagination totalRecords={totalRecords} pagesCount={pagesCount} />
      </Box>
    </Box>
  );
};
