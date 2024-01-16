import { Vendor } from '../entity/vendor';
import { VendorFactoryProps } from './vendor-factory.props';

export class VendorFactory {
  public static create(props: VendorFactoryProps): Vendor {
    const primaryContact = props.contacts
      ? props.contacts.find((contact) => contact.isPrimaryContact)
      : undefined;

    return new Vendor(
      props.id,
      props.visualId,
      props.externalId,
      props.globalVendorId,
      props.name,
      props.legalName,
      props.logoPath,
      props.sinceAt,

      props.accountBalance,
      props.openInvoices,
      props.openBalance,

      props.billToAddress,
      props.billToZipCode,
      props.mailToAddress,
      props.mailToZipCode,

      props.contacts,
      primaryContact,
      props.addresses,
      props.bankingInfo,
      props.businessPartnerGroup,
      props.project
    );
  }
}
