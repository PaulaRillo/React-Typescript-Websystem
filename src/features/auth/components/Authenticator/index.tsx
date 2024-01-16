import { AuthProvider } from 'features/auth/context/AuthProvider';
import { CognitoUser } from 'features/auth/types/cognito-user';
import { AuthView } from 'features/auth/views/AuthView';

type Props = {
  onAuth: (user: CognitoUser) => Promise<void>;
};

export const Authenticator = ({ onAuth }: Props) => {
  return (
    <AuthProvider onAuth={onAuth}>
      <AuthView />
    </AuthProvider>
  );
};

export default Authenticator;
