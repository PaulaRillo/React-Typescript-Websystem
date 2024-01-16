import { Box } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';
import { DataGrid } from 'shared/grids/DataGrid';
import { useRoles } from '../../hooks/useRoles';
import { RolesDataGridActionsCell } from '../RolesDataGridActionsCell';
import { RolesDataGridTypeCell } from '../RolesDataGridTypeCell';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const RolesDataGrid = () => {
  const { data } = useRoles();

  interface RoleTranslations {
    [key: string]: string;
  }

  const roleTranslations: RoleTranslations = {
    Accountant: tr('shared.accountant'),
    Administrator: tr('shared.administrator'),
    Approver: tr('shared.approver'),
    Auditor: tr('shared.auditor'),
    Payer: tr('shared.payer')
  };

  const descriptionTranslations: {
    [id: string]: string;
  } = {
    BILLTALLY_ACCOUNTANT: tr('settings.access.roles.accountantDescription'),
    BILLTALLY_ADMINISTRATOR: tr(
      'settings.access.roles.administratorDescription'
    ),
    BILLTALLY_APPROVER: tr('settings.access.roles.approverDescription'),
    BILLTALLY_AUDITOR: tr('settings.access.roles.auditorDescription'),
    BILLTALLY_PAYER: tr('settings.access.roles.payerDescription')
  };

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: tr('shared.name'),
        field: 'name',
        filter: 'agTextColumnFilter',
        valueFormatter: ({ value }) => roleTranslations[value] || value
      },
      {
        headerName: tr('shared.description'),
        field: 'description',
        filter: 'agTextColumnFilter',
        valueGetter: (params) =>
          descriptionTranslations[params.data.id] || params.data.description,
        flex: 1
      },
      {
        headerName: tr('shared.type'),
        field: 'is_system_managed',
        filter: 'agTextColumnFilter',
        cellRenderer: RolesDataGridTypeCell
      },
      {
        headerName: tr('shared.actions'),
        field: 'id',
        filter: 'agTextColumnFilter',
        cellRenderer: RolesDataGridActionsCell
      }
    ],
    []
  );

  return (
    <Box component="section" sx={styles.container}>
      <DataGrid rowData={data} columnDefs={columnDefs} domLayout="autoHeight" />
    </Box>
  );
};
