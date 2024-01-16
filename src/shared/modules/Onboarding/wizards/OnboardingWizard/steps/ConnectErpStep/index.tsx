import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { Info } from 'shared/components/Info';
import { useSync } from '../../../../hooks/useSync';
import { Header } from '../../components/Header';
import * as styles from './styles';

export const ConnectErpStep = () => {
  const { sapErpConnectionInfo } = useSync();

  return (
    <>
      <Header
        title={tr('shared.connect')}
        subTitle={tr('shared.connect.subTitle')}
      />
      <Box sx={styles.container}>
        <Info
          title={`${tr('shared.erp')} / ${tr('shared.accountingSoftware')}`}
        >
          <Typography variant="body2">SAP</Typography>
        </Info>
        <Info title={`${tr('shared.host')}:`}>
          <Typography variant="body2">
            {sapErpConnectionInfo?.host || ''}
          </Typography>
        </Info>
        <Info title={`${tr('shared.dbname')}:`}>
          <Typography variant="body2">
            {sapErpConnectionInfo?.credentials.dbname || ''}
          </Typography>
        </Info>
        <Info title={`${tr('shared.username')}:`}>
          <Typography variant="body2">
            {sapErpConnectionInfo?.credentials.username || ''}
          </Typography>
        </Info>
        <Info title={`${tr('shared.password')}:`}>
          <Typography variant="body2">
            {sapErpConnectionInfo?.credentials.password &&
              [...sapErpConnectionInfo.credentials.password].map(() => '*')}
          </Typography>
        </Info>
        <Alert severity="info" sx={{ mt: 2 }} icon={<InfoTwoToneIcon />}>
          <AlertTitle>{tr('shared.important')}</AlertTitle>
          {tr('settings.integrations.connectionSetup.reviewConnect.disclaimer')}
        </Alert>
      </Box>
    </>
  );
};
