import { Box, LinearProgress, Typography } from '@mui/material';
import { useMemo } from 'react';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = {
  totalSynced: number;
  total: number;
};

export const ApInvoiceSyncProgress = ({ totalSynced, total }: Props) => {
  const percentageCompleted: number = useMemo(() => {
    if (!totalSynced) return 0;
    if (!total) return 0;
    const percentage = (totalSynced / total) * 100;
    return percentage >= 100 ? 100 : Number(percentage.toFixed(2));
  }, [totalSynced, total]);

  return (
    <Box sx={styles.container}>
      <LinearProgress
        variant="determinate"
        color="info"
        value={percentageCompleted}
        sx={styles.progress}
      />
      <Typography variant="body2" sx={styles.progressLabel}>
        {tr('shared.sync-status.step.ap_invoices.synced', {
          completed: totalSynced,
          total: total
        })}
      </Typography>
    </Box>
  );
};
