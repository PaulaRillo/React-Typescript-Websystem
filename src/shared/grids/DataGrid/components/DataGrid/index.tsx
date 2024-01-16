//resources
import { forwardRef, useMemo } from 'react';
//ag-grid
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
//styles
import ReactDOMServer from 'react-dom/server';
import { Loading } from 'shared/components/Loading';
//themes
import 'shared/grids/themes/rounded-bottom.scss';
import 'shared/grids/themes/rounded.scss';
import 'shared/grids/themes/square-no-borders.scss';
import 'shared/grids/themes/square.scss';
//translate
import { tr } from 'shared/translate';

type Props = AgGridReactProps;

export const DataGrid = forwardRef<AgGridReact, Props>(function DataGrid(
  props,
  ref
) {
  const localeText = useMemo(
    () => ({
      filterOoo: tr('shared.filter'),
      equals: tr('shared.equals'),
      notEqual: tr('shared.notEquals'),
      blank: tr('shared.blank'),
      notBlank: tr('shared.notBlank'),
      inRange: tr('shared.inRange'),
      dateFormatOoo: tr('shared.dateFormat'),
      contains: tr('shared.contains'),
      notContains: tr('shared.notContains'),
      startsWith: tr('shared.startsWith'),
      endsWith: tr('shared.endsWith'),
      noRowsToShow: tr('shared.noRowsToShow')
    }),
    []
  );

  const defaultColDef = useMemo(
    () => ({
      minWidth: 150,
      ...props.defaultColDef
    }),
    [props.defaultColDef]
  );

  const gridOptions = useMemo(
    () => ({
      headerHeight: 40,
      rowHeight: 48,
      suppressDragLeaveHidesColumns: true,
      rowDragManaged: true,
      enableRangeSelection: true,
      animateRows: true,
      overlayLoadingTemplate: ReactDOMServer.renderToString(<Loading />),
      alwaysShowHorizontalScroll: true
    }),
    []
  );

  return (
    <AgGridReact
      ref={ref}
      className="ag-theme-hco-rounded"
      defaultColDef={defaultColDef}
      gridOptions={gridOptions}
      localeText={localeText}
      {...props}
    />
  );
});
