import { StatusEnum } from 'core/domain/connection/StatusEnum';
import { lazy, Suspense } from 'react';
import { GlobalLoader } from 'shared/components/GlobalLoader';
import { useGetConnectionStatus } from 'shared/modules/layout/modules/toolbar/modules/Sync/queries/getConnectionStatus';

type Props = {
  children: JSX.Element;
};

const OnboardingView = lazy(() =>
  import('shared/modules/Onboarding').then((module) => ({
    default: module.OnboardingView
  }))
);

export const SyncStatusVerify = ({ children }: Props) => {
  const { data, isLoading } = useGetConnectionStatus();

  if (isLoading || !data) {
    return <GlobalLoader />;
  }

  if (data.status === StatusEnum.PENDING_CONFIGURATION) {
    return (
      <Suspense fallback={<GlobalLoader />}>
        <OnboardingView />
      </Suspense>
    );
  }

  return children;
};
