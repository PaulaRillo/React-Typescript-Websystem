import { useCreationWizard } from '../../hooks/useCreationWizard';

type Props = {
  children: JSX.Element[];
};

export const CreationWizardStepSwitcher = ({ children }: Props) => {
  const { activeStep } = useCreationWizard();
  return children[activeStep] || <></>;
};
