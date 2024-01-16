import { Box, Typography } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { WidgetControl } from 'features/dashboard/components/WidgetControl';
import { useCallback, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useGetOutgoingPaymentsDashboard } from 'shared/api/queries/useGetOutgoingPaymentsDashboard';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import { useGetTenantSyncStatus } from 'shared/api/queries/useGetTenantSyncStatus';
import { Loading } from 'shared/components/Loading';
import { useGetCurrentLang } from 'shared/hooks/useGetCurrentLang';
import { tr } from 'shared/translate';
import { Widget } from '../../components/Widget';

export const CashflowExpensesWidget = () => {
  const { data: widget, isLoading, isRefetching, refetch } = useGetOutgoingPaymentsDashboard(); //prettier-ignore
  const { data: syncStatus } = useGetTenantSyncStatus();
  const { data: tenantSettings } = useGetTenantSettings();
  const { lang } = useGetCurrentLang();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const getMonth = useCallback(
    (monthAgo: number): string => {
      const date = new Date();
      date.setMonth(date.getMonth() - monthAgo);
      return date.toLocaleDateString(lang, {
        month: 'short',
        year: 'numeric'
      });
    },
    [lang]
  );

  const labels = useMemo<string[]>(() => [getMonth(0)], [getMonth]);

  const colorsArray: string[] = useMemo(
    () => [
      'rgba(53, 162, 235, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(147, 190, 204, 1)',
      'rgba(243, 183, 102, 1)',
      'rgba(230, 134, 156, 1)',
      'rgba(120, 180, 204, 1)',
      'rgba(254, 171, 64, 1)',
      'rgba(250, 104, 128, 1)',
      'rgba(162, 197, 209, 1)',
      'rgba(251, 162, 105, 1)',
      'rgba(247, 120, 142, 1)',
      'rgba(109, 168, 192, 1)',
      'rgba(245, 143, 75, 1)',
      'rgba(249, 84, 113, 1)',
      'rgba(183, 210, 223, 1)',
      'rgba(254, 143, 99, 1)',
      'rgba(141, 188, 202, 1)',
      'rgba(191, 140, 159, 1)',
      'rgba(175, 209, 216, 1)'
    ],
    []
  );

  const getColor = useCallback(
    (index: number): string => {
      if (index >= colorsArray.length) {
        const randomIndex = Math.floor(Math.random() * colorsArray.length);
        return colorsArray[randomIndex];
      }
      const colorIndex = index % colorsArray.length;
      return colorsArray[colorIndex];
    },
    [colorsArray]
  );

  const data = useMemo(() => {
    const empty = { labels: [], datasets: [] } as any;
    if (!widget || !widget.data || widget.data.length === 0) return empty;

    type CashFlowOccurrencesValue = { totalAmountPaid: number; name: string; color: string }; //prettier-ignore
    type CashFlowOccurrences = Record<string, CashFlowOccurrencesValue>;

    const cashFlowOccurrences: CashFlowOccurrences = {};

    for (let idx = 0; idx < widget.data.length; idx++) {
      const item = widget.data[idx];
      const cashFlowId = item.cashFlow.id;

      if (cashFlowOccurrences[cashFlowId]) {
        cashFlowOccurrences[cashFlowId].totalAmountPaid += item.totalAmountPaid;
      } else {
        cashFlowOccurrences[cashFlowId] = {
          totalAmountPaid: item.totalAmountPaid,
          name: item.cashFlow.name,
          color: getColor(idx)
        };
      }
    }

    const datasets: any[] = [];
    const localCurrencySymbol = tenantSettings?.localCurrency?.symbol || '';

    for (const cashFlowId in cashFlowOccurrences) {
      const cashflow = cashFlowOccurrences[cashFlowId];
      datasets.push({
        label: `${cashflow.name} (${localCurrencySymbol})`,
        data: Array(labels.length).fill(cashflow.totalAmountPaid || 0),
        borderColor: cashflow.color,
        backgroundColor: cashflow.color.replace('1)', '0.5)')
      });
    }

    return { labels, datasets };
  }, [getColor, labels, tenantSettings?.localCurrency?.symbol, widget]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const
        }
      }
    }),
    []
  );

  const hasData = useMemo(
    () => widget?.data && widget?.data?.length > 0,
    [widget]
  );

  return (
    <Widget
      title={tr('shared.cashflow-expense')}
      end={
        widget?.data && (
          <WidgetControl
            isLoading={isLoading}
            isRefetching={isRefetching}
            lastSyncAt={new Date(syncStatus?.globalState?.lastSyncAt || '')}
            widgetGeneratedAt={new Date(widget?.generatedAt || '')}
            noDataAvailable={!hasData}
            onClickRefetch={refetch}
          />
        )
      }
    >
      <Box sx={{ p: 2, height: '100%' }}>
        {isLoading && <Loading />}
        {hasData && <Bar options={options} data={data} />}
        {!hasData && !isLoading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Typography variant="caption">
              {tr('shared.no-data-available')}
            </Typography>
          </Box>
        )}
      </Box>
    </Widget>
  );
};
