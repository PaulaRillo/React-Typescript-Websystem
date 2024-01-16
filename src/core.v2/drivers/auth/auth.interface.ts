export interface AuthInterface {
  getAuthUser(): Promise<any>;
  getCurrentSession(): Promise<any>;
  signIn(login: string, password: string): Promise<any>;
  confirmSignIn(user: unknown, code: string, mfaType: any): Promise<any>;
  completeNewPassword(user: any, password: string): Promise<any>;
  resetPassword(login: string): Promise<any>;
  resetPasswordConfirmation(
    login: string,
    verificationCode: string,
    newPassword: string
  ): Promise<string>;
  signOut(): Promise<any>;
}
