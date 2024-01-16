import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography
} from '@mui/material';
import { SyncStateOutput } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useMemo } from 'react';
import { Tag } from 'shared/components/Tag';
import { tr } from 'shared/translate';
import { SyncStatusIcon } from '../SyncStatusIcon';

type Props = SyncStateOutput;

export const StepperSyncStateVertical = ({ globalState, steps }: Props) => {
  const syncedSteps = useMemo(() => {
    const fulfilled = steps.filter((step) => {
      return step.sync.current.syncStatus === SyncStatusEnum.FULFILLED;
    });
    return fulfilled.length;
  }, [steps]);
  return (
    <Box
      sx={{
        py: 1,
        px: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Tag type="neutral" label={tr('shared.steps')} />
        <Typography variant="caption" sx={{ fontWeight: 500 }}>
          {tr('shared.sync-status.step.completed', {
            completed: syncedSteps,
            total: steps.length
          })}
        </Typography>
      </Stack>
      <Stepper activeStep={globalState.currentStepPosition} connector={null}>
        {steps.map((step) => {
          const syncStatus = step.sync.current.syncStatus;
          const isFulfilled = syncStatus === SyncStatusEnum.FULFILLED;
          const isRejected = syncStatus === SyncStatusEnum.REJECTED;
          const isIdle = syncStatus === SyncStatusEnum.IDLE;

          return (
            <Step key={step.name} completed={isFulfilled} disabled={isIdle}>
              <Tooltip title={tr(`shared.sync-status.step.${step.name}`)}>
                <StepLabel
                  error={isRejected}
                  icon={
                    <Box sx={{ height: 12, width: 12 }}>
                      <SyncStatusIcon syncState={syncStatus} />
                    </Box>
                  }
                />
              </Tooltip>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};
