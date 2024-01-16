import { Box } from '@mui/material';
import { lazy, Suspense, useCallback, useState } from 'react';
import { Loading } from 'shared/components/Loading';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import { HeaderWizard } from '../../wizards/OnboardingWizard/components/HeaderWizard';
import { Welcome } from '../../wizards/OnboardingWizard/components/Welcome';
import * as styles from './styles';

const OnboardingWizard = lazy(() =>
  import('../../wizards/OnboardingWizard').then((mod) => ({
    default: mod.OnboardingWizard
  }))
);

const SyncProvider = lazy(() =>
  import('../../context/SyncProvider').then((mod) => ({
    default: mod.SyncProvider
  }))
);

export const OnboardingView = () => {
  const [started, setStarted] = useState(false);

  const handleStart = useCallback(() => {
    setStarted(true);
  }, []);

  if (!started) {
    return (
      <Box sx={styles.container}>
        <HeaderWizard />
        <Welcome onStart={handleStart} />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <HeaderWizard />
      <Box sx={styles.wizard}>
        <Suspense fallback={<Loading />}>
          <Permission matchAll={[PermissionKey.EXECUTE_CONNECTION_SYNC]}>
            <SyncProvider>
              <OnboardingWizard />
            </SyncProvider>
          </Permission>
        </Suspense>
      </Box>
    </Box>
  );
};
