import { DomainMapperInterface } from '../../../domain/@shared/mappers/domain-mapper.interface';
import { PaymentLineFactoryProps } from '../../../domain/payment/factory/payment-line-factory.props';

export type PaymentLineMapperInterface =
  DomainMapperInterface<PaymentLineFactoryProps>;
