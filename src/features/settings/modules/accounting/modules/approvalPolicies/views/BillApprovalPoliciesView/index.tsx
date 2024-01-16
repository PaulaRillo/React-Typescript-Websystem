//material-ui
import { Box, Button, ButtonGroup, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DeleteOutline } from '@mui/icons-material';
//resources
import { useCallback, useMemo, useRef, useState } from 'react';
//core-components
import {
  ColumnDefProps,
  DataGridReact,
  ToolbarDataGrid
} from 'shared/grids/DataGrid';
import { DeleteModal } from 'features/settings/modules/shared/components/DeleteModal';
import { SettingsDataGrid } from 'features/settings/modules/shared/components/SettingsDataGrid';
import { AvatarStackCell } from 'shared/grids/DataGrid/components/AvatarStackCell';
import { BillApprovalPoliciesLinkNameCell } from '../../components/BillApprovalPoliciesLinkNameCell';
import { BillApprovalPolicyCreateModal } from '../../components/BillApprovalPolicyCreateModal';
import { BillApprovalPoliciesActionsCell } from '../../components/BillApprovalPoliciesActionsCell';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';
import {
  Permission,
  PermissionKey,
  usePermission
} from 'shared/modules/Permission';

export type Policy = {
  policies: string;
  rules: string;
  approvers: string;
  actions: string;
};

export const BillApprovalPoliciesView = () => {
  const { matchAll } = usePermission();
  const hasPermission = useMemo(
    () => ({
      manageApprovalWorkflow: matchAll([PermissionKey.MANAGE_APPROVAL_WORKFLOW])
    }),
    [matchAll]
  );
  const gridRef = useRef<DataGridReact>(null);
  const [selectedRows, setSelectedRows] = useState<Policy[]>();
  const hasSelectedRows = Boolean(selectedRows && selectedRows.length > 0);
  const [
    openBillApprovalPolicyCreateModal,
    setOpenBillApprovalPolicyCreateModal
  ] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenBillApprovalPolicyCreateModal = useCallback(() => {
    setOpenBillApprovalPolicyCreateModal(true);
  }, []);

  const handleCloseBillApprovalPolicyCreateModal = useCallback(() => {
    setOpenBillApprovalPolicyCreateModal(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const rowData = useMemo(
    () => [
      {
        id: '123',
        name: 'Policy 1 Expense Approval',
        rules: ['Total Amount', 'Vendor'],
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
        name: 'Policy 2 Approval',
        rules: ['Total Amount'],
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
        name: 'Policy 3 Miami',
        rules: ['Vendor'],
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
        id: '456',
        name: 'Policy 4 Web Services',
        rules: ['Total Amount', 'Vendor'],
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

  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'name',
        cellRenderer: BillApprovalPoliciesLinkNameCell,
        filter: 'agTextColumnFilter',
        width: 320,
        checkboxSelection: hasPermission.manageApprovalWorkflow,
        headerCheckboxSelection: hasPermission.manageApprovalWorkflow,
        flex: 1
      },
      {
        field: 'rules',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 320
      },
      {
        field: 'approvers',
        cellRenderer: AvatarStackCell,
        filter: 'agTextColumnFilter'
      },
      hasPermission.manageApprovalWorkflow
        ? {
            field: 'actions',
            cellRenderer: BillApprovalPoliciesActionsCell,
            filter: 'agTextColumnFilter',
            width: 120
          }
        : {}
    ],
    [hasPermission.manageApprovalWorkflow]
  );

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSelectedRows(selectedRows);
  }, []);

  const handleDelete = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="h5">
            {tr('settings.accounting.billApprovalPolicies.title')}
          </Typography>
          <Typography color="text.secondary">
            {tr('settings.accounting.billApprovalPolicies.subtitle')}
          </Typography>
        </Box>
        <Box sx={styles.button}>
          <ToolbarDataGrid gridRef={gridRef}>
            <Permission matchAll={[PermissionKey.MANAGE_APPROVAL_WORKFLOW]}>
              <ButtonGroup variant="outlined" aria-label="split button">
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleOpenBillApprovalPolicyCreateModal}
                >
                  {tr('settings.accounting.billApprovalPolicies.new')}
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
                    onClick={handleOpen}
                    disabled={!hasSelectedRows}
                  >
                    <DeleteOutline />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Permission>
          </ToolbarDataGrid>
        </Box>
      </Box>
      <SettingsDataGrid
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefsData}
        onSelectionChanged={onSelectionChanged}
        domLayout="autoHeight"
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true
        }}
      />
      <BillApprovalPolicyCreateModal
        open={openBillApprovalPolicyCreateModal}
        onClose={handleCloseBillApprovalPolicyCreateModal}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default BillApprovalPoliciesView;
