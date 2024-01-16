import { SubmitGroupPaymentRequestDTO } from 'core.v2/adapters/gateways/payment/payment-gateway-dto';
import { DtoMapperInterface } from '../../../domain/@shared/mappers/dto-mapper.interface';

export type SubmitPaymentRequestGroupMapperInterface = DtoMapperInterface<SubmitGroupPaymentRequestDTO>; //prettier-ignore
