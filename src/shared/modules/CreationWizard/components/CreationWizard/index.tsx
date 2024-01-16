import { Box } from '@mui/material';
import { CreationWizardProvider } from '../../context/CreationWizardContext';
import { Action } from '../../types/Action';
import { Step } from '../../types/Step';
import { CreationWizardContainer } from '../CreationWizardContainer';
import { CreationWizardControls } from '../CreationWizardControls';
import { CreationWizardStepper } from '../CreationWizardStepper';
import { CreationWizardStepSwitcher } from '../CreationWizardStepSwitcher';
import * as styles from './styles';

type Props = {
  steps: Step[];
  actions: Action[];
  children: JSX.Element[];
};

export const CreationWizard = ({ steps, actions, children }: Props) => {
  const hasSteps = steps && steps.length > 0;
  const hasChildren = children && children.length > 0;

  if (!hasSteps) {
    throw new Error(
      'CreationWizard: steps prop is required and must be an array with at least one element'
    );
  }

  if (!hasChildren) {
    throw new Error(
      'CreationWizard: children prop is required and must be an array with at least one element'
    );
  }

  return (
    <CreationWizardProvider steps={steps} totalSteps={steps.length}>
      <CreationWizardContainer>
        <CreationWizardStepper />
        <Box sx={styles.container}>
          <CreationWizardStepSwitcher>{children}</CreationWizardStepSwitcher>
        </Box>
        <CreationWizardControls actions={actions} />
      </CreationWizardContainer>
    </CreationWizardProvider>
  );
};
