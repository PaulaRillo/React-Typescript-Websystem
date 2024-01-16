## Sign-in with custom auth challenges

> When signing in with user name and password, you will either sign in
> directly or be asked to pass some `challenges` before getting authenticated.

https://docs.amplify.aws/lib/auth/mfa/q/platform/js/#advanced-use-cases

## Retrieve current session

> `Auth.currentSession()` returns a `CognitoUserSession` object which contains
> `JWT accessToken`, `idToken`, and `refreshToken`.

> This method will automatically refresh the accessToken and idToken if
> tokens are expired and a valid refreshToken presented. So you can use
> this method to refresh the session if needed.

https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-session
