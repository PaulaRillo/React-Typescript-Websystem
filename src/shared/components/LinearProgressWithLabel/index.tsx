import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography
} from '@mui/material';

type Props = LinearProgressProps & { value: number };

export const LinearProgressWithLabel = ({ value, ...props }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="caption" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};
