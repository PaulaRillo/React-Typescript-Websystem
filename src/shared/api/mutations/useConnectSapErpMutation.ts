import { ConnectSapErpInputDTO } from 'core/infra/service/settings/ConnectSapErp/ConnectSapErpInputDTO';
import { useMutation } from 'react-query';
import { connectSapErp } from '../requests/connectSapErp';

export const useConnectSapErpMutation = () => {
  return useMutation((input: ConnectSapErpInputDTO) => connectSapErp(input));
};
