import { AwsApiName } from '../../src/core.v2/domain/@shared/settings/constants.enum';
import { AmplifyAuth } from '../../src/core.v2/drivers/auth/amplify-auth';
import { AmplifyServer } from '../../src/core.v2/drivers/server/amplify/amplify-server';

const server = new AmplifyServer();
export const auth = new AmplifyAuth();

server.configure({
  Auth: {
    mandatorySignIn: true,
    authenticationFlowType: 'USER_SRP_AUTH',
    region: process.env.VITE_BILLTALLY_AWS_REGION,
    userPoolId: process.env.VITE_BILLTALLY_USER_POOL_ID,
    identityPoolId: process.env.VITE_BILLTALLY_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.VITE_BILLTALLY_USER_POOL_WEB_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: AwsApiName.SHARED_SERVICES,
        endpoint: process.env.VITE_SHARED_SERVICES_API_ENDPOINT,
        custom_header: async () => {
          return {
            Authorization: (await auth.getCurrentSession())
              .getIdToken()
              .getJwtToken()
          };
        }
      },
      {
        name: AwsApiName.BILLTALLY,
        endpoint: process.env.VITE_BILLTALLY_API_ENDPOINT,
        custom_header: async () => {
          return {
            Authorization: (await auth.getCurrentSession())
              .getIdToken()
              .getJwtToken()
          };
        }
      }
    ]
  }
});

export const serverInit = async () => {
  const login = process.env.VITE_BILLTALLY_USERNAME || '';
  const password = process.env.VITE_BILLTALLY_PASSWORD || '';
  const result = await auth.signIn(login, password);
  // console.log('result', result);
  return result;
};
