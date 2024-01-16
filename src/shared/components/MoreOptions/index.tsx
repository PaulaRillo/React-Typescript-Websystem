import {
  IconButton,
  IconButtonProps,
  PopoverOrigin,
  Tooltip,
  TooltipProps
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Popover } from 'shared/components/Popover';
import { useCallback, useState } from 'react';

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  anchorOrigin?: PopoverOrigin;
  iconButtonProps?: IconButtonProps;
  tooltipProps?: Partial<TooltipProps>;
};

export const MoreOptions = ({
  children,
  icon,
  anchorOrigin,
  iconButtonProps,
  tooltipProps
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        onClose={handleClose}
      >
        {children}
      </Popover>
      <Tooltip title="" {...tooltipProps}>
        <IconButton {...iconButtonProps} onClick={handleOpen}>
          {icon ? icon : <MoreHorizOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
};
