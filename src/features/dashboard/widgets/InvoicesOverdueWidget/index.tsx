import { Box, Typography } from '@mui/material';
import { ValueFormatterParams } from 'ag-grid-community';
import { Widget } from 'features/dashboard/components/Widget';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { DataGrid } from 'shared/grids/DataGrid';
import { CellRenderProps, ColumnDefProps } from 'shared/grids/DataGrid/types';
import { useFormatValueAgGrid } from 'shared/hooks/useFormatValueAgGrid';
import { tr } from 'shared/translate';
import { getLocaleDate } from 'shared/utils/string/getLocaleDate';

export const InvoicesOverdueWidget = () => {
  const data = {} as any;
  const isLoading = true;

  const { formatCurrencyValue } = useFormatValueAgGrid();

  const columnDefs = useMemo((): ColumnDefProps[] => {
    return [
      {
        headerName: tr('shared.id'),
        field: 'visualId',
        maxWidth: 80,
        cellRenderer: InvoiceCell
      },
      {
        field: 'externalApInvoiceNumber',
        headerName: tr('shared.number.abbreviated'),
        maxWidth: 80
      },
      {
        headerName: tr('shared.vendor'),
        field: 'vendorTradeName',
        flex: 1,
        cellRenderer: VendorCell
      },
      {
        headerName: tr('shared.total'),
        field: 'invoiceTotal',
        flex: 1,
        valueFormatter: (params: ValueFormatterParams) => {
          return formatCurrencyValue(params, 'data.currencyId');
        }
      },
      {
        headerName: tr('shared.due_date'),
        field: 'dueDate',
        maxWidth: 120,
        valueFormatter: (params: ValueFormatterParams) => {
          return getLocaleDate(params?.data?.dueDate);
        }
      },
      {
        headerName: tr('shared.postingDate'),
        field: 'postingDate',
        maxWidth: 120,
        valueFormatter: (params: ValueFormatterParams) => {
          return getLocaleDate(params?.data?.postingDate);
        }
      }
    ];
  }, [formatCurrencyValue]);

  if (isLoading) {
    return (
      <Widget title="Bills overdue">
        <Loading size={32} />
      </Widget>
    );
  }

  return (
    <Widget
      title="Bills overdue"
      end={
        <Typography variant="caption" color="text.secondary">
          {tr('shared.showingOf', {
            showing: data?.widgets?.openInvoices?.invoicesOverDue?.data?.length,
            total: data?.widgets?.openInvoices?.invoicesOverDue?.count
          })}
        </Typography>
      }
    >
      <DataGrid
        rowData={data?.widgets?.openInvoices?.invoicesOverDue?.data}
        columnDefs={columnDefs}
        className="ag-theme-hco-square-no-borders"
      />
    </Widget>
  );
};

const InvoiceCell = ({ data, value }: CellRenderProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    navigate(`/bills/${data?.id}`);
  }, [data?.id, navigate]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        color: 'info.main',
        cursor: 'pointer',
        '&:hover': {
          color: 'info.light',
          textDecoration: 'underline'
        }
      }}
    >
      {value}
    </Box>
  );
};

export const VendorCell = ({ value, data }: CellRenderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vendors/${data?.vendorVisualId}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        color: 'info.main',
        cursor: 'pointer',
        '&:hover': {
          color: 'info.light',
          textDecoration: 'underline'
        }
      }}
    >
      {value}
    </Box>
  );
};
