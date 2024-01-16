import { Box, Stack, Typography } from '@mui/material';
import { ModuleHeader } from 'features/settings/modules/shared/components/ModuleHeader';
import { useGetTenantSyncStatus } from 'shared/api/queries/useGetTenantSyncStatus';
import { Loading } from 'shared/components/Loading';
import { tr } from 'shared/translate';
import { ApInvoiceSyncStep } from '../../components/ApInvoiceSyncStep';
import { GlobalState } from '../../components/GlobalState';
import { SyncStep } from '../../components/SyncStep';
import * as styles from './styles';

export const SyncStatus = () => {
  const { data } = useGetTenantSyncStatus();

  return (
    <Stack component="section" spacing={2} sx={styles.container}>
      <ModuleHeader
        title={tr('shared.sync-status')}
        description={tr('shared.sync-status.description')}
      />
      {!data && <Loading />}
      <Stack component="section" sx={{ height: '100%', width: '100%', pb: 26 }}>
        {data && <GlobalState {...data} />}

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
            zIndex: 'fab',
            maxWidth: 1000,
            borderRadius: 2,
            pb: 1,
            mt: 2
          }}
        >
          {tr('shared.steps')}
        </Typography>

        <Box component="section" sx={{ height: '100%', overflow: 'auto' }}>
          <Stack spacing={1.5} sx={{ height: 'fit-content' }}>
            {data &&
              data.steps.map((step) =>
                step.name === 'ap_invoices' ? (
                  <ApInvoiceSyncStep key={step.name} syncStep={step} />
                ) : (
                  <SyncStep key={step.name} syncStep={step} />
                )
              )}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
