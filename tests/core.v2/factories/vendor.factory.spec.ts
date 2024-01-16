import { Vendor } from '../../../src/core.v2/domain/vendor/entity/vendor';
import { VendorFactory } from '../../../src/core.v2/domain/vendor/factory/vendor-factory';

describe('Vendor Factory', () => {
  test(`Should create a Vendor`, async () => {
    const vendor = VendorFactory.create({
      id: '1',
      visualId: '1',
      externalId: '1',
      globalVendorId: '1',
      name: '1',
      legalName: '1',
      logoPath: '1',
      sinceAt: '1',
      accountBalance: 100,
      billToAddress: '1',
      billToZipCode: '1',
      mailToAddress: '1',
      mailToZipCode: '1',
      contacts: [
        {
          id: '1',
          name: '1',
          firstName: '1',
          lastName: '1',
          middleName: '1',
          email: 'johndoe@email.com',
          phone1: '1',
          phone2: '1',
          mobilePhone1: '1',
          mobilePhone2: '1',
          fax: '1',
          position: '1',
          profession: '1',
          gender: '1',
          isPrimaryContact: true,
          isBlockedFromBankingForm: false
        }
      ],
      addresses: [],
      bankingInfo: [],
      businessPartnerGroup: {
        id: '1',
        name: '1',
        description: '1',
        externalId: '1'
      },
      project: {
        externalId: '1',
        name: '1',
        generalLedgerAccountName: '1'
      }
    });

    expect(vendor).toBeDefined();
    expect(vendor).toBeInstanceOf(Vendor);
    expect(vendor.primaryContact?.email).toBe('johndoe@email.com');
  });
});
