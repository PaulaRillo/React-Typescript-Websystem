import { RefObject, useEffect } from 'react';
import { DataGridReact } from 'shared/grids/DataGrid';

export const useShowLoadingOverlayAgGrid = (
  gridRef: RefObject<DataGridReact>,
  isFetching: boolean | undefined
) => {
  useEffect(() => {
    if (gridRef?.current?.api) {
      if (isFetching) gridRef?.current?.api.showLoadingOverlay();
      else gridRef?.current?.api.hideOverlay();
    }
  }, [gridRef, isFetching]);
};
