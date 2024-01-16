import { createContext, Dispatch, useState } from 'react';
import { Step } from '../types/Step';

type Props = {
  steps: Step[];
  totalSteps: number;
  children: JSX.Element | JSX.Element[];
};

type InitialState = {
  steps: Step[];
  totalSteps: number;
  activeStep: number;
  setActiveStep: Dispatch<React.SetStateAction<number>>;
};

const CreationWizardContext = createContext({
  activeStep: 0
} as InitialState);

const CreationWizardProvider = ({ children, steps, totalSteps }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <CreationWizardContext.Provider
      value={{
        steps,
        totalSteps,
        activeStep,
        setActiveStep
      }}
    >
      {children}
    </CreationWizardContext.Provider>
  );
};

export { CreationWizardContext, CreationWizardProvider };
