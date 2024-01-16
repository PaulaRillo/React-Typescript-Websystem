import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useCreationWizard } from '../../hooks/useCreationWizard';
import { Action } from '../../types/Action';
import { BackwardActions } from '../BackwardActions';
import { ForwardActions } from '../ForwardActions';
import * as styles from './styles';

type Props = {
  actions: Action[];
};

export const CreationWizardControls = ({ actions }: Props) => {
  const { steps, activeStep, setActiveStep, totalSteps } = useCreationWizard();

  const backwardProps = useMemo(
    () => actions[activeStep]?.backward?.defaultProps,
    [actions, activeStep]
  );

  const forwardProps = useMemo(
    () => actions[activeStep]?.forward?.defaultProps,
    [actions, activeStep]
  );

  const hasBackwardRender = useMemo(
    () => !!actions[activeStep]?.backward?.render,
    [actions, activeStep]
  );

  const hasForwardRender = useMemo(
    () => !!actions[activeStep]?.forward?.render,
    [actions, activeStep]
  );

  return (
    <Box sx={styles.container}>
      {hasBackwardRender &&
        actions[activeStep]?.backward?.render?.({
          steps,
          totalSteps,
          activeStep,
          setActiveStep
        })}
      {!hasBackwardRender && <BackwardActions defaultProps={backwardProps} />}
      {hasForwardRender &&
        actions[activeStep]?.forward?.render?.({
          steps,
          totalSteps,
          activeStep,
          setActiveStep
        })}
      {!hasForwardRender && <ForwardActions defaultProps={forwardProps} />}
    </Box>
  );
};
