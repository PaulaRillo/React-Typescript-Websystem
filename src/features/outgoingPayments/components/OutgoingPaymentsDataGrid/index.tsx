import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { OriginAccountCell } from 'features/outgoingPayments/components/OriginAccountCell';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pagination } from 'shared/components/Pagination';
import {
  DataGrid,
  DataGridReact,
  ToolbarDataGrid
} from 'shared/grids/DataGrid';
import { InvoiceTotalCell } from '../InvoiceTotalCell';
import { PaymentAmountCell } from '../PaymentAmountCell';
import { StatusCell } from '../StatusCell';
import { useGetPayments } from 'features/outgoingPayments/queries/getPayments';
import { LinkInvoiceCell } from '../LinkInvoiceCell';
import { LinkVendorCell } from '../LinkVendorCell';
import { DateCell } from '../DateCell';
import { RequesterCell } from '../RequesterCell';
import { DestinationAccountCell } from '../DestinationAccountCell';

//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

type Props = {
  billId?: string;
  vendorId?: string;
  overlayNoRowsTemplate?: string;
};

export const OutgoingPaymentsDataGrid = ({
  billId,
  vendorId,
  overlayNoRowsTemplate = 'outgoing.payment.noRowsDefaultMessage'
}: Props) => {
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
      {
        field: 'paymentTransaction.createdAt',
        headerName: tr('outgoing.payment.submissionDate'),
        cellRenderer: DateCell,
        filter: 'agTextColumnFilter',
        width: 200,
        flex: 1
      },
      {
        field: 'requester.firstName',
        headerName: tr('outgoing.payment.requester'),
        cellRenderer: RequesterCell,
        filter: 'agTextColumnFilter',
        suppressMovable: true,
        width: 200
      },
      {
        field: 'bill.visualId',
        headerName: tr('outgoing.payment.bill'),
        cellRenderer: LinkInvoiceCell,
        filter: 'agTextColumnFilter',
        width: 150
      },
      {
        field: 'vendor.tradeName',
        headerName: tr('shared.vendor'),
        cellRenderer: LinkVendorCell,
        filter: 'agNumberColumnFilter',
        width: 200
      },
      {
        field: 'outgoingPayment.transferReference',
        headerName: tr('outgoing.payment.paymentReference'),
        filter: 'agNumberColumnFilter',
        width: 150
      },
      {
        field: 'currency.iso4217Alpha3',
        headerName: tr('outgoing.payment.currency'),
        width: 150
      },
      {
        field: 'bill.invoiceTotal',
        headerName: tr('outgoing.payment.invoiceTotal'),
        cellRenderer: InvoiceTotalCell,
        width: 150
      },
      {
        field: 'originAccount',
        headerName: tr('outgoing.payment.originAccount'),
        cellRenderer: OriginAccountCell,
        filter: 'agTextColumnFilter',
        width: 250
      },
      // TODO: waiting for BT-445
      // {
      //   field: 'destinationAccount',
      //   headerName: tr('outgoing.payment.destinationAccount'),
      //   cellRenderer: DestinationAccountCell,
      //   filter: 'agTextColumnFilter',
      //   minWidth: 250
      // },
      {
        field: 'project.name',
        headerName: tr('shared.project'),
        filter: 'agTextColumnFilter',
        width: 200
      },
      {
        field: 'paymentTransaction.settledAt',
        headerName: tr('outgoing.payment.paymentDate'),
        cellRenderer: DateCell,
        filter: 'agTextColumnFilter',
        width: 200
      },
      {
        field: 'totalAmountPaid',
        headerName: tr('outgoing.payment.paymentAmount'),
        cellRenderer: PaymentAmountCell,
        pinned: 'right',
        suppressMovable: true,
        width: 100,
        flex: 1
      },
      {
        field: 'paymentTransaction.status',
        headerName: tr('shared.status'),
        cellRenderer: StatusCell,
        pinned: 'right',
        suppressMovable: true,
        width: 230
      }
    ],
    []
  );

  const { data, isLoading } = useGetPayments({
    skip: skip.toString() || '0',
    take: takeMocked.toString(),
    vendor: vendorId,
    bill: billId
  });

  useEffect(() => {
    if (data) {
      setRowData(data?.data);
      setPages(data?.pagination.total);
      setTotalRecords(data?.totalRecords);
    }
  }, [data, takeMocked, isLoading]);

  const handleExportCSV = useCallback(() => {
    gridRef?.current?.api?.exportDataAsCsv({
      fileName: `payments-export-${new Date().toISOString()}.csv`,
      onlySelectedAllPages: false,
      allColumns: false,
      columnKeys: [
        'paymentTransaction.createdAt',
        'requester.firstName',
        'bill.visualId',
        'vendor.tradeName',
        'outgoingPayment.transferReference',
        'originAccount',
        'currency.iso4217Alpha3',
        'bill.invoiceTotal',
        'totalAmountPaid',
        'paymentTransaction.status'
      ],
      processCellCallback(params) {
        if (params.column.getColId() === 'originAccount') {
          return params?.node?.data?.originAccount?.redactedAccountNumber;
        }
        return params.value;
      }
    });
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.actions}>
        <ToolbarDataGrid gridRef={gridRef}>
          <Tooltip title={tr('shared.download')}>
            <span>
              <IconButton onClick={handleExportCSV} color="inherit">
                <DownloadTwoToneIcon />
              </IconButton>
            </span>
          </Tooltip>
        </ToolbarDataGrid>
      </Box>
      <DataGrid
        ref={gridRef}
        className="ag-theme-hco-square"
        rowData={rowData}
        overlayNoRowsTemplate={tr(overlayNoRowsTemplate)}
        columnDefs={columnDefs}
        suppressPaginationPanel
        defaultColDef={{
          resizable: true,
          filter: true,
          sortable: true,
          minWidth: 100,
          flex: 1
        }}
      />
      {/* <Box sx={styles.tableFooter}>
        <Pagination totalRecords={totalRecords} pagesCount={pages} />
      </Box> */}
    </Box>
  );
};
