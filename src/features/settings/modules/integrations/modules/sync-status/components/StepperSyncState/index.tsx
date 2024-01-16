import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography
} from '@mui/material';
import { SyncStateOutput } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useMemo } from 'react';
import { Spacer } from 'shared/components/Spacer';
import { Tag } from 'shared/components/Tag';
import { tr } from 'shared/translate';
import { SyncStatusIcon } from '../SyncStatusIcon';

type Props = SyncStateOutput;

export const StepperSyncState = ({ globalState, steps }: Props) => {
  const syncedSteps = useMemo(() => {
    const fulfilled = steps.filter((step) => {
      return step.sync.current.syncStatus === SyncStatusEnum.FULFILLED;
    });
    return fulfilled.length;
  }, [steps]);

  return (
    <Box
      id="stepper-sync-state"
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 2
      }}
    >
      <Tag type="neutral" label={tr('shared.steps')} />
      <Stepper activeStep={globalState.currentStepPosition} sx={{ ml: 2 }}>
        {steps.map((step) => {
          const syncStatus = step.sync.current.syncStatus;
          const isFulfilled = syncStatus === SyncStatusEnum.FULFILLED;
          const isRejected = syncStatus === SyncStatusEnum.REJECTED;
          const isIdle = syncStatus === SyncStatusEnum.IDLE;

          return (
            <Step
              expanded
              key={step.name}
              completed={isFulfilled}
              disabled={isIdle}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 16,
                height: 16,
                m: 0,
                mr: 2,
                p: 0
              }}
            >
              <Tooltip
                title={tr(`shared.sync-status.step.${step.name}`)}
                arrow={false}
              >
                <StepLabel
                  error={isRejected}
                  icon={<SyncStatusIcon syncState={syncStatus} />}
                />
              </Tooltip>
            </Step>
          );
        })}
      </Stepper>
      <Spacer />
      <Typography variant="caption" sx={{ fontWeight: 500 }}>
        {tr('shared.sync-status.step.completed', {
          completed: syncedSteps,
          total: steps.length
        })}
      </Typography>
    </Box>
  );
};
