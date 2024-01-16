//core-components
import { AuthContainer } from '../../components/AuthContainer';
import { NewPasswordRequiredForm } from 'features/auth/components/NewPasswordForm';
//translate
import { tr } from 'shared/translate';

export const NewPasswordRequiredView = () => {
  return (
    <AuthContainer
      title={tr('auth.newPassword.title')}
      subTitle={tr('auth.newPassword.subTitle')}
    >
      <NewPasswordRequiredForm />
    </AuthContainer>
  );
};
