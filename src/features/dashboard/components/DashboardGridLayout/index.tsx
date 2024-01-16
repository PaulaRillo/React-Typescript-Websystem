import { Box } from '@mui/material';
import { CashflowExpensesWidget } from 'features/dashboard/widgets/CashflowExpensesWidget';
import { OpenInvoicesWidget } from 'features/dashboard/widgets/OpenInvoicesWidget';
import { PaymentsAmountByDayWidget } from 'features/dashboard/widgets/PaymentsAmountByDayWidget';
import { useCallback, useMemo } from 'react';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useLocalStorage } from 'shared/hooks/useLocalStorage';
import './react-grid-layout.css';
import * as styles from './styles';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardGridLayout = () => {
  const gridItemConfig = useMemo(
    () => ({
      minH: 2,
      maxH: 4,
      minW: 4,
      maxW: 12,
      moved: false,
      static: false,
      isResizable: true
    }),
    []
  );

  const [layouts, setLayouts] = useLocalStorage<ReactGridLayout.Layouts>(
    '@DashboardGridLayouts',
    {
      lg: [
        {
          i: '0',
          w: 6,
          h: 1,
          x: 0,
          y: 0,
          minW: 6,
          maxH: 1,
          isResizable: false
        },
        {
          i: '1',
          w: 6,
          h: 2,
          x: 0,
          y: 1,
          minW: 5,
          minH: 1,
          isResizable: true
        },
        {
          i: '2',
          w: 6,
          h: 3,
          x: 6,
          y: 0,
          minW: 6,
          minH: 3,
          isResizable: true
        }
      ],
      md: [
        {
          i: '0',
          w: 6,
          h: 1,
          x: 0,
          y: 0,
          minW: 5,
          maxH: 1,
          isResizable: false
        },
        {
          i: '1',
          w: 6,
          h: 3,
          x: 0,
          y: 2,
          minW: 6,
          minH: 1,
          isResizable: true
        },
        {
          i: '2',
          w: 6,
          h: 3,
          x: 0,
          y: 3,
          minW: 6,
          minH: 3,
          isResizable: true
        }
      ]
    }
  );

  const handleLayoutChange = useCallback(
    (_: ReactGridLayout.Layout[], allLayouts: ReactGridLayout.Layouts) => {
      setLayouts(allLayouts);
    },
    [setLayouts]
  );

  return (
    <Box component="section" sx={styles.container}>
      <ResponsiveGridLayout
        layouts={layouts}
        width={1200}
        rowHeight={200}
        isDraggable
        isResizable
        breakpoints={{ xl: 2400, lg: 1620, md: 1200, sm: 768, xs: 480, xxs: 0 }}
        cols={{ xl: 18, lg: 12, md: 6, sm: 6, xs: 4, xxs: 2 }}
        compactType="vertical"
        useCSSTransforms={true}
        draggableHandle=".drag-element"
        onLayoutChange={handleLayoutChange}
        style={styles.grid}
      >
        <div key="0">
          <OpenInvoicesWidget />
        </div>
        <div key="1">
          <PaymentsAmountByDayWidget />
        </div>
        <div key="2">
          <CashflowExpensesWidget />
        </div>
      </ResponsiveGridLayout>
    </Box>
  );
};
