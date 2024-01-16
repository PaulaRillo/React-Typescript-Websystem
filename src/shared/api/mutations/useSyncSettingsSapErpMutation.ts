import { useMutation } from 'react-query';
import { syncSettingsSapErp } from '../requests/syncSettingsSapErp';

export const useSyncSettingsSapErpMutation = () => {
  return useMutation(() => syncSettingsSapErp());
};
