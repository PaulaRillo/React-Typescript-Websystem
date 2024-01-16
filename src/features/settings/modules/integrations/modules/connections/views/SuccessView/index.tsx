import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import * as styles from './styles';
import { tr } from 'shared/translate';

export const SuccessView = () => {
  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4
        }}
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 120 }} />
        <Typography variant="h5" maxWidth={320} textAlign="center">
          {tr('settings.integrations.connectionSetup.successMessage')}
        </Typography>
      </Box>
    </Box>
  );
};
