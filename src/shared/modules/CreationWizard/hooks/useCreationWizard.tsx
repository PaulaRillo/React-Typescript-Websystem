import { useContext } from 'react';
import { CreationWizardContext } from '../context/CreationWizardContext';

export const useCreationWizard = () => {
  return useContext(CreationWizardContext);
};
