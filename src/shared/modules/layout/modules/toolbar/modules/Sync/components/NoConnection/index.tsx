import { Box, Typography, Button } from '@mui/material';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import * as styles from './styles';
import { useNav } from 'shared/hooks/useNav';
import { tr } from 'shared/translate';

export const NoConnection = () => {
  const handleNavigate = useNav('data-path');

  return (
    <Box id="container" sx={styles.container}>
      <Box sx={styles.status}>
        <SyncDisabledIcon color="disabled" sx={styles.icon} />
        <Typography variant="body2" sx={styles.text}>
          {tr('shared.noConnection')}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        data-path="/settings/integrations/connection-setup"
        fullWidth
        onClick={handleNavigate}
      >
        {tr('shared.configure')}
      </Button>
    </Box>
  );
};
