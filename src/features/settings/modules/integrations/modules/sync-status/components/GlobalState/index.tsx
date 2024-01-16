import CloudSyncTwoToneIcon from '@mui/icons-material/CloudSyncTwoTone';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material';
import { SyncStateOutput } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useMemo } from 'react';
import { useSyncSapErp } from 'shared/api/mutations/useSyncSapErp';
import { useGetTenantSyncStatus } from 'shared/api/queries/useGetTenantSyncStatus';
import { Loading } from 'shared/components/Loading';
import { Spacer } from 'shared/components/Spacer';
import { Tag } from 'shared/components/Tag';
import { TitleIcon } from 'shared/components/TitleIcon';
import { tr } from 'shared/translate';
import { StepperSyncState } from '../StepperSyncState';
import { SyncStatusIcon } from '../SyncStatusIcon';
import { SyncTime } from '../SyncTime';
import * as styles from './styles';

type Props = SyncStateOutput;

export const GlobalState = ({ globalState, steps }: Props) => {
  const { refetch, isRefetching } = useGetTenantSyncStatus();
  const { mutate, isLoading: isSyncSapErpLoading } = useSyncSapErp();

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
    return color[globalState.syncStatus];
  }, [globalState.syncStatus]);

  const titleColor = useMemo(() => {
    const color: { [key in SyncStatusEnum]: string } = {
      [SyncStatusEnum.FULFILLED]: 'success.main',
      [SyncStatusEnum.REJECTED]: 'error.main',
      [SyncStatusEnum.IDLE]: 'disabled',
      [SyncStatusEnum.PROCESSING]: 'info.main'
    };
    return color[globalState.syncStatus];
  }, [globalState.syncStatus]);

  const syncStatusColor = useMemo(() => {
    const color: { [key in SyncStatusEnum]: string } = {
      [SyncStatusEnum.FULFILLED]: 'success.main',
      [SyncStatusEnum.REJECTED]: 'error.main',
      [SyncStatusEnum.IDLE]: 'grey.400',
      [SyncStatusEnum.PROCESSING]: 'info.main'
    };
    return color[globalState.syncStatus];
  }, [globalState.syncStatus]);

  const isProcessing = useMemo(() => {
    return globalState.syncStatus === SyncStatusEnum.PROCESSING;
  }, [globalState.syncStatus]);

  const isRejected = useMemo(() => {
    if (globalState.syncStatus === SyncStatusEnum.REJECTED) return true;
    return steps.some((step) => step.sync.current.syncStatus === SyncStatusEnum.REJECTED); //prettier-ignore
  }, [globalState.syncStatus, steps]);

  return (
    <Box id="global-state" sx={styles.container(syncStatusColor)}>
      <Stack direction="row" spacing={2} sx={styles.header}>
        <TitleIcon
          icon={<SyncStatusIcon syncState={globalState.syncStatus} />}
          title={tr(`shared.sync.status.${globalState.syncStatus}`)}
          titleProps={{
            variant: 'h6',
            color: titleColor,
            sx: { fontWeight: 500 }
          }}
        />
        <Spacer />
        <Stack direction="row" spacing={1} pr={1}>
          <Tooltip title={tr('shared.refresh')}>
            <IconButton
              size="small"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <Box component="span" sx={{ width: 20, height: 20 }}>
                {isRefetching && (
                  <Box>
                    <Loading size={16} />
                  </Box>
                )}
                {!isRefetching && <RefreshTwoToneIcon fontSize="small" />}
              </Box>
            </IconButton>
          </Tooltip>
          <Tooltip title={tr('shared.retry')}>
            <Box component="span" sx={{ width: 20, height: 20 }}>
              <IconButton
                size="small"
                color="primary"
                disabled={isSyncSapErpLoading || !isRejected}
                onClick={() => mutate()}
              >
                <CloudSyncTwoToneIcon fontSize="small" />
              </IconButton>
            </Box>
          </Tooltip>
        </Stack>
        <Tag
          type={tagType}
          label={tr(`shared.sync.status.${globalState.syncStatus}`)}
          sx={{
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1
          }}
        />
      </Stack>

      <Divider light />
      <Stack direction="row" spacing={2} px={2} py={1}>
        {globalState.startedAt && (
          <SyncTime
            title={tr('shared.started-at')}
            date={globalState.startedAt}
          />
        )}
        {globalState.lastSyncAt && (
          <SyncTime
            title={tr('shared.last-sync')}
            date={globalState.lastSyncAt}
          />
        )}
        {globalState.failedAt && (
          <SyncTime
            title={tr('shared.failed-at')}
            date={globalState.failedAt}
          />
        )}
      </Stack>

      <Divider light />
      <StepperSyncState globalState={globalState} steps={steps} />
    </Box>
  );
};
