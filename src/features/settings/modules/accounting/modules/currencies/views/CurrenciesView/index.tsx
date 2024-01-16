//material-ui
import { Box, Typography } from '@mui/material';
//resources
import { useEffect, useState } from 'react';
//translate
import { tr } from 'shared/translate';
//styles
import core from 'core.v2';
import { LoggedUser } from 'core.v2/domain/logged-user/entity/logged-user';
import * as React from 'react';
import { StatusEnum } from '../../../../../../../../core/domain/connection/StatusEnum';
import { useGetConnectionStatus } from '../../../../../../../../shared/modules/layout/modules/toolbar/modules/Sync/queries/getConnectionStatus';
import CurrenciesGrid from '../../components/CurrenciesGrid';
import CurrenciesPanel from '../../components/CurrenciesPanel';
import * as styles from './styles';

export const CurrenciesView = () => {
  // TODO: make the user object global across the whole app
  const [user, setUser] = useState<LoggedUser | undefined>(undefined);
  const { data: connectionStatus } = useGetConnectionStatus();

  useEffect(() => {
    core.auth.getAuthUser().then((user) => {
      setUser(user.attributes);
    });
  }, []);

  return (
    <Box sx={styles.container}>
      <CurrenciesPanel />
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="h5">
            {tr('settings.accounting.currencies.title')}
          </Typography>
          <Typography color="text.secondary">
            {tr('settings.accounting.currencies.subtitle')}
          </Typography>
        </Box>
      </Box>
      {connectionStatus?.status !== StatusEnum.ACTIVE && (
        <Typography color="error" sx={{ py: 1 }}>
          {tr(
            'setting.accounting.currencies.missing_integration_configuration'
          )}
        </Typography>
      )}
      <CurrenciesGrid />
    </Box>
  );
};

export default CurrenciesView;
