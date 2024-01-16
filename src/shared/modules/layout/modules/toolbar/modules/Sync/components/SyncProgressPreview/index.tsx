import {
  Box,
  Divider,
  LinearProgress,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import { SyncStateOutput } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { useMemo } from 'react';
import { Tag } from 'shared/components/Tag';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = SyncStateOutput & {
  totalFulfilled: number;
  totalSteps: number;
};

export const SyncProgressPreview = ({
  globalState,
  totalFulfilled,
  totalSteps,
  steps
}: Props) => {
  const percentageCompleted: number = useMemo(() => {
    if (!totalFulfilled) return 0;
    if (!totalSteps) return 0;
    const percentage = (totalFulfilled / totalSteps) * 100;
    return percentage >= 100 ? 100 : Number(percentage.toFixed(2));
  }, [totalFulfilled, totalSteps]);

  const totalInvoicesToSync = useMemo(() => {
    if (globalState?.currentStepName !== 'ap_invoices') return 0;
    if (!steps) return 0;
    return steps[Number(globalState?.currentStepPosition || 16) - 1].sync.current.totalInvoicesToSync || 0; //prettier-ignore
  }, [globalState?.currentStepName, globalState?.currentStepPosition, steps]);

  const totalInvoices = useMemo(() => {
    if (globalState?.currentStepName !== 'ap_invoices') return 0;
    if (!steps) return 0;
    return steps[Number(globalState?.currentStepPosition || 16) - 1].sync.current.totalInvoices || 0; //prettier-ignore
  }, [globalState?.currentStepName, globalState?.currentStepPosition, steps]);

  const invoiceSynced = useMemo(() => {
    if (globalState?.currentStepName !== 'ap_invoices') return 0;
    if (!steps) return 0;
    return totalInvoices - totalInvoicesToSync;
  }, [globalState?.currentStepName, steps, totalInvoices, totalInvoicesToSync]);

  return (
    <Box sx={styles.container}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: 'flex', alignItems: 'center', p: 1, pl: 2 }}
      >
        <Tag
          type="neutral"
          label={tr(`shared.steps`)}
          sx={{
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1,
            height: 'fit-content'
          }}
        />
        <LinearProgress
          variant="determinate"
          value={percentageCompleted}
          color="info"
          sx={styles.progress}
        />
        {percentageCompleted ? (
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, minWidth: 104, textAlign: 'right' }}
          >
            {tr('shared.sync-status.step.completed', {
              completed: totalFulfilled,
              total: totalSteps
            })}
          </Typography>
        ) : (
          <Skeleton variant="text" width={100} />
        )}
      </Stack>
      <Divider light />
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', p: 1, pl: 2 }}
      >
        <Tag
          type="neutral"
          label={tr(`shared.step`)}
          sx={{
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1,
            height: 'fit-content'
          }}
        />
        {globalState.currentStepName ? (
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {tr(`shared.sync-status.step.${globalState.currentStepName}`)}
          </Typography>
        ) : (
          <Skeleton variant="text" width={100} />
        )}

        {totalInvoices !== 0 && (
          <Typography variant="caption">
            {`(${tr('shared.sync-status.step.ap_invoices.synced', {
              completed: invoiceSynced,
              total: totalInvoices
            })})`}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
