import { Box, Button, Menu } from '@mui/material';
import { useMemo, useState } from 'react';
import { TabsNav } from 'shared/components/TabNav';
import { path } from 'shared/constants/path';
import { tr } from 'shared/translate';
import { DetailsSection } from '../DetailsSection';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = useMemo(() => {
    return [
      {
        label: tr('shared.overview'),
        path: path.vendors.id.overview
      },
      {
        label: tr('shared.bills'),
        path: path.vendors.id.bills
      },
      {
        label: tr('shared.payments'),
        path: path.vendors.id.payments
      },
      {
        label: tr('shared.contacts'),
        path: path.vendors.id.contacts
      },
      // {
      //   label: tr('shared.history'),
      //   path: path.vendors.id.history
      // },
      {
        label: tr('shared.settings'),
        path: path.vendors.id.settings.root
      }
    ];
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: '1' }}>
          <TabsNav items={navItems} />
        </Box>
        <Box sx={{ pr: 3 }}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            variant="outlined"
            color="info"
            size="small"
          >
            {tr('shared.details')} <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <DetailsSection />
          </Menu>
        </Box>
      </Box>
    </>
  );
};
