import { ButtonProps } from '@mui/material';
import { Dispatch } from 'react';
import { Step } from './Step';

export type Action = {
  forward?: {
    render?: (props: ActionRenderProps) => JSX.Element;
    defaultProps?: ButtonProps;
  };
  backward?: {
    render?: (props: ActionRenderProps) => JSX.Element;
    defaultProps?: ButtonProps;
  };
};

export type ActionRenderProps = {
  steps: Step[];
  totalSteps: number;
  activeStep: number;
  setActiveStep: Dispatch<React.SetStateAction<number>>;
};
