//views
import { ResetPasswordConfirmationView } from 'features/auth/views/ResetPasswordConfirmationView';
import { ResetPasswordView } from 'features/auth/views/ResetPasswordView';
import { SignInView } from 'features/auth/views/SignInView';
import { SMSMfaView } from 'features/auth/views/SMSMfaView';
//types
import { useAuth } from 'features/auth/hooks/useAuth';
import type { ViewType } from 'features/auth/types/view';
import { NewPasswordRequiredView } from '../NewPasswordRequiredView';

type DisplayView = {
  [key in ViewType]: JSX.Element;
};

export const AuthView = () => {
  const { view } = useAuth();

  const displayView: DisplayView = {
    SIGN_IN: <SignInView />,
    SMS_MFA: <SMSMfaView />,
    NEW_PASSWORD_REQUIRED: <NewPasswordRequiredView />,
    RESET_PASSWORD: <ResetPasswordView />,
    RESET_PASSWORD_CONFIRMATION: <ResetPasswordConfirmationView />,
    CONFIRM_SIGN_UP: <>CONFIRM_SIGN_UP</> //TODO: Implement this view
  };

  return displayView[view];
};
