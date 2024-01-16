import { Step as MuiStep, StepLabel, Stepper } from '@mui/material';
import { useCreationWizard } from '../../hooks/useCreationWizard';
import * as styles from './styles';

export const CreationWizardStepper = () => {
  const { activeStep, steps } = useCreationWizard();

  return (
    <Stepper activeStep={activeStep} sx={styles.container}>
      {steps.map((step, idx) => (
        <MuiStep key={`${step.label}-${idx}`}>
          <StepLabel>{step.label}</StepLabel>
        </MuiStep>
      ))}
    </Stepper>
  );
};
