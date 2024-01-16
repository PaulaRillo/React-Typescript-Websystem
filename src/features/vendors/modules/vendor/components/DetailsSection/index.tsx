import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Accordion } from 'shared/components/Accordion';
import { Avatar } from 'shared/components/Avatar';
import { Info } from 'shared/components/Info';
import { Loading } from 'shared/components/Loading';
import { tr } from 'shared/translate';
import { getLocaleDateTime } from 'shared/utils/string/getLocaleDate';
import { useGetVendor } from '../../queries/useGetVendor';
import * as styles from './styles';

export const DetailsSection = () => {
  const { data, isLoading } = useGetVendor();

  if (isLoading) {
    return <Loading />;
  }

  const firstName = data?.primaryContact?.name.split(' ')[0];
  const lastName = data?.primaryContact?.name.split(' ').pop();

  return (
    <Box sx={styles.container2}>
      <Info title={tr('vendors.details.mainContact')}>
        <>
          {data?.primaryContact ? (
            <React.Fragment>
              <Avatar
                user={{
                  firstname: data.primaryContact?.firstName || firstName || '',
                  lastname: data.primaryContact?.lastName || lastName || ''
                }}
                fullName
              />
              <Typography variant="body2" sx={styles.primaryContactDetails}>
                {data?.primaryContact?.email}
              </Typography>
              <Typography variant="body2" sx={styles.primaryContactDetails}>
                {data?.primaryContact?.phone1 ||
                  data?.primaryContact?.phone2 ||
                  '----'}
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="body2" sx={styles.noContactDetails}>
                {tr('vendors.details.noPrimaryContact')}
              </Typography>
              <Tooltip
                title={tr('shared.noPrimaryContact.message')}
                placement="top"
                sx={styles.noContactDetailsTooltip}
              >
                <InfoOutlinedIcon />
              </Tooltip>
            </React.Fragment>
          )}
        </>
      </Info>
      <Info title={tr('shared.id')}>
        <Typography variant="body2">{data?.visualId}</Typography>
      </Info>
      <Info title={tr('shared.external_id')}>
        <Typography variant="body2">{data?.externalId || '----'}</Typography>
      </Info>
      <Info title={tr('shared.since')}>
        <Typography variant="body2">
          {getLocaleDateTime(data?.sinceAt) || '--/--/--'}
        </Typography>
      </Info>
    </Box>
  );
};
