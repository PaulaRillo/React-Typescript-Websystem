import { Button, ButtonProps } from '@mui/material';
import { tr } from 'shared/translate';
import { useCallback } from 'react';
import { useCreationWizard } from '../../hooks/useCreationWizard';

type Props = {
  defaultProps?: ButtonProps;
};

export const BackwardActions = ({ defaultProps }: Props) => {
  const { setActiveStep } = useCreationWizard();

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  }, [setActiveStep]);

  return (
    <Button variant="outlined" onClick={handleBack} {...defaultProps}>
      {tr('shared.back')}
    </Button>
  );
};
