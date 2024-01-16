import { Box, Button, Stack, Tooltip } from '@mui/material';
import { UserStatusEnum } from 'core.v2/domain/user/enum/UserStatusEnum';
import { ModuleHeader } from 'features/settings/modules/shared/components/ModuleHeader';
import { useCallback, useMemo, useState } from 'react';
import { useGetQuotas } from 'shared/api/queries/useGetQuotas';
import { Loading } from 'shared/components/Loading';
import { Tag } from 'shared/components/Tag';
import { DataGrid } from 'shared/grids/DataGrid';
import { CellRenderProps, ColumnDefProps } from 'shared/grids/DataGrid/types';
import {
  Permission,
  PermissionKey,
  usePermission
} from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import { DataGridActionsCell } from '../../components/DataGridActionsCell';
import { Seats } from '../../components/Seats';
import { useGetUsers } from '../../queries/useGetUsers';
import { AddUserModalView } from '../AddUserModalView';
import * as styles from './styles';

export const UsersView = () => {
  const { matchAll } = usePermission();
  const [open, setOpen] = useState(false);

  const {
    data: users,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching
  } = useGetUsers();

  const {
    data: quotas,
    isLoading: isQuotasLoading,
    isFetching: isQuotasFetching
  } = useGetQuotas();

  const quotaUsed = useMemo(() => {
    return users?.filter(
      (user) =>
        user?.statusId === UserStatusEnum.ACTIVE ||
        user?.statusId === UserStatusEnum.PENDING
    );
  }, [users]);

  const isLoading = useMemo(() => {
    return isUsersLoading || isQuotasLoading;
  }, [isQuotasLoading, isUsersLoading]);

  const isFetching = useMemo(() => {
    return isUsersFetching || isQuotasFetching || isLoading;
  }, [isLoading, isQuotasFetching, isUsersFetching]);

  const hasReachedQuota = useMemo((): boolean => {
    if (!quotas?.users) return true;
    if (!quotaUsed?.length) return true;
    return quotas.users <= quotaUsed?.length;
  }, [quotas?.users, quotaUsed?.length]);

  const hasPermission = useMemo(
    () => ({
      manageUser: matchAll([PermissionKey.MANAGE_USER])
    }),
    [matchAll]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const getUserStatusEnumLabel = useCallback((params: CellRenderProps) => {
    type Type =
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'neutral'
      | undefined;
    const statusType: Type[] = ['success', 'neutral', 'warning'];
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Tag
          label={tr(`shared.userStatus.${params?.data?.statusId}`)}
          type={statusType[Number(params?.data?.statusId) - 1] || 'info'}
        />
      </Box>
    );
  }, []);

  const columnDefs: ColumnDefProps[] = useMemo(
    () => [
      {
        headerName: tr('shared.username'),
        field: 'username',
        filter: 'agTextColumnFilter'
      },
      {
        headerName: tr('shared.firstName'),
        field: 'firstName',
        filter: 'agTextColumnFilter'
      },
      {
        headerName: tr('shared.lastName'),
        field: 'lastName',
        filter: 'agTextColumnFilter'
      },
      {
        headerName: tr('shared.email'),
        field: 'email',
        filter: 'agTextColumnFilter'
      },
      {
        headerName: tr('shared.status'),
        field: 'statusId',
        filter: 'agTextColumnFilter',
        cellRenderer: getUserStatusEnumLabel
      },
      hasPermission.manageUser
        ? {
            headerName: tr('shared.actions'),
            field: 'id',
            cellRenderer: DataGridActionsCell
          }
        : {}
    ],
    [getUserStatusEnumLabel, hasPermission.manageUser]
  );

  return (
    <Stack
      component="section"
      id="users"
      spacing={2}
      sx={{ width: '100%', p: 2, pl: 0 }}
    >
      <ModuleHeader
        title={tr('shared.users')}
        description={tr('settings.access.users.description')}
        end={
          <Box sx={styles.actions}>
            {isFetching && (
              <Box sx={styles.loading}>
                <Loading size={16} />
              </Box>
            )}
            <Seats
              usersQuota={quotas?.users || 0}
              usersQuotaUsed={quotaUsed?.length || 0}
            />
            <Tooltip
              title={
                isLoading
                  ? ''
                  : hasReachedQuota
                  ? tr('shared.reachedUserLimit')
                  : tr('shared.addNewUser')
              }
            >
              <span>
                <Permission matchAll={[PermissionKey.MANAGE_USER]}>
                  <Button
                    variant="outlined"
                    onClick={handleOpen}
                    disabled={hasReachedQuota}
                    sx={styles.button}
                  >
                    {tr('shared.newUser')}
                  </Button>
                </Permission>
              </span>
            </Tooltip>
          </Box>
        }
      />
      <AddUserModalView open={open} onClose={handleClose} />
      <Box sx={styles.dataGrid}>
        <DataGrid
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, minWidth: 100, flex: 1 }}
        />
      </Box>
    </Stack>
  );
};

export default UsersView;
