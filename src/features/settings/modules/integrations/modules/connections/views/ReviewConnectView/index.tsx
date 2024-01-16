import { Box, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { Info } from 'shared/components/Info';
import { useIntegration } from '../../hooks/useIntegration';
import * as styles from './styles';

export const ReviewConnectView = () => {
  const { sapErpConnectionInfo } = useIntegration();

  return (
    <Box sx={styles.container}>
      <Info title="ERP / Accounting Software:">
        <Typography variant="body2">SAP</Typography>
      </Info>
      <Info title="Host:">
        <Typography variant="body2">
          {sapErpConnectionInfo?.host || ''}
        </Typography>
      </Info>
      <Info title="Database:">
        <Typography variant="body2">
          {sapErpConnectionInfo?.credentials.dbname || ''}
        </Typography>
      </Info>
      <Info title="Username:">
        <Typography variant="body2">
          {sapErpConnectionInfo?.credentials.username || ''}
        </Typography>
      </Info>
      <Info title="Password:">
        <Typography variant="body2">
          {sapErpConnectionInfo?.credentials.password &&
            [...sapErpConnectionInfo.credentials.password].map(() => '*')}
        </Typography>
      </Info>
      <Typography
        variant="body1"
        sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2, mt: 2 }}
      >
        {tr('settings.integrations.connectionSetup.reviewConnect.disclaimer')}
      </Typography>
    </Box>
  );
};
