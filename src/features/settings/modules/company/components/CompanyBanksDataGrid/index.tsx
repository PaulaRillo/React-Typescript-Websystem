//material-ui
import { Box, SxProps, Theme } from '@mui/material';
//resources
import { useMemo } from 'react';
import { DataGrid as SharedDataGrid } from 'shared/grids/DataGrid/components/DataGrid';
//styles
import { AgGridReactProps } from 'ag-grid-react';
import * as styles from './styles';
import './ag-grid.scss';

type Props = AgGridReactProps & {
  sx?: SxProps<Theme>;
};

export const CompanyBanksDataGrid = ({ sx, ...props }: Props) => {
  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  return (
    <Box sx={stylesContainer}>
      <SharedDataGrid
        rowHeight={40}
        rowSelection={undefined}
        enableRangeSelection={false}
        animateRows={false}
        suppressRowClickSelection
        defaultColDef={{ resizable: true }}
        {...props}
      />
    </Box>
  );
};
