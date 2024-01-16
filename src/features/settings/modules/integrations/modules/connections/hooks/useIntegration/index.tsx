import { useContext } from 'react';
import { IntegrationContext } from '../../context/IntegrationProvider';

export const useIntegration = () => {
  return useContext(IntegrationContext);
};
