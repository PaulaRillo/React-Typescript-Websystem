import { Box, Tooltip, Typography } from '@mui/material';
import * as styles from './styles';

type Stat = {
  value: string;
  type: 'info' | 'success' | 'warning' | 'error';
  description: string;
};

type Props = {
  stats: Stat[];
};

export const SectionStats = ({ stats }: Props) => {
  return (
    <Box sx={styles.container}>
      {stats.map(({ value, type, description }, idx) => (
        <Tooltip key={`stat-${idx}`} title={description}>
          <Box sx={{ ...styles.valueContainer, bgcolor: styles.bg[type] }}>
            <Typography variant="caption" sx={{ color: styles.color[type] }}>
              {value}
            </Typography>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};
