import { Box, LinearProgress, Skeleton, Typography } from '@mui/material';
import { SyncStateOutput } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { useMemo } from 'react';
import { Spacer } from 'shared/components/Spacer';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = SyncStateOutput & {
  totalFulfilled: number;
  totalSteps: number;
};

export const SyncProgress = ({
  globalState,
  totalFulfilled,
  totalSteps
}: Props) => {
  const percentageCompleted: number = useMemo(() => {
    if (!totalFulfilled) return 0;
    if (!totalSteps) return 0;
    const percentage = (totalFulfilled / totalSteps) * 100;
    return percentage >= 100 ? 100 : Number(percentage.toFixed(2));
  }, [totalFulfilled, totalSteps]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.title}>
        <Typography variant="h6">
          {tr(`shared.sync-status.step.${globalState.currentStepName}`)}
        </Typography>
        <Spacer />
        {percentageCompleted ? (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {tr('shared.sync-status.step.completed', {
              completed: totalFulfilled,
              total: totalSteps
            })}
          </Typography>
        ) : (
          <Skeleton variant="text" width={100} />
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentageCompleted}
        color="info"
        sx={styles.progress}
      />
    </Box>
  );
};
