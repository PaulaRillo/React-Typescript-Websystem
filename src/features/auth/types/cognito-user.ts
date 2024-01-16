/* eslint-disable @typescript-eslint/no-explicit-any */
export type CognitoUser = {
  Session?: string | null;
  authenticationFlowType?: string;
  client?: {
    endpoint?: string;
    userAgent?: string;
  };
  keyPrefix?: string;
  pool?: {
    advancedSecurityDataCollectionFlag?: boolean;
    clientId?: string;
    userPoolId?: string;
  };
  username?: string;
  userConfirmed?: boolean;
  userSub?: string;
  challengeName: string;
  challengeParam: {
    [key: string]: any;
  };
  unverified?: {
    email?: string;
    phone_number?: string;
  };
  [attributes: string]: any;
};
