export interface IAuth {
  getAuthUser(): Promise<unknown>;
  getCurrentSession(): Promise<unknown>;
  signIn(login: string, password: string): Promise<unknown>;
  confirmSignIn(
    user: unknown,
    code: string,
    mfaType: unknown
  ): Promise<unknown>;
  completeNewPassword(user: unknown, password: string): Promise<unknown>;
  resetPassword(login: string): Promise<unknown>;
  resetPasswordConfirmation(
    login: string,
    verificationCode: string,
    newPassword: string
  ): Promise<string>;
  signOut(): Promise<unknown>;
}
