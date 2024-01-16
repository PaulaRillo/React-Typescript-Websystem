import { TenantSettingsType } from '../../../src/core.v2/domain/@shared/types/tenant-settings.type';
import { Invoice } from '../../../src/core.v2/domain/invoice/entity/invoice';
import { InvoiceFactory } from '../../../src/core.v2/domain/invoice/factory/invoice-factory';
import { InvoiceFactoryProps } from '../../../src/core.v2/domain/invoice/factory/invoice-factory.props';

describe('Invoice Factory', () => {
  test(`Should create a Invoice`, async () => {
    const invoice = InvoiceFactory.create(invoiceProps, settings);
    expect(invoice).toBeDefined();
    expect(invoice).toBeInstanceOf(Invoice);
    expect(invoice.id).toBeDefined();
    expect(invoice.visualId).toBeDefined();
    expect(invoice.externalApInvoiceNumber).toBeDefined();
    expect(invoice.invoiceStatus).toBeDefined();
    expect(invoice.invoiceType).toBeDefined();
    expect(invoice.currency).toBeDefined();
    expect(invoice.invoiceFrom).toBeDefined();
    expect(invoice.invoiceLines).toBeDefined();
    expect(invoice.paymentTerm).toBeDefined();
    expect(invoice.summary).toBeDefined();

    expect(invoice.id).toBe(invoiceProps.id);
    expect(invoice.externalId).toBe(invoiceProps.externalId);
    expect(invoice.visualId).toBe(invoiceProps.visualId);
    expect(invoice.invoiceStatus).toBe(invoiceProps.invoiceStatus);
    expect(invoice.invoiceType).toBe(invoiceProps.invoiceType);
    expect(invoice.currency).toEqual(invoiceProps.currency);
    expect(invoice.invoiceFrom).toEqual(invoiceProps.invoiceFrom);

    //invoiceLines
    const invoiceLine = invoice.invoiceLines[0];
    expect(invoiceLine.lineTotal?.localCurrency).toBe(1801.63);
    expect(invoiceLine.lineTotal?.systemCurrency).toBe(1801.63);
    expect(invoiceLine.lineTotal?.foreignCurrency).toBe(0);
    expect(invoiceLine.quantity).toBe(1.345);
    expect(invoiceLine.unitPrice).toBe(1410);

    //installments
    const instalment = invoice.installments[0];
    expect(instalment.percent).toBe(100);

    //paymentTerm
    const paymentTerm = invoice.paymentTerm;

    expect(paymentTerm?.id).toBe(invoiceProps.paymentTerm.id);
    expect(paymentTerm?.externalId).toBe(invoiceProps.paymentTerm.externalId); // prettier-ignore

    expect(paymentTerm?.totalDiscountPercent).toBe(0);

    //summary
    const summary = invoice.summary;

    expect(summary.taxPercent).toBe(0);
    expect(summary.discountPercent).toBe(1);
    expect(summary.invoiceTotal.value).toBe(3916.78);
    expect(summary.baseAmount.value).toBe(0);
    expect(summary.paidToDateAmount.value).toBe(1200);
    expect(summary.additionalExpenses.value).toBe(72);
    expect(summary.totalTax.value).toBe(292.56);
    expect(summary.totalDiscountAmount.value).toBe(35.88);
    expect(summary.totalDownPaymentAmount.value).toBe(0);
    expect(summary.balanceDue.value).toBe(2716.78);
    expect(summary.subtotal.value).toBe(3588.1);
  });
});

