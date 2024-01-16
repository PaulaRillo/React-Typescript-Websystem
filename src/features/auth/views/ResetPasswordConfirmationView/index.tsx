//core-components
import { AuthContainer } from '../../components/AuthContainer';
//translate
import { tr } from 'shared/translate';
import { ResetPasswordConfirmationForm } from 'features/auth/components/ResetPasswordConfirmationForm';

export const ResetPasswordConfirmationView = () => {
  return (
    <AuthContainer
      title={tr('auth.resetPasswordConfirmation.title')}
      subTitle={tr('auth.resetPasswordConfirmation.subTitle')}
    >
      <ResetPasswordConfirmationForm />
    </AuthContainer>
  );
};
