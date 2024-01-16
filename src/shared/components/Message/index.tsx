import { Box, Typography } from '@mui/material';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as styles from './styles';

type Props = {
  type: 'success' | 'error';
  value: string;
};

export const Message = ({ type, value }: Props) => {
  const icon = {
    success: <CheckCircleIcon color="success" />,
    error: <ErrorOutlinedIcon color="error" />
  };

  const color = {
    success: 'success',
    error: 'error'
  };

  return (
    <Box sx={styles.container}>
      {icon[type]}
      <Typography variant="caption" color={color[type]}>
        {value}
      </Typography>
    </Box>
  );
};
