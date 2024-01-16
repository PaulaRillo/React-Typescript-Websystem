//material-ui
import { Box } from '@mui/material';
//resources
import { useCallback, useState } from 'react';
//core-components
import { DataGridReact } from '../../types';
import { MoreOptions } from 'shared/components/MoreOptions';
import { MoreOptionsButton } from 'shared/components/MoreOptionsButton';
import { DensityLarge, DensityMedium, DensitySmall } from '@mui/icons-material';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

type Props = {
  children?: React.ReactNode;
  gridRef: React.RefObject<DataGridReact>;
};

type Density = 'default' | 'compact' | 'comfortable';

export const ToolbarDataGrid = ({ gridRef, children }: Props) => {
  const [currentDensity, setCurrentDensity] = useState<Density>('default');

  const handleSetRowHeight = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gridRef.current) return;
      const rowHeight = e.currentTarget.getAttribute('data-row-height');
      const density = e.currentTarget.getAttribute('density-row') as Density;
      setCurrentDensity(density);
      gridRef.current.api.forEachNode((rowNode) => {
        rowNode.setRowHeight(Number(rowHeight));
      });
      gridRef.current.api.onRowHeightChanged();
    },
    [gridRef]
  );

  const switchIconDensity = {
    default: <DensityMedium fontSize="small" />,
    compact: <DensitySmall fontSize="small" />,
    comfortable: <DensityLarge fontSize="small" />
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.end}>
        <MoreOptions
          anchorOrigin={{ horizontal: -104, vertical: 'bottom' }}
          icon={switchIconDensity[currentDensity]}
          tooltipProps={{
            title: `${tr('shared.rowDensity')} ${currentDensity}`
          }}
          iconButtonProps={{ size: 'medium' }}
        >
          <MoreOptionsButton
            startIcon={<DensityMedium />}
            data-row-height={48}
            density-row="default"
            onClick={handleSetRowHeight}
          >
            {tr('shared.default')}
          </MoreOptionsButton>
          <MoreOptionsButton
            startIcon={<DensitySmall />}
            density-row="compact"
            data-row-height={40}
            onClick={handleSetRowHeight}
          >
            {tr('shared.compact')}
          </MoreOptionsButton>
          <MoreOptionsButton
            startIcon={<DensityLarge />}
            density-row="comfortable"
            data-row-height={60}
            onClick={handleSetRowHeight}
          >
            {tr('shared.comfortable')}
          </MoreOptionsButton>
        </MoreOptions>
      </Box>
      {!!children && children}
    </Box>
  );
};
