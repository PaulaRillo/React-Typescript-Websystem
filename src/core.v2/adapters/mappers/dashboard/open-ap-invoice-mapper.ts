import {
  OpenApInvoiceDashboardDomain,
  OpenApInvoiceDashboardRaw
} from './open-ap-invoice-mapper.interface';

export class OpenApInvoiceDashboardMapper {
  toDomain(dto: OpenApInvoiceDashboardRaw): OpenApInvoiceDashboardDomain {
    const { code, name, description, generated_at, summary } = dto;

    return {
      code: code,
      name: name,
      description: description,
      generatedAt: generated_at,
      summary: {
        total: {
          amount: summary.total.amount,
          count: summary.total.count
        },
        overdue: {
          amount: summary.overdue.amount,
          count: summary.overdue.count
        },
        dueIn7Days: {
          amount: summary.due_in_7_days.amount,
          count: summary.due_in_7_days.count
        },
        due7PlusDays: {
          amount: summary.due_7_plus_days.amount,
          count: summary.due_7_plus_days.count
        }
      }
    };
  }
}
