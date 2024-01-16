import { DomainMapperInterface } from '../../../domain/@shared/mappers/domain-mapper.interface';

export type InvoiceHistory = {
  createdAt: string;
  logId: string;
  userId: string;
  name: string;
  entityName: string;
  entityExternalId: string;
  field: string;
  oldValue: string;
  newValue: string;
  userAgent: string;
  sourceIp: string;
  requestUri: string;
  requestMethod: string;
  region: string;
  geo: string;
  tenant: string;
  appId: string;
  entityType: string;
  entityId: string;
  year: string;
  month: string;
  day: string;
};

export type InvoiceHistoryMapperInterface = DomainMapperInterface<
  InvoiceHistory[]
>;
