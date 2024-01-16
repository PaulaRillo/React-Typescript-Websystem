type Props = {
  activeStep: number;
  children: JSX.Element[];
};

export const StepSwitch = ({ children, activeStep = 0 }: Props) => {
  return children[activeStep];
};
