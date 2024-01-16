//core-components
import { AuthContainer } from '../../components/AuthContainer';
//translate
import { tr } from 'shared/translate';
import { MfaForm } from 'features/auth/components/MfaForm';
import { useAuth } from 'features/auth/hooks/useAuth';

export const SMSMfaView = () => {
  const { smsMfaInfo } = useAuth();

  return (
    <AuthContainer
      title={tr('auth.mfa.title')}
      subTitle={tr('auth.mfa.subTitle.sms', {
        destination: smsMfaInfo.destination
      })}
    >
      <MfaForm />
    </AuthContainer>
  );
};
