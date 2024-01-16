import { auth } from '../../src/core/infra/auth';
import { server } from '../setup/server';

describe('SignIn', () => {
  beforeAll(() => {
    server.configure();
  });

  test('Should sign in on central portal', async () => {
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';

    const cognitoUser = await auth.signIn(login, password);

    expect(cognitoUser).toBeDefined();
    expect(cognitoUser.username).toBe('ffffb89a-7fc7-44f2-8041-a529d85ad838');
  });
});
