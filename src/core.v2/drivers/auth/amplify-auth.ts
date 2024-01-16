/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth as AWSAuth } from 'aws-amplify';
import { AuthInterface } from './auth.interface';

type MfaType = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | null | undefined;

export class AmplifyAuth implements AuthInterface {
  private _auth: typeof AWSAuth;

  constructor() {
    this._auth = AWSAuth;
  }

  getAuthUser() {
    return this._auth.currentAuthenticatedUser();
  }

  getCurrentSession() {
    return this._auth.currentSession();
  }

  signIn(login: string, password: string): Promise<any> {
    return this._auth.signIn(login, password);
  }

  confirmSignIn(user: any, code: string, mfaType?: MfaType): Promise<any> {
    return this._auth.confirmSignIn(user, code, mfaType);
  }

  resetPassword(login: string): Promise<any> {
    return this._auth.forgotPassword(login);
  }

  resetPasswordConfirmation(
    login: string,
    verificationCode: string,
    newPassword: string
  ): Promise<string> {
    return this._auth.forgotPasswordSubmit(
      login,
      verificationCode,
      newPassword
    );
  }

  completeNewPassword(user: any, password: string): Promise<any> {
    return this._auth.completeNewPassword(user, password);
  }

  signOut() {
    return this._auth.signOut();
  }
}
