import { useCallback, useMemo, useRef } from 'react';
//core-components
import { Container } from 'shared/components/Container';
import { Header } from 'shared/components/Header';
import { DataGridReact } from 'shared/grids/DataGrid';
//translate
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import core from 'core.v2';
import { BillsDataGridInfiniteScroll } from 'shared/grids/BillsDataGrid/components/BillsDataGridInfiniteScroll';
import { useAlert } from 'shared/hooks/useAlert';
import { tr } from 'shared/translate';

const BillsView = () => {
  const { alert } = useAlert();
  const gridRef = useRef<DataGridReact>(null);

  const dataSource = useMemo<IDatasource>(
    () => ({
      getRows(params: IGetRowsParams) {
        core.invoice
          .query({
            skip: params.startRow,
            take: params.endRow,
            vendorName: params.filterModel?.[`invoiceFrom.name`]?.filter || '',
            invoiceExternalId: params.filterModel?.externalId?.filter || '',
            externalApInvoiceNumber: params.filterModel?.externalApInvoiceNumber?.filter || '', //prettier-ignore
            referenceNumberExternal: params.filterModel?.referenceNumberExternal?.filter || '', //prettier-ignore
            currencyId: params.filterModel?.[`currency.iso4217Alpha3`]?.filter || '', //prettier-ignore
            dueDateStart: params.filterModel?.[`summary.dueDate.value`]?.dateFrom || '', //prettier-ignore
            dueDateEnd: params.filterModel?.[`summary.dueDate.value`]?.dateTo || '', //prettier-ignore
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

  return (
    <Container>
      <Header title={tr('bills.title')} />
      <BillsDataGridInfiniteScroll
        gridRef={gridRef}
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
          flex: 1
        }}
        onGridReady={onGridReady}
      />
    </Container>
  );
};

export default BillsView;
