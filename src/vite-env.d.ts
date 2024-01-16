/// <reference types="vite/client" />

interface ImportMetaEnv {
  //global
  readonly VITE_ENVIRONMENT: string;
  //billtally-amplify
  readonly VITE_BILLTALLY_USERNAME: string;
  readonly VITE_BILLTALLY_PASSWORD: string;
  readonly VITE_BILLTALLY_AWS_REGION: string;
  readonly VITE_BILLTALLY_USER_POOL_ID: string;
  readonly VITE_BILLTALLY_IDENTITY_POOL_ID: string;
  readonly VITE_BILLTALLY_USER_POOL_WEB_CLIENT_ID: string;
  readonly VITE_BILLTALLY_MOCK_API_ENDPOINT: string;
  readonly VITE_BILLTALLY_PINPOINT_MFA_VALIDITY_PERIOD: string;
  //shared-services
  readonly VITE_SHARED_SERVICES_API_ENDPOINT: string;
  //central-portal
  readonly VITE_CENTRAL_PORTAL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
