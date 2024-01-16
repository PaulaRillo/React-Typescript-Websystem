//core-components
import { AuthContainer } from '../../components/AuthContainer';
import { SignInForm } from '../../components/SignInForm';
//translate
import { tr } from 'shared/translate';

export const SignInView = () => {
  return (
    <AuthContainer
      title={tr('auth.signIn.title')}
      subTitle={tr('auth.signIn.subTitle')}
    >
      <SignInForm />
    </AuthContainer>
  );
};
