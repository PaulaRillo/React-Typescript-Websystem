import { InvoiceMapper } from '../../../src/core.v2/adapters/mappers/invoice/invoice-mapper';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { invoiceRawData01 } from '../../mock/invoiceRawData';
import { serverInit } from '../../utils/serverInit';

// prettier-ignore

describe('InvoiceMapperApi', () => {
  jest.setTimeout(20000);

  let invoiceMapper: InvoiceMapper;

  beforeAll(async () => {
    await serverInit();
    const mapperFactory = new MapperFactory();
    invoiceMapper = mapperFactory.createInvoiceMapper();
  });

  test('Should map Invoice', async () => {
    const invoice = invoiceMapper.toDomain(invoiceRawData01);

    expect(invoice.id).toBe(invoiceRawData01.id);
    expect(invoice.externalId).toBe(invoiceRawData01.external_id);
    expect(invoice.visualId).toBe(invoiceRawData01.visual_id);
    expect(invoice.externalApInvoiceNumber).toBe(invoiceRawData01.external_ap_invoice_number);
    expect(invoice.referenceNumberExternal).toBe(invoiceRawData01.reference_number_external);
    expect(invoice.transactionContentType).toBe(invoiceRawData01.transaction_content_type?.toString());
  });

  test('Should map InvoiceLines', async () => {
    const invoice = invoiceMapper.toDomain(invoiceRawData01);

    expect(invoice?.invoiceLines?.length).toBe(1);
    expect(invoice?.invoiceLines?.[0].id).toBe(invoiceRawData01.ap_invoice_lines[0].ap_invoice_id); //TODO: check with frank if this is right, because seems to be wrong data
    expect(invoice?.invoiceLines?.[0].externalId).toBe(invoiceRawData01.ap_invoice_lines[0].ap_invoice_external_id); //TODO: check with frank if this is right, because seems to be wrong data
  });
});
