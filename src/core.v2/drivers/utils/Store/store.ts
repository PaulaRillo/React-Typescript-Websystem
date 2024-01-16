import { LoggedUser } from 'core.v2/domain/logged-user/entity/logged-user';
import { PaymentRequest } from 'core.v2/domain/payment-request/entity/payment-request';

export class Store {
  public loggedUser: LoggedUser | undefined;
  public paymentRequest!: PaymentRequest;

  static instance: Store | undefined;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Store();
    }
    return this.instance;
  }

  setLoggedUser(loggedUser: LoggedUser): void {
    this.loggedUser = loggedUser;
  }

  setPaymentRequest(paymentRequest: PaymentRequest): void {
    this.paymentRequest = paymentRequest;
  }
}

export const store = Store.getInstance();
