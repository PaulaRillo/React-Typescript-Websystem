//material-ui
import { DeleteOutline } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, ButtonGroup, Tooltip, Typography } from '@mui/material';
//resources
import { useCallback, useMemo, useRef, useState } from 'react';
//core-components
import { SettingsDataGrid } from 'features/settings/modules/shared/components/SettingsDataGrid';
import { ColumnDefProps, DataGridReact } from 'shared/grids/DataGrid';

import { DeleteModal } from 'features/settings/modules/shared/components/DeleteModal';
import { AvatarStackCell } from 'shared/grids/DataGrid/components/AvatarStackCell';
import { BillApprovalPolicyAddApproversModal } from '../BillApprovalPolicyAddApproversModal';
import { BillApprovalPolicyApproversActionsCell } from '../BillApprovalPolicyApproversActionsCell';
//translate
import { tr } from 'shared/translate';
//styles
import {
  Permission,
  PermissionKey,
  usePermission
} from 'shared/modules/Permission';
import { Approver } from '../../../approvalGroups/views/ApprovalGroupView';
import * as styles from './styles';

export const ApprovalPolicyApproversGrid = () => {
  const { matchAll } = usePermission();
  const hasPermission = useMemo(
    () => ({
      manageApprovalWorkflow: matchAll([PermissionKey.MANAGE_APPROVAL_WORKFLOW])
    }),
    [matchAll]
  );
  const gridRef = useRef<DataGridReact>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddApproversModal, setOpenAddApproversModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Approver[]>();
  const hasSelectedRows = Boolean(selectedRows && selectedRows.length > 0);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSelectedRows(selectedRows);
  }, []);

  const rowApproversData = useMemo(
    () => [
      {
        id: '123',
        name: 'Managers',
        approvers: [
          {
            id: '123',
            firstname: 'John',
            lastname: 'Doe'
          },
          {
            id: '234',
            firstname: 'Jane',
            lastname: 'Doe'
          }
        ]
      },
      {
        id: '123',
        name: 'HR Managers',
        approvers: [
          {
            id: '123',
            firstname: 'John',
            lastname: 'Doe'
          },
          {
            id: '234',
            firstname: 'Jane',
            lastname: 'Doe'
          }
        ]
      }
    ],
    []
  );

  const columnDefsApproversData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'name',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 320,
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
            cellRenderer: BillApprovalPolicyApproversActionsCell,
            filter: 'agTextColumnFilter',
            width: 120
          }
        : {}
    ],
    [hasPermission.manageApprovalWorkflow]
  );

  const handleOpenAddApproversModal = useCallback(() => {
    setOpenAddApproversModal(true);
  }, []);

  const handleCloseAddApproversModal = useCallback(() => {
    setOpenAddApproversModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const handleDelete = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  return (
    <>
      <Box component="section" sx={styles.section}>
        <Box sx={styles.header}>
          <Box sx={styles.title}>
            <Typography variant="h6">
              {tr('settings.accounting.billApprovalPolicyApprovers.title')}
            </Typography>
          </Box>
          <Permission matchAll={[PermissionKey.MANAGE_APPROVAL_WORKFLOW]}>
            <Box sx={styles.button}>
              <ButtonGroup
                variant="outlined"
                size="small"
                aria-label="split button"
              >
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddApproversModal}
                >
                  {tr('settings.accounting.billApprovalPolicyApprovers.new')}
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
                    disabled={!hasSelectedRows}
                    onClick={handleOpenDeleteModal}
                  >
                    <DeleteOutline />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Box>
          </Permission>
        </Box>
        <DeleteModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
        />
        <SettingsDataGrid
          ref={gridRef}
          rowData={rowApproversData}
          columnDefs={columnDefsApproversData}
          domLayout="autoHeight"
          onSelectionChanged={onSelectionChanged}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true
          }}
        />
        <BillApprovalPolicyAddApproversModal
          open={openAddApproversModal}
          onClose={handleCloseAddApproversModal}
        />
      </Box>
    </>
  );
};
