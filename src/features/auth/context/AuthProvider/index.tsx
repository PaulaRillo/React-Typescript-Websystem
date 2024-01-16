/* eslint-disable @typescript-eslint/no-explicit-any */
import core from 'core.v2';
import { IAuthError } from 'features/auth/types/authError';
import { CognitoUser } from 'features/auth/types/cognito-user';
import { ViewType } from 'features/auth/types/view';
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useState
} from 'react';

type Props = {
  onAuth: (user: CognitoUser) => Promise<void>;
  children: ReactNode;
};

type SMSMfaInfo = {
  medium: string;
  destination: string;
};

type MfaType = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | null | undefined;
type ConfirmSignIn = (code: string, mfaType: MfaType) => void;
type SignIn = (login: string, password: string) => void;
type CompleteNewPassword = (password: string) => void;
type ResetPassword = (login: string) => void;
type ResetPasswordConfirmation = (
  verificationCode: string,
  newPassword: string
) => void;

type InitialState = {
  signIn: SignIn;
  confirmSignIn: ConfirmSignIn;
  completeNewPassword: CompleteNewPassword;
  resetPassword: ResetPassword;
  resetPasswordConfirmation: ResetPasswordConfirmation;
  smsMfaInfo: SMSMfaInfo;
  isLoading: boolean;
  error?: IAuthError;
  setView: Dispatch<React.SetStateAction<ViewType>>;
  view: ViewType;
};

const AuthContext = createContext({ view: 'SIGN_IN' } as InitialState);

const AuthProvider = ({ children, onAuth }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IAuthError | undefined>(undefined);
  const [smsMfaInfo, setSmsMfaInfo] = useState<SMSMfaInfo>({} as SMSMfaInfo);
  const [view, setView] = useState<ViewType>('SIGN_IN');
  const [unauthorizedUser, setUnauthorizedUser] = useState<any>(undefined);
  const [tempLogin, setTempLogin] = useState<string>('');

  const handleChallenge = useCallback((user: CognitoUser) => {
    setUnauthorizedUser(user);
    switch (user.challengeName) {
      case 'NEW_PASSWORD_REQUIRED':
        setView('RESET_PASSWORD');
        break;
      case 'SMS_MFA':
        setSmsMfaInfo({
          medium: user.challengeParam.CODE_DELIVERY_DELIVERY_MEDIUM,
          destination: user.challengeParam.CODE_DELIVERY_DESTINATION
        });
        setView('SMS_MFA');
        break;
      default:
        console.error(`[${user.challengeName}] Challenge not implemented yet`);
        break;
    }
  }, []);

  const handleError = useCallback((error: IAuthError) => {
    switch (error.code) {
      case 'PasswordResetRequiredException':
        setView('RESET_PASSWORD');
        break;
      default:
        setError(error);
        console.error(`[${error.code}] ${error.message}`);
        break;
    }
  }, []);

  const signIn = useCallback<SignIn>(
    async (login, password) => {
      setError(undefined);
      setIsLoading(true);
      try {
        const cognitoUser: CognitoUser = await core.auth.signIn(
          login,
          password
        );
        if (cognitoUser.challengeName) {
          setIsLoading(false);
          handleChallenge(cognitoUser);
        } else {
          await onAuth(cognitoUser);
        }
      } catch (error: any) {
        setIsLoading(false);
        handleError(error);
      }
    },
    [handleChallenge, handleError, onAuth]
  );

  const confirmSignIn = useCallback<ConfirmSignIn>(
    (code, mfaType) => {
      setError(undefined);
      setIsLoading(true);
      core.auth
        .confirmSignIn(unauthorizedUser, code, mfaType)
        .then((user) => {
          onAuth(user);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleError, onAuth, unauthorizedUser]
  );

  const completeNewPassword = useCallback<CompleteNewPassword>(
    (password) => {
      setError(undefined);
      setIsLoading(true);
      core.auth
        .completeNewPassword(unauthorizedUser, password)
        .then(() => {
          setView('SIGN_IN');
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleError, unauthorizedUser]
  );

  const resetPassword = useCallback<ResetPassword>(
    (login) => {
      setError(undefined);
      setIsLoading(true);
      setTempLogin(login);
      core.auth
        .resetPassword(login)
        .then(() => {
          setView('RESET_PASSWORD_CONFIRMATION');
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleError]
  );

  const resetPasswordConfirmation = useCallback<ResetPasswordConfirmation>(
    (verificationCode, newPassword) => {
      setError(undefined);
      setIsLoading(true);
      core.auth
        .resetPasswordConfirmation(tempLogin, verificationCode, newPassword)
        .then(() => {
          setView('SIGN_IN');
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleError, tempLogin]
  );

  return (
    <AuthContext.Provider
      value={{
        signIn,
        confirmSignIn,
        completeNewPassword,
        resetPassword,
        resetPasswordConfirmation,
        smsMfaInfo,
        isLoading,
        error,
        setView,
        view
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