const invoiceProps: InvoiceFactoryProps = {
  id: 'c0d66998-5863-41a3-bf01-5db37dd48cfa',
  externalId: '1219',
  visualId: '1219',
  externalApInvoiceNumber: '1175',
  referenceNumberExternal: '',
  transactionContentType: '0',
  dueDate: '2022-11-21T00:00:00.000Z',
  postingDate: '2022-10-19T00:00:00.000Z',
  createdAt: '2022-11-11T14:55:09.779Z',
  invoiceStatus: 'Open',
  invoiceType: '3',
  invoiceDate: '2022-11-11T14:55:09.779Z',
  invoiceFrom: {
    id: '323eb529-bdea-444f-aab8-75d1b4c965e7',
    name: 'Sea Corp',
    visualId: '850956788',
    externalId: 'V50000'
  },
  invoiceLines: [
    {
      id: 'c0d66998-5863-41a3-bf01-5db37dd48cfa',
      externalId: '1219',
      lineNumber: 0,
      itemExternalId: 'P10004',
      itemDescription: 'PC Set 2',
      quantity: 1.345,
      unitPrice: 1410,
      lineTotal: {
        localCurrency: 1801.63,
        systemCurrency: 1801.63,
        foreignCurrency: 0
      },
      currency: {
        id: '$',
        externalId: '$',
        name: 'US Dollar',
        symbol: '$',
        iso4217Alpha3: 'USD'
      }
    },
    {
      id: 'c0d66998-5863-41a3-bf01-5db37dd48cfa',
      externalId: '1219',
      lineNumber: 1,
      itemExternalId: 'C00006',
      itemDescription: 'Gigabit Network Card',
      quantity: 1.257,
      unitPrice: 11.25,
      lineTotal: {
        localCurrency: 14.14,
        systemCurrency: 14.14,
        foreignCurrency: 0
      },
      currency: {
        id: '$',
        externalId: '$',
        name: 'US Dollar',
        symbol: '$',
        iso4217Alpha3: 'USD'
      }
    },
    {
      id: 'c0d66998-5863-41a3-bf01-5db37dd48cfa',
      externalId: '1219',
      lineNumber: 2,
      itemExternalId: 'Z00002',
      itemDescription: 'Tablet PC 64GB White',
      quantity: 3.333,
      unitPrice: 525,
      lineTotal: {
        localCurrency: 1749.83,
        systemCurrency: 1749.83,
        foreignCurrency: 0
      },
      currency: {
        id: '$',
        externalId: '$',
        name: 'US Dollar',
        symbol: '$',
        iso4217Alpha3: 'USD'
      }
    },
    {
      id: 'c0d66998-5863-41a3-bf01-5db37dd48cfa',
      externalId: '1219',
      lineNumber: 3,
      itemExternalId: 'I00013',
      itemDescription: 'SDHC 64 GB CLASS 10',
      quantity: 1,
      unitPrice: 22.5,
      lineTotal: {
        localCurrency: 22.5,
        systemCurrency: 22.5,
        foreignCurrency: 0
      },
      currency: {
        id: '$',
        externalId: '$',
        name: 'US Dollar',
        symbol: '$',
        iso4217Alpha3: 'USD'
      }
    }
  ],
  installments: [
    {
      externalId: '12191',
      number: '1',
      percent: 100,
      total: 3916.78,
      dueDate: '2022-11-21T00:00:00.000Z',
      dunningLevel: '0',
      isPaymentOrdered: 'false',
      firstPullSyncAt: '2022-11-11T14:49:31.574Z',
      lastPullSyncAt: '2022-11-11T14:49:31.574Z'
    }
  ],
  paymentTerm: {
    id: '95686c5e-d7e1-485d-9e3a-7ef79ce84c83',
    externalId: '2',
    paymentTermsGroupName: 'Net30',
    paymentDueMonthStartFrom: '0',
    numberOfAdditionalMonths: '0',
    numberOfAdditionalDays: '30',
    maximumCreditLimit: '0',
    totalDiscountPercent: 0,
    latePaymentInterestRateCharge: '0',
    priceListExternalId: '1',
    commitmentLimit: '0',
    openIncomingPayment: '0',
    dueDateBasedOn: '1',
    numberOfInstallments: '0',
    firstPullSyncAt: '2021-12-08T08:08:00.000Z',
    lastPullSyncAt: '2022-11-11T14:48:27.396Z'
  },
  currency: {
    id: '$',
    externalId: '$',
    name: 'US Dollar',
    symbol: '$',
    iso4217Alpha3: 'USD'
  },
  taxPercent: 0,
  discountPercent: 1,
  invoiceTotal: {
    localCurrency: 3916.78,
    systemCurrency: 3916.78,
    foreignCurrency: 0
  },
  baseAmount: {
    localCurrency: 0,
    systemCurrency: 0,
    foreignCurrency: 0
  },
  paidToDateAmount: {
    localCurrency: 1200,
    systemCurrency: 1200,
    foreignCurrency: 0
  },
  additionalExpenses: {
    localCurrency: 72,
    systemCurrency: 72,
    foreignCurrency: 0
  },
  totalTax: {
    localCurrency: 292.56,
    systemCurrency: 292.56,
    foreignCurrency: 0
  },
  totalDiscountAmount: {
    localCurrency: 35.88,
    systemCurrency: 35.88,
    foreignCurrency: 0
  },
  totalDownPaymentAmount: {
    localCurrency: 0,
    systemCurrency: 0,
    foreignCurrency: 0
  }
};

const settings: TenantSettingsType = {
  id: 1,
  externalId: '1',
  companyName: 'OECComputers',
  address: '95MortonStreet\rSuite200\rNewYorkNY10014\rUSA',
  countryCode: '',
  countryExternalCode: 'US',
  header: 'OECComputers',
  primaryPhoneNumber1: '5550199',
  primaryPhoneNumber2: '5550198',
  primaryEmail: '',
  localCurrencyId: '$',
  localCurrencyExternalId: '$',
  systemCurrencyId: '$',
  systemCurrencyExternalId: '$',
  openBalanceWithMinusSign: true,
  totalsAccuracyDigits: 2,
  quantitiesAccuracyDigits: 3,
  pricesAccuracyDigits: 2,
  ratesAccuracyDigits: 6,
  percentagesAccuracyDigits: 3,
  measuringUnitsAccuracyDigits: 3,
  queryAccuracyDigits: 2,
  decimalSeparator: '.',
  thousandsSeparator: ',',
  displayCurrencyOnTheRight: true,
  roundingMethod: true,
  state: 'NY',
  aliasName: '',
  addressType: '',
  streetNumber: '',
  dateOfIncorporation: '',
  globalLocationNumber: '',
  createdAt: '20221107T22:27:14.802Z',
  updatedAt: '20221108T17:44:19.663Z',
  createdBy: '5790c9caD3934411AfbaA7976ccf4647',
  updatedBy: '5790c9caD3934411AfbaA7976ccf4647',
  firstPullSyncAt: '20221107T22:27:07.478Z',
  lastPullSyncAt: '20221108T17:43:05.330Z',
  firstPushSyncAt: '',
  lastPushSyncAt: ''
};
