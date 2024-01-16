import { Box } from '@mui/material';
import { useGetVendor } from 'features/vendors/modules/vendor/queries/useGetVendor';
import { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Loading } from 'shared/components/Loading';
import { ColumnDefProps } from 'shared/grids/DataGrid';
import { VendorsDataGrid } from '../../../shared/components/VendorsDataGrid';
import { ContactsDataGridActionsCell } from '../../components/ContactsDataGridActionsCell';
import { ContactsDataGridMainContactCell } from '../../components/ContactsDataGridMainContactCell';
import { ContactsDataGridNotesCell } from '../../components/ContactsDataGridNotesCell';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const ContactsView = () => {
  const { data, isLoading } = useGetVendor();

  const columnDefsData = useMemo<ColumnDefProps[]>(
    () => [
      {
        field: 'isPrimaryContact',
        headerName: tr('vendors.vendor.contact.main'),
        cellRenderer: ContactsDataGridMainContactCell,
        filter: 'agTextColumnFilter',
        type: 'rightAligned',
        maxWidth: 88,
        suppressMovable: true,
        pinned: 'left'
      },
      {
        field: 'name',
        headerName: tr('vendors.vendor.contact.name'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        maxWidth: 104,
        suppressMovable: true,
        pinned: 'left'
      },
      {
        field: 'email',
        headerName: tr('vendors.vendor.contact.email'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        minWidth: 240,
        suppressMovable: true,
        pinned: 'left'
      },
      {
        field: 'position',
        headerName: tr('vendors.vendor.contact.position'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter'
      },
      {
        field: 'phone1',
        headerName: tr('vendors.vendor.contact.phone01'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter'
      },
      {
        field: 'phone2',
        headerName: tr('vendors.vendor.contact.phone02'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter'
      },
      {
        field: 'gender',
        headerName: tr('vendors.vendor.contact.gender'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter'
      },
      {
        field: 'notes',
        headerName: tr('vendors.vendor.contact.notes'),
        cellRenderer: ContactsDataGridNotesCell,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: tr('vendors.vendor.contact.actions'),
        cellRenderer: ContactsDataGridActionsCell
      }
    ],
    []
  );

  return (
    <Box sx={styles.container}>
      <VendorsDataGrid
        rowData={isLoading ? undefined : data?.contacts ?? []}
        columnDefs={columnDefsData}
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1
        }}
        overlayLoadingTemplate={ReactDOMServer.renderToString(<Loading />)}
      />
    </Box>
  );
};

export default ContactsView;
