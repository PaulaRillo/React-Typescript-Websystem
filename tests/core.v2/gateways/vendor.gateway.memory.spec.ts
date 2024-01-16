import { VendorGatewayInterface } from '../../../src/core.v2/adapters/gateways/vendor/vendor-gateway.interface';
import { VendorGatewayMemory } from '../../../src/core.v2/adapters/gateways/vendor/vendor-gateway-memory';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { serverInit } from '../../utils/serverInit';
import { GatewayFactoryMemory } from '../../../src/core.v2/adapters/gateways/gateway-factory-memory';

describe('VendorGateway', () => {
  jest.setTimeout(20000);

  let vendorGatewayMemory: VendorGatewayInterface;
  beforeAll(async () => {
    await serverInit();
    const mapperFactory = new MapperFactory();
    vendorGatewayMemory = new VendorGatewayMemory(mapperFactory);
  });

  test('Should get a vendor DTO by visualId', async () => {
    const vendorVisualId = '954504205';
    const invoice = await vendorGatewayMemory.find(vendorVisualId);

    expect(invoice.visualId).toBe(vendorVisualId);
    expect(invoice.name).toBe('Blockies Corporation');
    expect(invoice.logoPath).toBe(undefined);
    expect(invoice.sinceAt).toBe('2022-11-11T14:50:41.024Z');
    expect(invoice.billToAddress).toBe('2547 Longview Ave');
    expect(invoice.billToZipCode).toBe('11581');
    expect(invoice.mailToAddress).toBe('2547 Longview Ave');
    expect(invoice.mailToZipCode).toBe('11581');
    expect(invoice.contacts).toEqual([
      {
        email: 'michael.morgan@blockies.sap.com',
        fax: '555-0114',
        firstName: undefined,
        gender: 'unspecified',
        id: '0',
        isBlockedFromBankingForm: false,
        isPrimaryContact: false,
        lastName: undefined,
        middleName: undefined,
        mobilePhone1: '555-0176',
        position: 'Account Executive',
        mobilePhone2: undefined,
        name: 'Michael Morgan',
        phone1: '555-0109',
        phone2: undefined,
        profession: undefined
      },
      {
        email: 'sarina.hanschke@blockies.sap.com',
        fax: '555-0158',
        firstName: undefined,
        gender: 'unspecified',
        id: '0',
        isBlockedFromBankingForm: false,
        isPrimaryContact: false,
        lastName: undefined,
        position: 'COO',
        middleName: undefined,
        mobilePhone1: '555-0177',
        mobilePhone2: undefined,
        name: 'Sarina Hanschke',
        phone1: '555-0157',
        phone2: undefined,
        profession: undefined
      }
    ]);
  });

  test('Should list vendors', async () => {
    const vendors = await vendorGatewayMemory.list('0', '20');

    expect(vendors).toBeDefined();
    expect(vendors.data.length).toBeGreaterThan(0);

    vendors.data.forEach((element) => {
      expect(element.id).toBeDefined();
      expect(element.visualId).toBeDefined();
      expect(element.externalId).toBeDefined();
      expect(element.name).toBeDefined();
      element.contacts.forEach((contact) => {
        expect(contact.id).toBeDefined();
        expect(contact.name).toBeDefined();
        expect(contact.email).toBeDefined();
        expect(contact.phone1).toBeDefined();
      });
    });
  });
});
