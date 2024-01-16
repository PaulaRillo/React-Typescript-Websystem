import { useEffect, useRef, useState } from 'react';
//core-components
import { Box } from '@mui/material';
import { useGetVendorBills } from 'features/vendors/modules/vendor/queries/useGetVendorBills';
import { BillsDataGrid } from 'shared/grids/BillsDataGrid';

import { DataGridReact } from 'shared/grids/DataGrid';
import * as styles from './styles';

export const BillsView = () => {
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

  const { data, isFetching } = useGetVendorBills(skip || 0, takeMocked || 20);

  useEffect(() => {
    if (data) {
      setRowData(data.data);
      setPages(data.pagination.total);
      setTotalRecords(data.totalRecords);
    }
  }, [data, takeMocked]);

  return (
    <Box sx={styles.container}>
      <BillsDataGrid
        gridRef={gridRef}
        rowData={rowData}
        totalRecords={totalRecords}
        pagesCount={pages}
        isFetching={isFetching}
      />
    </Box>
  );
};

export default BillsView;
