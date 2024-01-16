import core from 'core.v2/index';
import { AwsApiName } from '../../../domain/@shared/settings/constants.enum';

export const serverSettings = {
  Auth: {
    mandatorySignIn: true,
    authenticationFlowType: 'USER_SRP_AUTH',
    region: import.meta.env.VITE_BILLTALLY_AWS_REGION,
    userPoolId: import.meta.env.VITE_BILLTALLY_USER_POOL_ID,
    identityPoolId: import.meta.env.VITE_BILLTALLY_IDENTITY_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_BILLTALLY_USER_POOL_WEB_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: AwsApiName.SHARED_SERVICES,
        endpoint: import.meta.env.VITE_SHARED_SERVICES_API_ENDPOINT,
        custom_header: async () => {
          return {
            Authorization: (await core.auth.getCurrentSession())
              .getIdToken()
              .getJwtToken()
          };
        }
      },
      {
        name: AwsApiName.BILLTALLY,
        endpoint: import.meta.env.VITE_BILLTALLY_API_ENDPOINT,
        custom_header: async () => {
          return {
            Authorization: (await core.auth.getCurrentSession())
              .getIdToken()
              .getJwtToken()
          };
        }
      }
    ]
  }
};
