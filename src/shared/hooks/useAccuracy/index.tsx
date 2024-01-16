import core from 'core.v2';
import { TenantSettingsType } from 'core.v2/domain/@shared/types/tenant-settings.type';
import { useMemo } from 'react';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';

export const useAccuracy = () => {
  const { data } = useGetTenantSettings();
  const accuracy = useMemo(() => core.utils.createAccuracyDigits(data as TenantSettingsType), [data]); //prettier-ignore

  return {
    accuracy
  };
};
