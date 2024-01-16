import { Divider, Stack, Typography } from '@mui/material';
import { Widget } from 'features/dashboard/components/Widget';
import { WidgetControl } from 'features/dashboard/components/WidgetControl';
import { useGetOpenApInvoicesDashboard } from 'shared/api/queries/useGetOpenApInvoicesDashboard';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import { useGetTenantSyncStatus } from 'shared/api/queries/useGetTenantSyncStatus';
import { Loading } from 'shared/components/Loading';
import { Spacer } from 'shared/components/Spacer';
import { useFormatMoney } from 'shared/hooks/useFormatMoney';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const OpenInvoicesWidget = () => {
  const { data, isLoading, isRefetching, refetch } = useGetOpenApInvoicesDashboard(); //prettier-ignore
  const { data: syncStatus } = useGetTenantSyncStatus();

  if (isLoading) {
    return (
      <Widget title={tr('shared.open-bills')}>
        <Loading size={32} />
      </Widget>
    );
  }

  return (
    <Widget
      title={tr('shared.open-bills')}
      end={
        <WidgetControl
          isLoading={isLoading}
          isRefetching={isRefetching}
          lastSyncAt={new Date(syncStatus?.globalState?.lastSyncAt || '')}
          widgetGeneratedAt={new Date(data?.generatedAt || '')}
          onClickRefetch={refetch}
        />
      }
    >
      <Stack direction="row" spacing={3} sx={styles.container}>
        <Value
          name={tr('shared.overdue')}
          amount={data?.summary.overdue.amount}
          count={data?.summary.overdue.count}
        />
        <Divider orientation="vertical" light flexItem />
        <Value
          name={tr('shared.dueIn7Days')}
          amount={data?.summary.dueIn7Days.amount}
          count={data?.summary.dueIn7Days.count}
        />
        <Divider orientation="vertical" light flexItem />
        <Value
          name={tr('shared.due7PlusDays')}
          amount={data?.summary.due7PlusDays.amount}
          count={data?.summary.due7PlusDays.count}
        />
        <Spacer />
        <Divider orientation="vertical" light flexItem />
        <Value
          name={tr('shared.totalOwed')}
          amount={data?.summary.total.amount || 0}
          count={data?.summary.total.count || 0}
        />
      </Stack>
    </Widget>
  );
};

type ValueProps = {
  name: string;
  amount: number | string | undefined;
  count: number | string | undefined;
};

const Value = ({ name, amount, count }: ValueProps) => {
  const { format } = useFormatMoney();
  const { data } = useGetTenantSettings();

  return (
    <Stack spacing={0.2} sx={{ width: 'fit-content' }}>
      <Typography
        noWrap
        variant="h6"
        fontWeight="medium"
        color="text.secondary"
        textOverflow="ellipsis"
        fontSize={18}
      >
        {name}
      </Typography>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        noWrap
        textOverflow="ellipsis"
      >
        {`${data?.localCurrencyId} ${format(amount)}`}
      </Typography>
      <Typography
        variant="overline"
        fontWeight="medium"
        color="text.secondary"
        noWrap
      >
        {count} {tr('Invoices')}
      </Typography>
    </Stack>
  );
};
