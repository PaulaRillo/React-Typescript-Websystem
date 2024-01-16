import { Stack, Typography } from '@mui/material';
import { TenantSyncStatusType } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useMemo } from 'react';
import {
  Section,
  SectionContent,
  SectionHeader
} from 'shared/components/Section';
import { Spacer } from 'shared/components/Spacer';
import { Tag } from 'shared/components/Tag';
import { tr } from 'shared/translate';
import { SyncTime } from '../SyncTime';

type Props = {
  syncStep: TenantSyncStatusType;
};

export const StepLog = ({ syncStep }: Props) => {
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
    return color[syncStep.sync.current.syncStatus];
  }, [syncStep.sync]);

  const prevTagType = useMemo(() => {
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
    return color[syncStep.sync.prev.syncStatus];
  }, [syncStep.sync]);

  return (
    <Section defaultExpanded={false}>
      <SectionHeader sx={{ mx: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {tr('shared.sync-log')}
        </Typography>
      </SectionHeader>
      <SectionContent>
        <Stack
          direction="row"
          spacing={2}
          p={2}
          sx={{ borderBottom: '1px solid', borderColor: 'grey.300' }}
        >
          {syncStep.sync.current.startedAt && (
            <SyncTime
              title={tr('shared.started-at')}
              date={syncStep.sync.current.startedAt}
            />
          )}
          {syncStep.sync.current.lastSyncAt && (
            <SyncTime
              title={tr('shared.last-sync')}
              date={syncStep.sync.current.lastSyncAt}
            />
          )}
          {syncStep.sync.current.failedAt && (
            <SyncTime
              title={tr('shared.failed-at')}
              date={syncStep.sync.current.failedAt}
            />
          )}
          <Spacer />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {tr('shared.sync.current')}
          </Typography>
          <Tag
            type={tagType}
            label={tr(`shared.sync.status.${syncStep.sync.current.syncStatus}`)}
            sx={{
              border: '1px solid',
              height: 'fit-content',
              borderColor: 'grey.300',
              borderRadius: 1
            }}
          />
        </Stack>

        <Stack direction="row" spacing={2} p={2}>
          {syncStep.sync.prev.startedAt && (
            <SyncTime
              title={tr('shared.started-at')}
              date={syncStep.sync.prev.startedAt}
            />
          )}
          {syncStep.sync.prev.lastSyncAt && (
            <SyncTime
              title={tr('shared.last-sync')}
              date={syncStep.sync.prev.lastSyncAt}
            />
          )}
          {syncStep.sync.prev.failedAt && (
            <SyncTime
              title={tr('shared.failed-at')}
              date={syncStep.sync.prev.failedAt}
            />
          )}
          <Spacer />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {tr('shared.sync.previous')}
          </Typography>
          <Tag
            type={prevTagType}
            label={tr(`shared.sync.status.${syncStep.sync.prev.syncStatus}`)}
            sx={{
              border: '1px solid',
              height: 'fit-content',
              borderColor: 'grey.300',
              borderRadius: 1
            }}
          />
        </Stack>
      </SectionContent>
    </Section>
  );
};
