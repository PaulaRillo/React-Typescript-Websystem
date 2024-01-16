// Raw
export type OpenApInvoiceSummaryDashboardRaw = {
  total: {
    amount: number;
    count: number;
  };
  overdue: {
    amount: number;
    count: number;
  };
  due_in_7_days: {
    amount: number;
    count: number;
  };
  due_7_plus_days: {
    amount: number;
    count: number;
  };
};

export type OpenApInvoiceDashboardRaw = {
  code: 'OI';
  name: 'Open Invoices';
  description: 'Showing Open AP Invoices';
  generated_at: string;
  summary: OpenApInvoiceSummaryDashboardRaw;
};

// Domain
export type OpenApInvoiceSummaryDashboardDomain = {
  total: {
    amount: number;
    count: number;
  };
  overdue: {
    amount: number;
    count: number;
  };
  dueIn7Days: {
    amount: number;
    count: number;
  };
  due7PlusDays: {
    amount: number;
    count: number;
  };
};

export type OpenApInvoiceDashboardDomain = {
  code: 'OI';
  name: 'Open Invoices';
  description: 'Showing Open AP Invoices';
  generatedAt: string;
  summary: OpenApInvoiceSummaryDashboardDomain;
};
