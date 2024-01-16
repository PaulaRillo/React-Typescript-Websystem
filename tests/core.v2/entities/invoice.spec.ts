import { DestinationAccountGatewayInterface } from '../../../src/core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import { Invoice } from '../../../src/core.v2/domain/invoice/entity/invoice';
import { InvoiceGatewayInterface } from '../../../src/core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { OriginAccountGatewayInterface } from '../../../src/core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { GatewayFactoryMemory } from '../../../src/core.v2/adapters/gateways/gateway-factory-memory';

describe('Invoice', () => {
  let invoiceGateway: InvoiceGatewayInterface;
  let originAccountGateway: OriginAccountGatewayInterface;
  let destinationAccountGateway: DestinationAccountGatewayInterface;

  beforeAll(async () => {
    const mapperFactory = new MapperFactory();
    const gatewayFactory = new GatewayFactoryMemory(mapperFactory);
    invoiceGateway = gatewayFactory.createInvoiceGateway();
    originAccountGateway = gatewayFactory.createOriginAccountGateway();
    destinationAccountGateway = gatewayFactory.createDestinationAccountGateway(); //prettier-ignore
  });

  test('Should set payment amount', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[0];

    invoice.setPaymentAmount(50);

    expect(invoice.paymentAmount).toBe(50);
  });

  test('Should not set payment amount if is 0 or less', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[0];
    invoice.setPaymentAmount(50);
    expect(invoice.paymentAmount).toBe(50);

    invoice.setPaymentAmount(0);

    expect(invoice.paymentAmount).toBe(50);
  });

  test('Should not set payment amount if is greater than balanceDue', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[0];
    expect(invoice.summary.balanceDue.value).toBe(100);

    invoice.setPaymentAmount(101);

    expect(invoice.paymentAmount).toBe(100);
  });

  test('Should set destination account', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[0];
    expect(invoice.destinationAccount).toBeUndefined();

    const destinationAccountList = await destinationAccountGateway.list('vendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    invoice.setDestinationAccount(destinationAccount);

    expect(invoice.destinationAccount).toBeDefined();
  });

  test('Should match origin account currency', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[0];
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    const matches = invoice.matchesOriginAccountCurrency(originAccount.currencyCode); //prettier-ignore

    expect(matches).toBe(true);
  });

  test('Should not match origin account currency', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[6];
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    const matches = invoice.matchesOriginAccountCurrency(originAccount.currencyCode); //prettier-ignore

    expect(matches).toBe(false);
  });

  test('Should be payable', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[0];
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    expect(invoice.destinationAccount).toBeUndefined();
    const destinationAccountList = await destinationAccountGateway.list('vendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    invoice.setDestinationAccount(destinationAccount);

    const isPayable = invoice.isPayable(originAccount.currencyCode);

    expect(isPayable).toBe(true);
  });

  test('Should not be payable missing destination account', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[0];
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    expect(invoice.destinationAccount).toBeUndefined();
    const isPayable = invoice.isPayable(originAccount.currencyCode);

    expect(isPayable).toBe(false);
  });

  test('Should not match a null origin account currency', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    const invoice: Invoice = invoiceList[4];
    
    const match = invoice.matchesOriginAccountCurrency('');
    
    expect(match).toBe(false);
  });
});
