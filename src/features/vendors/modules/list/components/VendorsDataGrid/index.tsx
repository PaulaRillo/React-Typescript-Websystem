import { Box } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { useEffect, useMemo, useRef } from 'react';
import { Pagination } from 'shared/components/Pagination';
import {
  ContactCell,
  DataGrid,
  DataGridReact,
  ToolbarDataGrid
} from 'shared/grids/DataGrid';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { tr } from 'shared/translate';
import { VendorsDataGridProjectCell } from '../VendorsDataGridProjectCell';
import { VendorsGridLinkedCell } from '../VendorsGridLinkedCell';
import * as styles from './styles';

type Props = {
  rowData?: object[];
  pagesCount?: number;
  totalRecords?: number;
  isFetching: boolean;
};

export const VendorsDataGrid = ({
  rowData,
  isFetching,
  totalRecords,
  pagesCount
}: Props) => {
  const gridRef = useRef<DataGridReact>(null);
  const { formatCurrencyValue } = useFormatValueAgGrid();

  useEffect(() => {
    if (gridRef?.current?.api) {
      if (isFetching) gridRef?.current?.api.showLoadingOverlay();
      else gridRef?.current?.api.hideOverlay();
    }
  }, [isFetching]);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'visualId',
        headerName: 'ID',
        filter: 'agTextColumnFilter',
        width: 120,
        suppressMovable: true
      },
      {
        field: 'externalId',
        headerName: tr('shared.externalID'),
        filter: 'agTextColumnFilter',
        width: 120,
        suppressMovable: true
      },
      {
        field: 'name',
        headerName: tr('shared.name'),
        filter: 'agTextColumnFilter',
        cellRenderer: VendorsGridLinkedCell,
        flex: 2
      },
      {
        valueFormatter: formatCurrencyValue,
        field: 'accountBalance',
        headerName: tr('shared.accountBalance'),
        filter: 'agNumberColumnFilter',
        type: 'rightAligned'
      },
      {
        field: 'businessPartnerGroup.name',
        headerName: tr('shared.businessPartnerGroup'),
        filter: 'agTextColumnFilter',
        width: 240
      },
      {
        field: 'project.name',
        headerName: tr('shared.project'),
        filter: 'agTextColumnFilter',
        cellRenderer: VendorsDataGridProjectCell,
        width: 240
      },
      {
        field: 'openInvoices',
        headerName: tr('shared.openBills'),
        filter: 'agNumberColumnFilter',
        width: 136
      },
      {
        field: 'primaryContact',
        headerName: tr('shared.contact'),
        cellRenderer: ContactCell,
        width: 280
      }
    ],
    [formatCurrencyValue]
  );

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
