import { Button, ButtonProps } from '@mui/material';
import { tr } from 'shared/translate';
import { useCallback } from 'react';
import { useCreationWizard } from '../../hooks/useCreationWizard';

type Props = {
  defaultProps?: ButtonProps;
};

export const ForwardActions = ({ defaultProps }: Props) => {
  const { setActiveStep, totalSteps } = useCreationWizard();

  const handleNext = useCallback(() => {
    setActiveStep((prev) => {
      if (prev === totalSteps) return prev;
      return prev + 1;
    });
  }, [setActiveStep, totalSteps]);

  return (
    <Button variant="contained" onClick={handleNext} {...defaultProps}>
      {tr('shared.next')}
    </Button>
  );
};
