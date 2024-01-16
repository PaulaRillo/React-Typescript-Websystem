import { OriginAccount } from '../entity/origin-account';
import { OriginAccountFactoryProps } from './origin-account-factory.props';

export class OriginAccountFactory {
  static create(props: OriginAccountFactoryProps): OriginAccount {
    return new OriginAccount(
      props.paymentMethodId,
      props.processorId,
      props.bankCode,
      props.bankName,
      props.redactedBankAccountNumber,
      props.currencyCode,
      props.accountAlias,
      props.balanceInLocalCurrency,
      props.balanceInSystemCurrency,
      props.balanceInForeignCurrency,
      props.isCashFlowRelevant
    );
  }
}
