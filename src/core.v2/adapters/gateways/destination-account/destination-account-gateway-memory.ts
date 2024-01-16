import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { DestinationAccountGatewayInterface } from 'core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import { DestinationAccountMapperInterface } from 'core.v2/adapters/mappers/destination-account/destination-account-mapper.interface';
import { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';

export class DestinationAccountGatewayMemory
  implements DestinationAccountGatewayInterface
{
  private readonly destinationAccountMapper: DestinationAccountMapperInterface;

  constructor(private readonly mapperFactory: MapperFactoryInterface) {
    this.destinationAccountMapper =
      this.mapperFactory.createDestinationAccountMapper();
  }

  async list(vendorId?: string): Promise<DestinationAccountType[]> {
    return data.map((dto: any) => this.destinationAccountMapper.toDomain(dto));
  }
}

const data = JSON.parse(
  `[{"vault_payment_method_id":null,"account_alias":null,"redacted_bank_account_number":"9559*****2-34","currency_code":"USD","bank_name":"Bank of New York"},{"vault_payment_method_id":null,"account_alias":null,"redacted_bank_account_number":"9559*****2-33","currency_code":"USD","bank_name":"Bank of New York"}]`
);
