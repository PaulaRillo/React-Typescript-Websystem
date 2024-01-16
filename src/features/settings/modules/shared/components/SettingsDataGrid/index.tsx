//material-ui
import { Box } from '@mui/material';
//resources
import { forwardRef } from 'react';
//ag-grid
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
//styles
import * as styles from './styles';
import './settings-ag-grid.scss';

type Props = AgGridReactProps;

export const SettingsDataGrid = forwardRef<AgGridReact, Props>(
  function DataGrid(props, ref) {
    return (
      <Box sx={styles.container} className="ag-theme-hco">
        <AgGridReact
          ref={ref}
          headerHeight={40}
          rowHeight={48}
          rowSelection="multiple"
          suppressDragLeaveHidesColumns
          rowDragManaged
          enableRangeSelection
          animateRows
          {...props}
        />
      </Box>
    );
  }
);
