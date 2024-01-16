import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { GatewayFactoryInterface } from '../../../src/core.v2/adapters/gateways/gateway-factory.interface';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { DestinationAccountGatewayInterface } from '../../../src/core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import { Invoice } from '../../../src/core.v2/domain/invoice/entity/invoice';
import { InvoiceGatewayInterface } from '../../../src/core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { OriginAccountGatewayInterface } from '../../../src/core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { PaymentRequest } from '../../../src/core.v2/domain/payment-request/entity/payment-request';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { SubmitPaymentRequestGroupUsecase } from '../../../src/core.v2/usecases/submit-payment-request-group-usecase';
import { auth, serverInit } from '../../utils/serverInit';

describe('SubmitPaymentRequestGroup', () => {
  jest.setTimeout(200000);
  let paymentRequest: PaymentRequest;
  let invoiceGateway: InvoiceGatewayInterface;
  let originAccountGateway: OriginAccountGatewayInterface;
  let destinationAccountGateway: DestinationAccountGatewayInterface;
  let gatewayFactory: GatewayFactoryInterface;

  beforeAll(async () => {
    await serverInit();
    const mapperFactory = new MapperFactory();
    const httpClientFactory = new HttpClientFactory();
    gatewayFactory = new GatewayFactoryHttp(
      auth,
      httpClientFactory,
      mapperFactory,
      store
    );
    invoiceGateway = gatewayFactory.createInvoiceGateway();
    originAccountGateway = gatewayFactory.createOriginAccountGateway();
    destinationAccountGateway = gatewayFactory.createDestinationAccountGateway(); //prettier-ignore
    paymentRequest = PaymentRequest.getInstance();
  });

  beforeEach(() => {
    paymentRequest.reset();
    paymentRequest.clearHandlers();
    jest.clearAllMocks();
  });

  test('Should submit payment request group', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[4];
    paymentRequest.addInvoices([invoice]);

    const destinationAccountList = await destinationAccountGateway.list(invoice.invoiceFrom.id); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);
    paymentRequest.setInvoicePaymentAmount(invoice.id, 100);
    expect(paymentRequest.isPayable()).toBe(true);

    expect(() =>
      new SubmitPaymentRequestGroupUsecase(gatewayFactory).execute()
    ).not.toThrow();

    const submitPaymentRequestGroup = new SubmitPaymentRequestGroupUsecase(
      gatewayFactory
    );
    try {
      await submitPaymentRequestGroup.execute();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
