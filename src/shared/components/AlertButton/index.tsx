import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import { IconButton } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useAlert } from 'shared/hooks/useAlert';
import { IAlert } from 'shared/types/alert';
import { StylesProps } from 'shared/types/styles-props';
import * as styles from './styles';

type Props = {
  alert: IAlert;
  sx?: StylesProps;
};

export const AlertButton = (props: Props) => {
  const { alert } = useAlert();

  const stylesButton = useMemo(
    () => ({ ...styles.button, ...props.sx }),
    [props.sx]
  );

  const handleOpen = useCallback(() => {
    alert(props.alert);
  }, [alert, props.alert]);

  return (
    <IconButton size="small" sx={stylesButton} onClick={handleOpen}>
      <ReportTwoToneIcon fontSize="small" />
    </IconButton>
  );
};
