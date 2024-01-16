import { Amplify } from 'aws-amplify';
import { ServerInterface } from '../server.interface';

export class AmplifyServer implements ServerInterface {
  public configure(settings: any) {
    Amplify.configure(settings);
  }
}
