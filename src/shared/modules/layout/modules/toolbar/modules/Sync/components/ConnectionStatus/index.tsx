import { Box } from '@mui/material';

import { useConnectionStatus } from 'shared/hooks/useConnectionStatus';
import { ErpConnect } from '../ErpConnect';
import { ErpConnectionStatus } from '../ErpConnectionStatus';
import { GlobalStatePreview } from '../GlobalStatePreview';
import * as styles from './styles';

export const ConnectionStatus = () => {
  const { isStatusActive } = useConnectionStatus();

  return (
    <Box id="container" sx={styles.container}>
      {isStatusActive && (
        <>
          <ErpConnectionStatus />
          <GlobalStatePreview />
        </>
      )}
      {!isStatusActive && <ErpConnect />}
    </Box>
  );
};
