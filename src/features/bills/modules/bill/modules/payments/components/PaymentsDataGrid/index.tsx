//material-ui
import { Box } from '@mui/material';
//resources
import { useRef, useState, useMemo } from 'react';
import { DataGrid } from 'shared/grids/DataGrid/components/DataGrid';
//types
import type { ColumnDefProps, DataGridReact } from 'shared/grids/DataGrid';
import { PaymentsDataGridUserCell } from '../PaymentsDataGridUserCell';
import { PaymentsDataGridStatusCell } from '../PaymentsDataGridStatusCell';
//styles
import * as styles from './styles';
import { paymentsData } from '../../data/payments-data';
import './ag-grid-payments.scss';

export const PaymentsDataGrid = () => {
  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'user',
        cellRenderer: PaymentsDataGridUserCell,
        width: 200
      },
      {
        field: 'method',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter'
      },
      {
        field: 'status',
        cellRenderer: PaymentsDataGridStatusCell,
        width: 120
      },
      {
        field: 'when',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agDateColumnFilter',
        width: 200
      },
      {
        field: 'currency',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        type: 'rightAligned',
        width: 120
      },
      {
        field: 'amount',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agNumberColumnFilter',
        type: 'rightAligned',
        width: 120
      },
      {
        field: 'description',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1,
        minWidth: 320
      }
    ],
    []
  );

  const gridRef = useRef<DataGridReact>(null);
  const [columnDefs] = useState<ColumnDefProps[]>(columnDefsData);
  const [rowData] = useState(paymentsData);

  return (
    <Box sx={styles.container}>
      <DataGrid
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowHeight={40}
        rowSelection={undefined}
        enableRangeSelection={false}
        animateRows={false}
        suppressRowClickSelection
        defaultColDef={{
          resizable: true
        }}
      />
    </Box>
  );
};
