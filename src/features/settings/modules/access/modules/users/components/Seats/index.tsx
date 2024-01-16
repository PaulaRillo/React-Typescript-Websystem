import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {
  Box,
  LinearProgress,
  Skeleton,
  Tooltip,
  Typography
} from '@mui/material';
import { useMemo } from 'react';
import { Spacer } from 'shared/components/Spacer';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = {
  usersQuota: number;
  usersQuotaUsed: number;
};

export const Seats = ({ usersQuota, usersQuotaUsed }: Props) => {
  const percentageUsed: number = useMemo(() => {
    if (!usersQuota) return 0;
    if (!usersQuotaUsed) return 0;
    const percentage = (usersQuotaUsed / usersQuota) * 100;
    return percentage >= 100 ? 100 : Number(percentage.toFixed(2));
  }, [usersQuota, usersQuotaUsed]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.seats}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="h6">{tr('shared.seats')}</Typography>
          <Tooltip title={tr('shared.seatsInfo')}>
            <InfoTwoToneIcon color="primary" fontSize="small" />
          </Tooltip>
        </Box>
        <Spacer />
        {percentageUsed ? (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {tr('shared.usedSeats', {
              available: usersQuota - usersQuotaUsed,
              total: usersQuota
            })}
          </Typography>
        ) : (
          <Skeleton variant="text" width={100} />
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentageUsed}
        sx={styles.progress}
      />
    </Box>
  );
};
