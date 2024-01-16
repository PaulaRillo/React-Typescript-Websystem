import { Box } from '@mui/material';
import { TenantSyncStatusType } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useMemo } from 'react';
import { Spacer } from 'shared/components/Spacer';
import { Tag } from 'shared/components/Tag';
import { TitleIcon } from 'shared/components/TitleIcon';
import { tr } from 'shared/translate';
import { ApInvoiceSyncProgress } from '../ApInvoiceSyncProgress';
import { StepLog } from '../StepLog';
import { SyncStatusIcon } from '../SyncStatusIcon';
import * as styles from './styles';

type Props = {
  syncStep: TenantSyncStatusType;
};

export const ApInvoiceSyncStep = ({ syncStep }: Props) => {
  const syncStatus = syncStep.sync.current.syncStatus;
  const totalInvoices = syncStep.sync.current.totalInvoices;
  const totalInvoicesToSync = syncStep.sync.current.totalInvoicesToSync;

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
    return color[syncStatus];
  }, [syncStatus]);

  const titleColor = useMemo(() => {
    const color: { [key in SyncStatusEnum]: string } = {
      [SyncStatusEnum.FULFILLED]: 'success.main',
      [SyncStatusEnum.REJECTED]: 'error.main',
      [SyncStatusEnum.IDLE]: 'disabled',
      [SyncStatusEnum.PROCESSING]: 'info.main'
    };
    return color[syncStatus];
  }, [syncStatus]);

  const syncStatusColor = useMemo(() => {
    const color: { [key in SyncStatusEnum]: string } = {
      [SyncStatusEnum.FULFILLED]: 'success.main',
      [SyncStatusEnum.REJECTED]: 'error.main',
      [SyncStatusEnum.IDLE]: 'grey.400',
      [SyncStatusEnum.PROCESSING]: 'info.main'
    };
    return color[syncStatus];
  }, [syncStatus]);

  const isProcessing = useMemo(() => {
    return syncStatus === SyncStatusEnum.PROCESSING;
  }, [syncStatus]);

  const totalSynced = useMemo(() => {
    if (!totalInvoices) return 0;
    if (!totalInvoicesToSync) return 0;
    return totalInvoices - totalInvoicesToSync;
  }, [totalInvoices, totalInvoicesToSync]);

  return (
    <Box sx={styles.container(syncStatusColor)}>
      <Box sx={styles.content}>
        <Box sx={styles.header}>
          <TitleIcon
            icon={<SyncStatusIcon syncState={syncStatus} />}
            title={tr(`shared.sync-status.step.${syncStep.name}`)}
            titleProps={{
              variant: 'h6',
              color: titleColor,
              sx: { fontWeight: 500 }
            }}
          />
          <Spacer />
          {isProcessing && (
            <ApInvoiceSyncProgress
              total={syncStep.sync.current.totalInvoices || 0}
              totalSynced={totalSynced}
            />
          )}
          <Tag
            type={tagType}
            label={syncStep.sync.current.syncStatus}
            sx={{
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 1
            }}
          />
        </Box>
        <StepLog syncStep={syncStep} />
      </Box>
    </Box>
  );
};
