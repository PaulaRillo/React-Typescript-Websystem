import { GatewayFactoryMemory } from '../../../src/core.v2/adapters/gateways/gateway-factory-memory';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { CashFlowMapper } from '../../../src/core.v2/adapters/mappers/tenant/cash-flow-mapper';
import { CashFlowType } from '../../../src/core.v2/domain/@shared/types/cash-flow.type';
import { DestinationAccountGatewayInterface } from '../../../src/core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import { Invoice } from '../../../src/core.v2/domain/invoice/entity/invoice';
import { InvoiceGatewayInterface } from '../../../src/core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { OriginAccount } from '../../../src/core.v2/domain/origin-account/entity/origin-account';
import { OriginAccountGatewayInterface } from '../../../src/core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { PaymentRequest } from '../../../src/core.v2/domain/payment-request/entity/payment-request';
import { Store } from '../../../src/core.v2/drivers/utils/Store/store';

describe('PaymentRequest', () => {
  let paymentRequest: PaymentRequest;
  let invoiceGateway: InvoiceGatewayInterface;
  let originAccountGateway: OriginAccountGatewayInterface;
  let destinationAccountGateway: DestinationAccountGatewayInterface;
  let cashFlowMapper: CashFlowMapper;
  let cashFlow: CashFlowType;

  beforeAll(async () => {
    const mapperFactory = new MapperFactory();
    const gatewayFactory = new GatewayFactoryMemory(mapperFactory, Store);
    invoiceGateway = gatewayFactory.createInvoiceGateway();
    originAccountGateway = gatewayFactory.createOriginAccountGateway();
    destinationAccountGateway = gatewayFactory.createDestinationAccountGateway(); //prettier-ignore
    paymentRequest = PaymentRequest.getInstance();

    cashFlowMapper = mapperFactory.createCashFlowMapper();
    cashFlow = cashFlowMapper.toDomain(cashFlowDTO);
  });

  beforeEach(() => {
    paymentRequest.reset();
    paymentRequest.init({
      userHasPermission: true,
      userMfaEnabled: true,
      allCurrenciesConfigured: true
    });
    paymentRequest.clearHandlers();
    jest.clearAllMocks();
  });

  test('Should add invoices', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;

    paymentRequest.addInvoices(invoiceList);

    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
  });

  test('Should not add invoices if is not editable', async () => {
    paymentRequest.setIsEditable(false);

    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);

    expect(paymentRequest.invoices.length).toBe(0);
  });

  test('Should calculate total', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);

    expect(paymentRequest.getTotal()).toBe(31910.03);
  });

  test('Should calculate endingBalance', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
    expect(paymentRequest.invoices[0].destinationAccount).toBeUndefined();

    expect(paymentRequest.getTotal()).toBe(100);
    expect(paymentRequest.originAccount?.balanceInLocalCurrency).toBe(2199.84);
    expect(paymentRequest.getEndingBalance()).toBe(2099.84);
  });

  test('Should remove invoices', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);
    const idsToRemove = invoiceList.map((invoice) => invoice.id);

    paymentRequest.removeInvoices(idsToRemove);

    expect(paymentRequest.invoices.length).toBe(0);
  });

  test('Should not remove invoices if is not editable', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);

    paymentRequest.setIsEditable(false);

    const idsToRemove = invoiceList.map((invoice) => invoice.id);
    paymentRequest.removeInvoices(idsToRemove);

    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
  });

  test('Should set invoice payment amount', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);
    const invoice = paymentRequest.invoices[0];
    const paymentAmount = 100;

    paymentRequest.setInvoicePaymentAmount(invoice.id, paymentAmount);

    expect(invoice.paymentAmount).toBe(paymentAmount);
  });

  test('Should not set invoice payment amount if is not editable', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);
    const invoice = paymentRequest.invoices[0];
    const paymentAmount = 100;
    paymentRequest.setInvoicePaymentAmount(invoice.id, paymentAmount);
    expect(invoice.paymentAmount).toBe(paymentAmount);

    paymentRequest.setIsEditable(false);
    paymentRequest.setInvoicePaymentAmount(invoice.id, 50);

    expect(invoice.paymentAmount).toBe(paymentAmount);
    expect(paymentRequest.invoices[0].paymentAmount).toBe(paymentAmount);
  });

  test('Should set origin account', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    paymentRequest.setOriginAccount(originAccount);

    expect(paymentRequest.originAccount).toBe(originAccount);
  });

  test('Should not set origin account if is not editable', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBe(originAccount);

    paymentRequest.setIsEditable(false);

    const originAccount2 = originAccountList[1];
    paymentRequest.setOriginAccount(originAccount2);

    expect(paymentRequest.originAccount).toBe(originAccount);
  });

  test('Should set a destination account on invoice', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);
    const invoice = paymentRequest.invoices[0];
    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];

    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);

    expect(invoice.destinationAccount).toBe(destinationAccount);
  });

  test('Should not set a destination account on invoice if is not editable', async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data;
    paymentRequest.addInvoices(invoiceList);
    const invoice = paymentRequest.invoices[0];
    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);
    expect(invoice.destinationAccount).toBe(destinationAccount);

    paymentRequest.setIsEditable(false);

    const destinationAccount2 = destinationAccountList[1];
    paymentRequest.setInvoiceDestinationAccount(
      invoice.id,
      destinationAccount2
    );

    expect(invoice.destinationAccount).toBe(destinationAccount);
  });

  test('Should change the wasReviewed state', async () => {
    expect(paymentRequest.getWasReviewed()).toBe(false);
    paymentRequest.setWasReviewed(true);
    expect(paymentRequest.getWasReviewed()).toBe(true);
  });

  test('Should change wasReviewed state even if is not editable', async () => {
    expect(paymentRequest.getWasReviewed()).toBe(false);
    paymentRequest.setWasReviewed(true);
    expect(paymentRequest.getWasReviewed()).toBe(true);

    paymentRequest.setIsEditable(false);
    paymentRequest.setWasReviewed(false);

    expect(paymentRequest.getWasReviewed()).toBe(false);
  });

  test('Should change the isEditable state', async () => {
    expect(paymentRequest.getIsEditable()).toBe(true);
    paymentRequest.setIsEditable(false);
    expect(paymentRequest.getIsEditable()).toBe(false);
  });

  test('Should verify if origin account balance is sufficient', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]);
    const paymentAmount = 100;
    paymentRequest.setInvoicePaymentAmount(invoice.id, paymentAmount);

    expect(paymentRequest.getTotal()).toBe(100);
    expect(paymentRequest.isBalanceSufficient()).toBe(true);
  });

  test('Should verify if origin account balance is insufficient', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[1];
    paymentRequest.setOriginAccount(originAccount);
    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]);

    expect(paymentRequest.getTotal()).toBe(100);
    expect(paymentRequest.originAccount?.balanceInLocalCurrency).toBe(0);
    expect(paymentRequest.isBalanceSufficient()).toBe(false);
  });

  test('Should be payable', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
    expect(paymentRequest.invoices[0].destinationAccount).toBeUndefined();

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);
    paymentRequest.setCashFlow(cashFlow);

    expect(paymentRequest.invoices[0].destinationAccount).toBeDefined();
    expect(paymentRequest.getTotal()).toBe(100);
    expect(paymentRequest.originAccount?.balanceInLocalCurrency).toBe(2199.84);
    expect(paymentRequest.hasCashflow()).toBe(true);
    expect(paymentRequest.isPayable()).toBe(true);
  });

  test('Should not be payable if balance is insufficient', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[1];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
    expect(paymentRequest.invoices[0].destinationAccount).toBeUndefined();

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);
    expect(paymentRequest.invoices[0].destinationAccount).toBeDefined();

    expect(paymentRequest.getTotal()).toBe(100);
    expect(paymentRequest.originAccount?.balanceInLocalCurrency).toBe(0);
    expect(paymentRequest.isPayable()).toBe(false);
  });

  test(`Should not be payable if origin account doesn't exist`, async () => {
    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
    expect(paymentRequest.invoices[0].destinationAccount).toBeUndefined();

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);
    expect(paymentRequest.invoices[0].destinationAccount).toBeDefined();

    expect(paymentRequest.getTotal()).toBe(100);
    expect(paymentRequest.originAccount).toBeUndefined();
    expect(paymentRequest.isPayable()).toBe(false);
  });

  test(`Should not be payable if has no invoices`, async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    expect(paymentRequest.originAccount?.balanceInLocalCurrency).toBe(2199.84);
    expect(paymentRequest.isPayable()).toBe(false);
  });

  test(`Should not be payable if has no destination account`, async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
    expect(paymentRequest.invoices[0].destinationAccount).toBeUndefined();

    expect(paymentRequest.getTotal()).toBe(100);
    expect(paymentRequest.originAccount?.balanceInLocalCurrency).toBe(2199.84);
    expect(invoice.destinationAccount).toBeUndefined();
    expect(paymentRequest.isPayable()).toBe(false);
  });

  test('Should not be payable if has any issue in some invoice', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[6];
    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices.length).toBeGreaterThan(0);
    expect(paymentRequest.invoices[0].destinationAccount).toBeUndefined();

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);
    expect(paymentRequest.invoices[0].destinationAccount).toBeDefined();

    paymentRequest.setInvoicePaymentAmount(invoice.id, 1000);
    expect(paymentRequest.getTotal()).toBe(1000);

    expect(paymentRequest.invoices[0].currency.iso4217Alpha3).toBe('EUR');
    expect(paymentRequest.originAccount?.currencyCode).toBe('USD');
    expect(paymentRequest.invoices[0].isPayable()).toBe(false);

    expect(paymentRequest.originAccount?.balanceInLocalCurrency).toBe(2199.84);
    expect(paymentRequest.isPayable()).toBe(false);
  });

  test('Should dispatch a PaymentRequestUpdated event', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const listener = paymentRequest.on('PaymentRequestUpdated', () => {
      expect(spyListener).toHaveBeenCalled();
    });

    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount); //called

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    paymentRequest.addInvoices([invoice]); //called

    paymentRequest.setInvoicePaymentAmount(invoice.id, 50); //called

    paymentRequest.setWasReviewed(true); //called

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount); //called

    paymentRequest.removeInvoices([invoice.id]); //called

    paymentRequest.setIsEditable(false); //called

    paymentRequest.reset(); //called

    expect(spyDispatch).toHaveBeenCalledTimes(8);
    expect(spyListener).toHaveBeenCalled();
    paymentRequest.off(listener);
  });

  test('Should dispatch a PaymentRequestUpdated event when origin account is set', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.originAccount).toBeDefined();
      expect(data.originAccount).toBeInstanceOf(OriginAccount);
      expect(spyListener).toHaveBeenCalled();
    });

    paymentRequest.setOriginAccount(originAccount);

    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyListener).toHaveBeenCalled();
    paymentRequest.off(listener);
  });

  test('Should dispatch a PaymentRequestUpdated event when invoice is added', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.invoices).toBeDefined();
      expect(data.invoices).toBeInstanceOf(Array);
      expect(data.invoices).toHaveLength(1);
      expect(data.invoices[0]).toBeInstanceOf(Invoice);
    });

    paymentRequest.addInvoices([invoice]);

    expect(spyListener).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    paymentRequest.off(listener);
  });

  test('Should dispatch a PaymentRequestUpdated event when invoice is removed', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];

    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices).toHaveLength(1);

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.invoices).toBeDefined();
      expect(data.invoices).toBeInstanceOf(Array);
      expect(data.invoices).toHaveLength(0);
    });

    paymentRequest.removeInvoices([invoice.id]);

    expect(spyListener).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(2);
    paymentRequest.off(listener);
  });

  test('Should dispatch a PaymentRequestUpdated event when invoice payment amount is set', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];

    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices).toHaveLength(1);

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.invoices).toBeDefined();
      expect(data.invoices).toBeInstanceOf(Array);
      expect(data.invoices).toHaveLength(1);
      expect(data.invoices[0].paymentAmount).toBe(50);
    });

    paymentRequest.setInvoicePaymentAmount(invoice.id, 50);

    expect(spyListener).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(2);
    paymentRequest.off(listener);
  });

  test('Should dispatch a PaymentRequestUpdated event when invoice destination account is set', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];

    paymentRequest.addInvoices([invoice]);
    expect(paymentRequest.invoices).toHaveLength(1);

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.invoices).toBeDefined();
      expect(data.invoices).toBeInstanceOf(Array);
      expect(data.invoices).toHaveLength(1);
      expect(data.invoices[0].destinationAccount).toBeDefined();
    });

    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);

    expect(spyListener).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(2);
    paymentRequest.off(listener);
  });

  test('Should dispatch a PaymentRequestUpdated event when order is reviewed', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.wasReviewed).toBeDefined();
      expect(data.wasReviewed).toBe(true);
    });

    paymentRequest.setWasReviewed(true);

    expect(spyListener).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    paymentRequest.off(listener);
  });

  test('Should dispatch a PaymentRequestUpdated event when order is editable', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    expect(paymentRequest.getIsEditable()).toBe(true);

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.isEditable).toBeDefined();
      expect(data.isEditable).toBe(false);
    });

    paymentRequest.setIsEditable(false);

    expect(spyListener).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    paymentRequest.off(listener);
  });

  test('Should remove all invoices with issues', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    const invoiceWithIssue = invoiceList[1];

    paymentRequest.addInvoices([invoice, invoiceWithIssue]);
    expect(paymentRequest.invoices).toHaveLength(2);

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);

    const currencyCode = paymentRequest.originAccount?.currencyCode;
    expect(invoice.isPayable(currencyCode)).toBe(true);
    expect(invoiceWithIssue.isPayable(currencyCode)).toBe(false);

    paymentRequest.removeInvoicesWithIssues();
    expect(paymentRequest.invoices).toHaveLength(1);
    expect(paymentRequest.invoices[0].id).toBe(invoice.id);
  });

  test('Should dispatch PaymentRequestUpdated event when remove all invoices with issues', async () => {
    const spyDispatch = jest.spyOn(paymentRequest, 'dispatch');
    const spyListener = jest.spyOn(paymentRequest, 'on');

    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];
    paymentRequest.setOriginAccount(originAccount);
    expect(paymentRequest.originAccount).toBeDefined();

    const response = await invoiceGateway.list();
    const invoiceList = response.data as Invoice[];
    const invoice = invoiceList[0];
    const invoiceWithIssue = invoiceList[1];

    paymentRequest.addInvoices([invoice, invoiceWithIssue]);
    expect(paymentRequest.invoices).toHaveLength(2);

    const destinationAccountList = await destinationAccountGateway.list('anyVendorId'); //prettier-ignore
    const destinationAccount = destinationAccountList[0];
    paymentRequest.setInvoiceDestinationAccount(invoice.id, destinationAccount);

    const currencyCode = paymentRequest.originAccount?.currencyCode;
    expect(invoice.isPayable(currencyCode)).toBe(true);
    expect(invoiceWithIssue.isPayable(currencyCode)).toBe(false);

    const listener = paymentRequest.on('PaymentRequestUpdated', ({ data }) => {
      expect(data.invoices).toBeDefined();
      expect(data.invoices).toBeInstanceOf(Array);
      expect(data.invoices).toHaveLength(1);
      expect(data.invoices[0].id).toBe(invoice.id);
    });

    paymentRequest.removeInvoicesWithIssues();

    expect(spyDispatch).toHaveBeenCalledTimes(4);
    expect(spyListener).toHaveBeenCalledTimes(1);
    paymentRequest.off(listener);
  });

  test('Should cashflow undefined when has no origin account', async () => {
    expect(paymentRequest.cashFlow).toBeUndefined();
    expect(paymentRequest.isCashFlowRelevant).toBe(false);
  });

  test('Should isCashflowRelevant updated when origin account set', async () => {
    const originAccountList = await originAccountGateway.list();
    const originAccount = originAccountList[0];

    paymentRequest.setOriginAccount(originAccount);

    expect(paymentRequest.isCashFlowRelevant).toBe(true);
  });

  test('Should not be editable if MFA is disabled', async () => {
    paymentRequest.init({
      userHasPermission: true,
      userMfaEnabled: false,
      allCurrenciesConfigured: true
    });
    expect(paymentRequest.getIsEditable()).toBe(false);
  });

  test('Should be editable if MFA is enabled and user has permission', async () => {
    paymentRequest.init({
      userHasPermission: true,
      userMfaEnabled: true,
      allCurrenciesConfigured: true
    });
    expect(paymentRequest.getIsEditable()).toBe(true);
  });

  test('Should not be editable if has no permission', async () => {
    paymentRequest.init({
      userHasPermission: false,
      userMfaEnabled: true,
      allCurrenciesConfigured: true
    });
    expect(paymentRequest.getIsEditable()).toBe(false);
  });

  test('Should not be editable if all currencies are not configured', async () => {
    paymentRequest.init({
      userHasPermission: true,
      userMfaEnabled: true,
      allCurrenciesConfigured: false
    });
    expect(paymentRequest.getIsEditable()).toBe(false);
  });
});

const cashFlowDTO = {
  id: '808012f8-a9be-4748-b51e-48e5eee7ac86',
  external_id: '2',
  name: 'Payments for Invoices from Customers'
};
