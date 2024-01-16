import { useEffect } from 'react';
import type { ActionRenderProps } from 'shared/modules/CreationWizard';
import { useSync } from '../../../../hooks/useSync';

type Props = ActionRenderProps;

export const PullDataActions = ({ setActiveStep }: Props) => {
  const { getTenantSettings } = useSync();

  useEffect(() => {
    if (getTenantSettings.isSuccess) {
      setActiveStep((prev: any) => prev + 1);
    }
  }, [setActiveStep, getTenantSettings.isSuccess]);

  return <></>;
};
