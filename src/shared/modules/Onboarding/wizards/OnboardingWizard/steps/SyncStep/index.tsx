import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { tr } from 'shared/translate';
import { useCallback, useEffect } from 'react';
import { Loading } from 'shared/components/Loading';
import { useCallbackRef } from 'shared/hooks/useCallbackRef';
import { useSync } from '../../../../hooks/useSync';
import * as styles from './styles';

export const SyncStep = () => {
  const { syncSettingsSapErpMutation, getTenantSettings } = useSync();

  const handleRetry = useCallback(() => {
    getTenantSettings.refetch();
  }, [getTenantSettings]);

  const handleSyncSettingsSapErp = useCallbackRef(
    syncSettingsSapErpMutation.mutate
  );

  useEffect(() => {
    handleSyncSettingsSapErp();
  }, [handleSyncSettingsSapErp]);

  return (
    <Box sx={styles.container}>
      {getTenantSettings.isError && (
        <>
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>{tr('shared.pullData.error.title')}</AlertTitle>
            {tr('shared.pullData.error.description')}
          </Alert>
          <Button variant="contained" onClick={handleRetry} sx={{ mt: 2 }}>
            {tr('retry')}
          </Button>
        </>
      )}
      {!getTenantSettings.isError && (
        <Loading
          title={tr('shared.synchronizing')}
          size={32}
          sx={{ height: 'fit-content', mt: 3 }}
        />
      )}
    </Box>
  );
};
