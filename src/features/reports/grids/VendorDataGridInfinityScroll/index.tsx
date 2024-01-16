import { Box } from '@mui/material';
import { ColDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import core from 'core.v2';
import { useCallback, useMemo, useState } from 'react';
import { Loading } from 'shared/components/Loading';
import { DataGrid, DataGridReact } from 'shared/grids/DataGrid';
import { useAlert } from 'shared/hooks/useAlert';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = {
  gridRef: React.RefObject<DataGridReact>;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

export const VendorDataGridInfinityScroll = ({
  gridRef,
  startDate,
  endDate
}: Props) => {
  const { alert } = useAlert();
  const { formatCurrencyValue } = useFormatValueAgGrid();
  const [isLoading, setIsLoading] = useState(true);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'trade_name',
        headerName: tr('shared.vendor'),
        filter: '',
        width: 120,
        cellRenderer: (props: any) => {
          return (
            props.value ||
            (isLoading && (
              <Loading size={20} sx={{ alignItems: 'flex-start' }} />
            ))
          );
        },
        suppressMovable: true,
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        }
      },
      {
        field: 'total_invoices',
        headerName: tr('shared.totalInvoices'),
        type: 'rightAligned',
        filter: '',
        width: 120,
        suppressMovable: true
      },
      {
        field: 'total_invoiced_amount',
        headerName: tr('shared.totalInvoicedAmount'),
        type: 'rightAligned',
        filter: '',
        flex: 2
      },
      {
        field: 'total_payments',
        headerName: tr('shared.totalPayments'),
        type: 'rightAligned',
        filter: '',
        flex: 2
      },
      {
        field: 'total_paid',
        headerName: tr('shared.totalPaid'),
        type: 'rightAligned',
        filter: '',
        sortable: false
      },
      {
        field: 'total_outstanding_amount',
        headerName: tr('shared.totalOutstandingAmount'),
        type: 'rightAligned',
        filter: '',
        flex: 2
      }
    ],
    [formatCurrencyValue, isLoading]
  );

  const dataSource = useMemo<IDatasource>(
    () => ({
      getRows(params: IGetRowsParams) {
        core.reports
          .vendorQuery({
            startDate: startDate?.toISOString() || '',
            endDate: endDate?.toISOString() || ''
          })
          .then((res) => {
            params.successCallback(res.data);
          })
          .catch(() => {
            alert({
              title: tr('shared.search.notFound.title'),
              message: tr('shared.search.notFound.message'),
              severity: 'error'
            });
            params.failCallback();
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }),
    [alert]
  );

  const onGridReady = useCallback(
    (params) => {
      params.api.setDatasource(dataSource);
    },
    [dataSource]
  );

  return (
    <Box sx={styles.container}>
      <DataGrid
        ref={gridRef}
        className="ag-theme-hco-rounded-bottom"
        columnDefs={columnDefs}
        suppressPaginationPanel
        tooltipShowDelay={0}
        rowBuffer={1}
        cacheBlockSize={100}
        cacheOverflowSize={10}
        blockLoadDebounceMillis={500}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        rowSelection="multiple"
        rowModelType="infinite"
        debounceVerticalScrollbar={true}
        defaultColDef={{
          resizable: true,
          sortable: false,
          filter: false,
          floatingFilter: false,
          flex: 1
        }}
        onGridReady={onGridReady}
      />
    </Box>
  );
};
