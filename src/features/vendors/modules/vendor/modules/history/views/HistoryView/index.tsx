import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { DataGridUserCell } from 'shared/grids/DataGrid/components/DataGridUserCell';
import { VendorsDataGrid } from '../../../shared/components/VendorsDataGrid';
import { HistoryDataGridActionCell } from '../../components/HistoryDataGridActionCell';
import * as styles from './styles';

export const HistoryView = () => {
  const columnDefsData = useMemo(
    () => [
      {
        field: 'when',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 160
      },
      {
        field: 'user',
        cellRenderer: DataGridUserCell,
        filter: 'agTextColumnFilter',
        width: 200
      },
      {
        field: 'action',
        cellRenderer: HistoryDataGridActionCell,
        filter: 'agTextColumnFilter',
        width: 120
      },
      {
        field: 'entity',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 120
      },
      {
        headerName: 'Entity field',
        field: 'field',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 160
      },
      {
        field: 'oldValue',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 240,
        flex: 1
      },
      {
        field: 'newValue',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 160,
        flex: 1
      }
    ],
    []
  );

  const [rowData] = useState([
    {
      when: 'Mar 25, 2022',
      user: {
        firstname: 'John',
        lastname: 'Doe'
      },
      action: 'CREATED',
      entity: 'Vendor',
      field: 'Name',
      oldValue: 'AWS - Amazon Web Services',
      newValue: 'AWS'
    },
    {
      when: 'Mar 25, 2022',
      user: {
        firstname: 'John',
        lastname: 'Doe'
      },
      action: 'UPDATED',
      entity: 'Vendor',
      field: 'Name',
      oldValue: 'AWS - Amazon Web Services',
      newValue: 'AWS'
    },
    {
      when: 'Mar 25, 2022',
      user: {
        firstname: 'John',
        lastname: 'Doe'
      },
      action: 'UPDATED',
      entity: 'Vendor',
      field: 'Name',
      oldValue: 'AWS - Amazon Web Services',
      newValue: 'AWS'
    },
    {
      when: 'Mar 25, 2022',
      user: {
        firstname: 'John',
        lastname: 'Doe'
      },
      action: 'DELETED',
      entity: 'Vendor',
      field: 'Name',
      oldValue: 'AWS - Amazon Web Services',
      newValue: 'AWS'
    }
  ]);

  return (
    <Box sx={styles.container}>
      <VendorsDataGrid
        rowData={rowData}
        columnDefs={columnDefsData}
        rowSelection="multiple"
      />
    </Box>
  );
};

export default HistoryView;
