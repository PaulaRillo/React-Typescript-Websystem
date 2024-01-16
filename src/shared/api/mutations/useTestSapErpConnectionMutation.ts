import { TestSapErpConnectionInputDTO } from 'core/infra/service/settings/TestSapErpConnection/TestSapErpConnectionInputDTO';
import { useMutation } from 'react-query';
import { testSapErpConnection } from '../requests/testSapErpConnection';

export const useTestSapErpConnectionMutation = () => {
  return useMutation((input: TestSapErpConnectionInputDTO) =>
    testSapErpConnection(input)
  );
};
