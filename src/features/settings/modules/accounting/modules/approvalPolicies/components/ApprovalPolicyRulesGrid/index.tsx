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
import { BillApprovalPolicyActionsCell } from '../BillApprovalPolicyActionsCell';
import { BillApprovalPolicyRuleCreateModal } from '../BillApprovalPolicyRuleCreateModal';
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

export const ApprovalPolicyRulesGrid = () => {
  const { matchAll } = usePermission();
  const hasPermission = useMemo(
    () => ({
      manageApprovalWorkflow: matchAll([PermissionKey.MANAGE_APPROVAL_WORKFLOW])
    }),
    [matchAll]
  );
  const gridRef = useRef<DataGridReact>(null);
  const [openNewRuleModal, setOpenNewRuleModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Approver[]>();
  const hasSelectedRows = Boolean(selectedRows && selectedRows.length > 0);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSelectedRows(selectedRows);
  }, []);

  const rowRulesData = useMemo(
    () => [
      {
        id: '123',
        criteria: 'Vendors',
        condition: 'is',
        value: 'AWS - Amazon Web Services'
      },
      {
        id: '234',
        criteria: 'Total amount',
        condition: 'greater than',
        value: 'USD 1200'
      }
    ],
    []
  );

  const columnDefsRulesData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'criteria',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 320,
        checkboxSelection: hasPermission.manageApprovalWorkflow,
        headerCheckboxSelection: hasPermission.manageApprovalWorkflow,
        flex: 1
      },
      {
        field: 'condition',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        width: 320,
        flex: 1
      },
      {
        field: 'value',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
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

  const handleOpenNewRuleModal = useCallback(() => {
    setOpenNewRuleModal(true);
  }, []);

  const handleCloseNewRuleModal = useCallback(() => {
    setOpenNewRuleModal(false);
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
              {tr('settings.accounting.billApprovalPolicy.rule.title')}
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
                  onClick={handleOpenNewRuleModal}
                >
                  {tr('settings.accounting.billApprovalPolicy.rule.new')}
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
        <BillApprovalPolicyRuleCreateModal
          open={openNewRuleModal}
          onClose={handleCloseNewRuleModal}
        />
        <DeleteModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
        />
        <SettingsDataGrid
          ref={gridRef}
          rowData={rowRulesData}
          columnDefs={columnDefsRulesData}
          domLayout="autoHeight"
          onSelectionChanged={onSelectionChanged}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true
          }}
        />
      </Box>
    </>
  );
};
