import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Alert, Box, IconButton, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Avatar } from 'shared/components/Avatar';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { tr } from 'shared/translate';
import { Popover } from '../../../../components/Popover';
import * as styles from './styles';

type Props = CellRenderProps & {
  value: VendorContactPerson;
};

type VendorContactPerson = {
  contact_person_type: string;
  email: string;
  external_id: string;
  fax: string;
  first_name: string;
  id: string;
  is_active: boolean;
  last_name: string;
  middle_name: string;
  mobile_phone1: string;
  mobile_phone2?: string;
  name: string;
  phone1: string;
  phone2?: string;
  position: string;
  preferred_contact_method: number;
  profession: string;
  title: number;
};

export const ContactCell = ({ value }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const hasPrimaryContact = useMemo(() => {
    if (value && value?.name) {
      const splitName = value?.name.split(' ');
      value?.first_name
        ? setFirstName(value?.first_name)
        : setFirstName(splitName[0]);
      value?.last_name
        ? setLastName(value?.last_name)
        : setLastName(splitName[splitName.length - 1]);
      return true;
    }
  }, [value]);

  if (!hasPrimaryContact) {
    return (
      <>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={handleClose}
        >
          <Box sx={styles.container} onClick={handleOpen}>
            <Alert severity="info" variant="outlined" sx={{ maxWidth: 240 }}>
              {tr('shared.noPrimaryContact.message')}
            </Alert>
          </Box>
        </Popover>
        <Box sx={styles.container} onClick={handleOpen}>
          <Typography variant="body2">
            {tr('shared.noPrimaryContact')}
          </Typography>
          <IconButton size="small">
            <InfoOutlinedIcon sx={{ color: 'grey.500' }} />
          </IconButton>
        </Box>
      </>
    );
  }

  return (
    <Box sx={styles.container}>
      <Avatar
        user={{
          firstname: firstName,
          lastname: lastName
        }}
        sx={styles.avatar}
      />
      <Box sx={styles.info}>
        <Typography variant="subtitle1">{value?.name ?? ''}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {value?.email ?? ''}
        </Typography>
      </Box>
    </Box>
  );
};
