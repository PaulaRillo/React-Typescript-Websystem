//core-components
import { AuthContainer } from '../../components/AuthContainer';
//translate
import { tr } from 'shared/translate';
//styles
import { ResetPasswordForm } from 'features/auth/components/ResetPasswordForm';

export const ResetPasswordView = () => {
  return (
    <AuthContainer
      title={tr('shared.forgotPassword')}
      subTitle={tr('auth.resetPassword.subTitle')}
    >
      <ResetPasswordForm />
    </AuthContainer>
  );
};
