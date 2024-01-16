import { Box, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import * as styles from './styles';
import { tr } from 'shared/translate';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingStatus = () => {
  return (
    <Box id="container" sx={styles.container}>
      <Box sx={styles.status}>
        <SyncIcon color="disabled" sx={styles.icon} />
        {/* <CircularProgress /> */}
        <Typography variant="body2" sx={styles.text}>
          {tr('loading_connection_status')}
        </Typography>
      </Box>
    </Box>
  );
};
