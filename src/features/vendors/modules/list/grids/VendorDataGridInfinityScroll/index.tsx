import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import RotateLeftTwoToneIcon from '@mui/icons-material/RotateLeftTwoTone';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { ColDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import core from 'core.v2';
import { RefObject, useCallback, useMemo } from 'react';
import { Loading } from 'shared/components/Loading';
import { Spacer } from 'shared/components/Spacer';
import { ContactCell, DataGrid, DataGridReact } from 'shared/grids/DataGrid';
import { useAlert } from 'shared/hooks/useAlert';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { tr } from 'shared/translate';
import { VendorsDataGridProjectCell } from '../../components/VendorsDataGridProjectCell';
import { VendorsGridLinkedCell } from '../../components/VendorsGridLinkedCell';
import * as styles from './styles';

type Props = {
  gridRef: RefObject<DataGridReact>;
};

export const VendorDataGridInfinityScroll = ({ gridRef }: Props) => {
  const { alert } = useAlert();
  const { formatCurrencyValue } = useFormatValueAgGrid();

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'visualId',
        headerName: 'ID',
        filter: 'agTextColumnFilter',
        width: 120,
        cellRenderer: (props: any) => {
          return (
            props.value || (
              <Loading size={20} sx={{ alignItems: 'flex-start' }} />
            )
          );
        },
        suppressMovable: true,
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        }
      },
      {
        field: 'externalId',
        headerName: tr('shared.externalID'),
        filter: 'agTextColumnFilter',
        width: 120,
        suppressMovable: true,
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        }
      },
      {
        field: 'name',
        headerName: tr('shared.name'),
        filter: 'agTextColumnFilter',
        cellRenderer: VendorsGridLinkedCell,
        flex: 2,
        filterParams: {
          filterOptions: ['contains'],
          suppressAndOrCondition: true
        }
      },
      {
        field: 'accountBalance',
        headerName: tr('shared.accountBalance'),
        valueFormatter: formatCurrencyValue,
        filter: '',
        sortable: false
      },
      {
        field: 'businessPartnerGroup.name',
        headerName: tr('shared.businessPartnerGroup'),
        filter: '',
        sortable: false,
        width: 240,
        flex: 2
      },
      {
        field: 'project.name',
        headerName: tr('shared.project'),
        filter: '',
        sortable: false,
        cellRenderer: VendorsDataGridProjectCell,
        width: 240,
        flex: 1
      },
      {
        field: 'openInvoices',
        headerName: tr('shared.openBills'),
        filter: '',
        flex: 1
      },
      {
        field: 'primaryContact',
        filter: '',
        sortable: false,
        headerName: tr('shared.contact'),
        cellRenderer: ContactCell,
        width: 280
      }
    ],
    [formatCurrencyValue]
  );

  const dataSource = useMemo<IDatasource>(
    () => ({
      getRows(params: IGetRowsParams) {
        core.vendor
          .query({
            skip: params.startRow,
            take: params.endRow,
            visualId: params.filterModel?.visualId?.filter,
            externalId: params.filterModel?.externalId?.filter,
            name: params.filterModel?.name?.filter,
            sortColumn: params.sortModel[0]?.colId,
            sortDirection: params.sortModel[0]?.sort
          })
          .then((res) => {
            params.successCallback(res.data, Number(res.totalRecords));
          })
          .catch(() => {
            alert({
              title: tr('shared.search.notFound.title'),
              message: tr('shared.search.notFound.message'),
              severity: 'error'
            });
            params.failCallback();
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

  const handleResetFilters = useCallback(() => {
    if (!gridRef?.current) return;
    gridRef.current.api.setFilterModel(null);
  }, [gridRef]);

  const handleExportCSV = useCallback(() => {
    gridRef?.current?.api?.exportDataAsCsv({
      fileName: `vendors-export-${new Date().toISOString()}.csv`,
      onlySelectedAllPages: false,
      allColumns: false,
      columnKeys: [
        'visualId',
        'externalId',
        'name',
        'accountBalance',
        'businessPartnerGroup.name',
        'project.name',
        'openInvoices'
      ]
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
        <Tooltip title={tr('shared.download')}>
          <IconButton onClick={handleExportCSV} color="inherit">
            <DownloadTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Box>
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
          sortable: true,
          filter: true,
          floatingFilter: true,
          minWidth: 100
        }}
        onGridReady={onGridReady}
      />
    </Box>
  );
};
