import { Box, Typography } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { WidgetControl } from 'features/dashboard/components/WidgetControl';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useGetOutgoingPaymentsDashboard } from 'shared/api/queries/useGetOutgoingPaymentsDashboard';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import { useGetTenantSyncStatus } from 'shared/api/queries/useGetTenantSyncStatus';
import { Loading } from 'shared/components/Loading';
import { useGetCurrentLang } from 'shared/hooks/useGetCurrentLang';
import { tr } from 'shared/translate';
import { Widget } from '../../components/Widget';

export const PaymentsAmountByDayWidget = () => {
  const { data: widget, isLoading, isRefetching, refetch } = useGetOutgoingPaymentsDashboard(); //prettier-ignore
  const { data: syncStatus } = useGetTenantSyncStatus();
  const { data: tenantSettings } = useGetTenantSettings();
  const { lang } = useGetCurrentLang();

  const hasData = useMemo(
    () => widget?.data && widget?.data?.length > 0,
    [widget]
  );

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: false,
          text: tr('shared.totalAmountPaidByDay')
        }
      }
    }),
    []
  );

  const data = useMemo(() => {
    const empty = { labels: [], datasets: [] } as any;
    if (!widget || !widget.data || widget.data.length === 0) return empty;
    const paymentLines = widget.data;

    const RANGE_OF_DAYS = 7;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: Date[] = Array.from({ length: RANGE_OF_DAYS }, (_, idx) => {
      const day = new Date(today);
      day.setDate(day.getDate() - idx);
      return day;
    });

    const dayAmount: Record<string, number> = {};

    for (const paymentLine of paymentLines) {
      const createdAt = new Date(paymentLine.createdAt);
      createdAt.setHours(0, 0, 0, 0);
      const index = days.findIndex((day) => day.getTime() === createdAt.getTime()); //prettier-ignore
      if (index !== -1) {
        const dayString = days[index].toLocaleDateString();
        if (!dayAmount[dayString]) dayAmount[dayString] = 0;
        dayAmount[dayString] += paymentLine.totalAmountPaid;
      }
    }

    const labels = days.map((day) => day.toLocaleDateString());
    const localCurrency = tenantSettings?.localCurrency?.symbol || '';

    return {
      labels: days.map((day) =>
        day.toLocaleDateString(lang, { day: '2-digit', month: 'short' })
      ),
      datasets: [
        {
          label: `${tr('shared.totalAmountPaid')} (${localCurrency})`,
          data: labels.map((label) => dayAmount[label] || 0),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    };
  }, [lang, tenantSettings?.localCurrency?.symbol, widget]);

  return (
    <Widget
      title={tr('shared.payments-by-day')}
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
        {hasData && <Line options={options} data={data} />}
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
