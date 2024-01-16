//material-ui
import { Box, Button, ButtonGroup, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DeleteOutline } from '@mui/icons-material';
//resources
import { useCallback, useMemo, useRef, useState } from 'react';
//core-components
import { ColumnDefProps, DataGridReact } from 'shared/grids/DataGrid';
import { AvatarStackCell } from 'shared/grids/DataGrid/components/AvatarStackCell';
import { SettingsDataGrid } from 'features/settings/modules/shared/components/SettingsDataGrid';
import { DeleteModal } from 'features/settings/modules/shared/components/DeleteModal';
import { BillApprovalPolicyActionsCell } from 'features/settings/modules/accounting/modules/approvalGroups/components/BillApprovalGroupActionsCell';
import { ApprovalGroupCreateModal } from '../../components/ApprovalGroupCreateModal';
//translate
import { tr } from 'shared/translate';
import {
  Permission,
  PermissionKey,
  usePermission
} from 'shared/modules/Permission';
//styles
import * as styles from './styles';

export type Approver = {
  group: string;
  approvers: string;
  actions: string;
};

export const ApprovalGroupView = () => {
  const { matchAll } = usePermission();
  const hasPermission = useMemo(
    () => ({
      manageApprovalWorkflow: matchAll([PermissionKey.MANAGE_APPROVAL_WORKFLOW])
    }),
    [matchAll]
  );

  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'group',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 148,
        checkboxSelection: hasPermission.manageApprovalWorkflow,
        headerCheckboxSelection: hasPermission.manageApprovalWorkflow
      },
      {
        field: 'approvers',
        cellRenderer: AvatarStackCell,
        filter: 'agTextColumnFilter',
        flex: 1
      },
      hasPermission.manageApprovalWorkflow
        ? {
            field: 'actions',
            cellRenderer: BillApprovalPolicyActionsCell,
            filter: 'agTextColumnFilter',
            width: 120
          }
        : {}
    ],
    [hasPermission.manageApprovalWorkflow]
  );

  const rowData = useMemo(
    () => [
      {
        id: '123',
        group: 'Managers',
        approvers: [
          {
            firstname: 'Paula',
            lastname: 'Rillo'
          },
          {
            firstname: 'Franscisco',
            lastname: 'Lozada'
          }
        ]
      },
      {
        id: '234',
        group: 'Technology',
        approvers: [
          {
            firstname: 'Carlos',
            lastname: 'Pinell'
          },
          {
            firstname: 'Gregorio',
            lastname: 'Martocci'
          }
        ]
      },
      {
        id: '345',
        group: 'Hiring',
        approvers: [
          {
            firstname: 'Carlos',
            lastname: 'Pinell'
          },
          {
            firstname: 'Gregorio',
            lastname: 'Martocci'
          },
          {
            firstname: 'Franscisco',
            lastname: 'Lozada'
          }
        ]
      }
    ],
    []
  );

  const gridRef = useRef<DataGridReact>(null);
  const [selectedRows, setSelectedRows] = useState<Approver[]>();
  const hasSelectedRows = Boolean(selectedRows && selectedRows.length > 0);
  const [columnDefs] = useState<ColumnDefProps[]>(columnDefsData);
  const [openCreateApprovalGroupModal, setOpenCreateApprovalGroupModal] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenCreateApprovalGroupModal = () => {
    setOpenCreateApprovalGroupModal(true);
  };

  const handleCloseCreateApprovalGroupModal = () => {
    setOpenCreateApprovalGroupModal(false);
  };

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSelectedRows(selectedRows);
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="h5">
            {tr('settings.accounting.billApprovalPolicyGroup.title')}
          </Typography>
          <Typography color="text.secondary">
            {tr('settings.accounting.billApprovalPolicyGroup.subtitle')}
          </Typography>
        </Box>
        <Permission matchAll={[PermissionKey.MANAGE_APPROVAL_WORKFLOW]}>
          <Box sx={styles.button}>
            <ButtonGroup variant="outlined" aria-label="split button">
              <Button
                startIcon={<AddIcon />}
                onClick={handleOpenCreateApprovalGroupModal}
              >
                {tr('settings.accounting.billApprovalPolicyGroup.new')}
              </Button>
              <Tooltip
                title={tr(
                  'settings.accounting.billApprovalPolicies.deleteSelected'
                )}
                placement="bottom"
                arrow
              >
                <Button
                  aria-label={tr(
                    'settings.accounting.billApprovalPolicies.deleteSelected'
                  )}
                  onClick={handleOpenDeleteModal}
                  disabled={!hasSelectedRows}
                >
                  <DeleteOutline />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Box>
        </Permission>
      </Box>

      <SettingsDataGrid
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        onSelectionChanged={onSelectionChanged}
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true
        }}
      />
      <ApprovalGroupCreateModal
        open={openCreateApprovalGroupModal}
        onClose={handleCloseCreateApprovalGroupModal}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={() => console.log('delete')}
      />
    </Box>
  );
};

export default ApprovalGroupView;
