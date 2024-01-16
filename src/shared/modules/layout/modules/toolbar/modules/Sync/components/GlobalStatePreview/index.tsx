import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tooltip
} from '@mui/material';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useCallback, useMemo } from 'react';
import { useSyncSapErp } from 'shared/api/mutations/useSyncSapErp';
import { useGetTenantSyncStatus } from 'shared/api/queries/useGetTenantSyncStatus';
import { Loading } from 'shared/components/Loading';
import { Spacer } from 'shared/components/Spacer';
import { Tag } from 'shared/components/Tag';
import { TitleIcon } from 'shared/components/TitleIcon';
import { useNav } from 'shared/hooks/useNav';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import { SyncProgressPreview } from '../SyncProgressPreview';
import { SyncStatusIcon } from '../SyncStatusIcon';
import { SyncTime } from '../SyncTime';
import * as styles from './styles';

export const GlobalStatePreview = () => {
  const { data, refetch, isRefetching } = useGetTenantSyncStatus();
  const { mutate, isLoading: isSyncSapErpLoading } = useSyncSapErp();

  const globalState = useMemo(() => {
    return data?.globalState;
  }, [data?.globalState]);

  const steps = useMemo(() => {
    return data?.steps;
  }, [data?.steps]);

  const syncedSteps = useMemo(() => {
    if (!steps) return 0;
    const fulfilled = steps?.filter((step) => {
      return step?.sync?.current?.syncStatus === SyncStatusEnum.FULFILLED;
    });
    return fulfilled.length;
  }, [steps]);

  const tagType = useMemo(() => {
    const color: {
      [key in SyncStatusEnum]:
        | 'success'
        | 'error'
        | 'info'
        | 'warning'
        | 'neutral';
    } = {
      [SyncStatusEnum.FULFILLED]: 'success',
      [SyncStatusEnum.REJECTED]: 'error',
      [SyncStatusEnum.IDLE]: 'neutral',
      [SyncStatusEnum.PROCESSING]: 'info'
    };
    return color[globalState?.syncStatus || SyncStatusEnum.IDLE];
  }, [globalState?.syncStatus]);

  const syncStatusColor = useMemo(() => {
    const color: { [key in SyncStatusEnum]: string } = {
      [SyncStatusEnum.FULFILLED]: 'success.main',
      [SyncStatusEnum.REJECTED]: 'error.main',
      [SyncStatusEnum.IDLE]: 'grey.400',
      [SyncStatusEnum.PROCESSING]: 'info.main'
    };
    return color[globalState?.syncStatus || SyncStatusEnum.IDLE];
  }, [globalState?.syncStatus]);

  const isProcessing = useMemo(() => {
    return globalState?.syncStatus === SyncStatusEnum.PROCESSING;
  }, [globalState?.syncStatus]);

  const isIdle = useMemo(() => {
    return globalState?.syncStatus === SyncStatusEnum.IDLE;
  }, [globalState?.syncStatus]);

  const handleNavigate = useNav('data-path');

  const handleSyncErp = useCallback(() => {
    mutate();
  }, [mutate]);

  if (!data) {
    return (
      <Box sx={styles.container(syncStatusColor)}>
        <Stack direction="row" sx={{ pl: 1 }}>
          <TitleIcon
            icon={
              <Box>
                <Loading size={16} />
              </Box>
            }
            title={tr(`shared.sync-status`)}
            titleProps={{
              variant: 'caption',
              sx: { fontWeight: 700, fontSize: 14 }
            }}
            boxProps={{
              px: 1,
              height: 40
            }}
          />
          <Spacer />
          <Skeleton variant="text" width={120} sx={{ mr: 1 }} />
        </Stack>
      </Box>
    );
  }

  return (
    <Stack direction="column" spacing={1}>
      <Box sx={styles.container(syncStatusColor)}>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ p: 1, alignItems: 'center' }}
        >
          <TitleIcon
            icon={
              <SyncStatusIcon
                syncState={globalState?.syncStatus || SyncStatusEnum.IDLE}
              />
            }
            title={tr(`shared.sync-status`)}
            titleProps={{
              variant: 'caption',
              sx: { fontWeight: 700, fontSize: 14 }
            }}
            boxProps={{
              px: 1
            }}
          />
          {globalState?.syncStatus && (
            <Tag
              type={tagType}
              label={tr(`shared.sync.status.${globalState?.syncStatus}`)}
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 1,
                height: 'fit-content'
              }}
            />
          )}
          <Spacer />
          <Tooltip title={tr('shared.refresh')}>
            <span>
              <IconButton
                size="small"
                onClick={() => refetch()}
                disabled={isRefetching}
              >
                {isRefetching ? (
                  <Box sx={{ width: 20, height: 20 }}>
                    <Loading size={14} />
                  </Box>
                ) : (
                  <RefreshTwoToneIcon fontSize="small" />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
        {globalState && !isIdle && <Divider light />}
        {!isIdle && (
          <Stack direction="column" spacing={1} py={1} pl={2} pr={1}>
            {globalState?.startedAt && (
              <SyncTime
                title={tr('shared.started-at')}
                date={globalState?.startedAt}
              />
            )}
            {globalState?.lastSyncAt && (
              <SyncTime
                title={tr('shared.last-sync')}
                date={globalState?.lastSyncAt}
              />
            )}
            {globalState?.failedAt && (
              <SyncTime
                title={tr('shared.failed-at')}
                date={globalState?.failedAt}
              />
            )}
          </Stack>
        )}
        {isProcessing && (
          <>
            <Divider light />
            {globalState && steps && (
              <SyncProgressPreview
                globalState={globalState}
                steps={steps}
                totalSteps={steps.length}
                totalFulfilled={syncedSteps}
              />
            )}
          </>
        )}
      </Box>
      <Stack direction="row" spacing={1}>
        <Button
          variant="text"
          fullWidth
          onClick={handleNavigate}
          data-path={`/settings/integrations/sync-status`}
        >
          {tr('shared.sync-status')}
        </Button>
        <Permission matchAll={[PermissionKey.EXECUTE_CONNECTION_SYNC]}>
          <Button
            variant="contained"
            fullWidth
            disabled={isSyncSapErpLoading || isProcessing}
            onClick={handleSyncErp}
          >
            {tr('shared.syncNow')}
          </Button>
        </Permission>
      </Stack>
    </Stack>
  );
};
