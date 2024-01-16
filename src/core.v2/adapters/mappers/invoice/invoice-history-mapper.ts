import {
  InvoiceHistory,
  InvoiceHistoryMapperInterface
} from './invoice-history-mapper.interface';

export class InvoiceHistoryMapper implements InvoiceHistoryMapperInterface {
  toDomain(dto: any): InvoiceHistory[] {
    const keys = dto[0].Data.map((item: any) => item.VarCharValue);
    const result: InvoiceHistory[] = dto
      .slice(1)
      .reduce((acc: InvoiceHistory[], item: any) => {
        const values = item.Data.map((i: any) => i.VarCharValue);
        const invoiceHistory: any = {};
        keys.forEach((key: any, index: any) => {
          invoiceHistory[key] = values[index];
        });
        acc.push(invoiceHistory);
        return acc;
      }, []);

    const invoiceHistories: InvoiceHistory[] = result.map((item: any) => {
      return {
        createdAt: item?.created_at,
        logId: item?.log_id,
        userId: item?.user_id,
        name: item?.name,
        entityName: item?.entity_name,
        entityExternalId: item?.entity_external_id,
        field: item?.field,
        oldValue: item?.old_value,
        newValue: item?.new_value,
        userAgent: item?.user_agent,
        sourceIp: item?.source_ip,
        requestUri: item?.request_uri,
        requestMethod: item?.request_method,
        region: item?.region,
        geo: item?.geo,
        tenant: item?.tenant,
        appId: item?.app_id,
        entityType: item?.entity_type,
        entityId: item?.entity_id,
        year: item?.year,
        month: item?.month,
        day: item?.day
      };
    });

    return invoiceHistories;
  }
}
