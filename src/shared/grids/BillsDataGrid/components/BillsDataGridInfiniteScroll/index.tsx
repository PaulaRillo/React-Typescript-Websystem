//material-ui
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import PostAddIcon from '@mui/icons-material/PostAdd';
import RotateLeftTwoToneIcon from '@mui/icons-material/RotateLeftTwoTone';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
//resources
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
//core-components
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
import { Spacer } from 'shared/components/Spacer';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
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

export const BillsDataGridInfiniteScroll = ({ gridRef, ...props }: Props) => {
  const { matchAll } = usePermission();
  const { formatCurrencyValue } = useFormatValueAgGrid();
  const [selectedRows, setSelectedRows] = useState<Invoice[]>();
  const hasSelectedRows = Boolean(selectedRows && selectedRows.length > 0);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setIsEditable(core.store.paymentRequest.getIsEditable());
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setIsEditable(data.isEditable);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  const hasPermission = useMemo(() => ({ manageBill: matchAll([PermissionKey.MANAGE_BILL, PermissionKey.PAY_BILL]) }),[matchAll]); //prettier-ignore

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
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        },
        headerName: tr('shared.id'),
        cellRenderer: BillGridLinkedInvoiceCell,
        checkboxSelection: hasPermission.manageBill,
        headerCheckboxSelection: hasPermission.manageBill,
        minWidth: 120,
        suppressMovable: true,
        suppressMenu: true
      },
      {
        field: 'externalApInvoiceNumber',
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        },
        headerName: tr('shared.number.abbreviated')
      },
      {
        field: 'referenceNumberExternal',
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        },
        headerName: tr('shared.external_reference_number')
      },
      {
        field: 'invoiceFrom.name',
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        },

        headerName: tr('shared.vendor'),
        cellRenderer: BillGridLinkedVendorCell
      },
      {
        field: 'currency.iso4217Alpha3',
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        },
        headerName: tr('shared.currency')
      },
      {
        field: 'summary.invoiceTotal.value',
        filter: '',
        valueFormatter: formatCurrencyValue,
        headerName: tr('shared.total'),
        minWidth: 120
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
        field: 'paymentTerm',
        filter: '',
        headerName: tr('shared.payment_terms'),
        cellRenderer: BillsGridPaymentTermsCell,
        minWidth: 104,
        sortable: false
      },
      {
        field: 'summary.dueDate.value',
        headerName: tr('shared.due_date'),
        filter: 'agDateColumnFilter',
        filterParams: {
          filterOptions: ['equals', 'inRange'],
          suppressAndOrCondition: true
        },
        valueFormatter: billDueDate,
        minWidth: 96
      },
      {
        field: 'invoiceStatus',
        headerName: tr('shared.status'),
        filter: '',
        cellRenderer: StatusCell,
        sortable: false
      }
    ],
    [billDueDate, formatCurrencyValue, hasPermission.manageBill]
  );

  const handleAddBillsToPay = useCallback(() => {
    if (!selectedRows) return;
    core.store.paymentRequest.addInvoices(selectedRows);
  }, [selectedRows]);

  const handleResetFilters = useCallback(() => {
    if (!gridRef?.current) return;
    gridRef.current.api.setFilterModel(null);
  }, [gridRef]);

  const handleExportCSV = useCallback(() => {
    gridRef?.current?.api?.exportDataAsCsv({
      fileName: `bills-export-${new Date().toISOString()}.csv`,
      onlySelectedAllPages: true,
      allColumns: false,
      columnKeys: [
        'externalId',
        'externalApInvoiceNumber',
        'referenceNumberExternal',
        'invoiceFrom.name',
        'currency.iso4217Alpha3',
        'summary.invoiceTotal.value',
        'summary.balanceDue.value',
        'summary.dueDate.value',
        'invoiceStatus'
      ],
      processCellCallback(params) {
        if (params.column.getColId() === 'summary.dueDate.value') {
          return getLocaleDate(params?.node?.data?.dueDate);
        }
        return params.value;
      }
    });
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.actions}>
        <Button
          variant="text"
          color="primary"
          size="small"
          startIcon={<RotateLeftTwoToneIcon />}
          onClick={handleResetFilters}
        >
          {tr('shared.resetFilters')}
        </Button>
        <Spacer />
        <ToolbarDataGrid gridRef={gridRef}>
          <Tooltip
            title={
              !hasSelectedRows
                ? tr('shared.selectAtLEastOneBillToDownload')
                : tr('shared.downloadSelectedBills')
            }
          >
            <span>
              <IconButton
                onClick={handleExportCSV}
                disabled={!hasSelectedRows}
                color="inherit"
              >
                <DownloadTwoToneIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Permission matchAll={[PermissionKey.PAY_BILL]}>
            <Tooltip title={isEditable ? '' : tr('shared.payNotEnabled')}>
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PostAddIcon />}
                  disabled={!isEditable || !hasSelectedRows}
                  onClick={handleAddBillsToPay}
                >
                  {tr('shared.addToPay')}
                </Button>
              </span>
            </Tooltip>
          </Permission>
        </ToolbarDataGrid>
      </Box>
      <DataGrid
        ref={gridRef}
        className="ag-theme-hco-rounded-bottom"
        columnDefs={columnDefs}
        onSelectionChanged={onSelectionChanged}
        suppressPaginationPanel
        rowSelection="multiple"
        tooltipShowDelay={0}
        {...props}
      />
    </Box>
  );
};
