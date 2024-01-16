import { VendorFactoryProps } from '../../../domain/vendor/factory/vendor-factory.props';
export interface VendorMapperInterface {
  toDomain(vendorDTO: any): VendorFactoryProps;
}
