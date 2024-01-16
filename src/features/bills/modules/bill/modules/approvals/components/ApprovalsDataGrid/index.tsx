//material-ui
import { Box } from '@mui/material';
//resources
import { useRef, useState, useMemo } from 'react';
import { DataGrid } from 'shared/grids/DataGrid/components/DataGrid';
//types
import type { ColumnDefProps, DataGridReact } from 'shared/grids/DataGrid';
//styles
import * as styles from './styles';
//data
import { approvalsData } from '../../data/approvals-data';
import { ApprovalsDataGridApproverCell } from '../ApprovalsDataGridApproverCell';
import { ApprovalsDataGridStatusCell } from '../ApprovalsDataGridStatusCell';
import './ag-grid-approvals.scss';

export const ApprovalsDataGrid = () => {
  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'approver',
        cellRenderer: ApprovalsDataGridApproverCell,
        width: 200
      },
      {
        field: 'status',
        cellRenderer: ApprovalsDataGridStatusCell,
        flex: 1
      }
    ],
    []
  );

  const gridRef = useRef<DataGridReact>(null);
  const [columnDefs] = useState<ColumnDefProps[]>(columnDefsData);
  const [rowData] = useState(approvalsData);

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
      />
    </Box>
  );
};
