import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { Box, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const SuccessStep = () => {
  return (
    <Box sx={styles.container}>
      <CheckCircleTwoToneIcon color="success" sx={styles.icon} />
      <Typography variant="h5" mt={2}>
        {tr('shared.syncCompleted')}
      </Typography>
    </Box>
  );
};
