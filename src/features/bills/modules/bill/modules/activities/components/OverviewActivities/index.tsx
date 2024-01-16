import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Tooltip, TooltipProps, Typography } from '@mui/material';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { Avatar } from 'shared/components/Avatar';
import { Tag } from 'shared/components/Tag';
import * as styles from './styles';

export const OverviewActivities = () => {
  const { data } = useGetInvoice();

  const tooltipConfig: Partial<TooltipProps> = {
    arrow: true,
    placement: 'top'
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.row}>
        <Box sx={styles.avatar}>
          <Tooltip title="User" {...tooltipConfig}>
            <Avatar
              user={{ firstname: 'Francisco', lastname: 'Lozada' }}
              fullName
              fullNameProps={{ variant: 'caption', fontWeight: 500 }}
            />
          </Tooltip>
        </Box>
        <Box sx={styles.info}>
          <Box sx={styles.line}>
            <Typography variant="caption">Requested the payment</Typography>
            <Typography variant="caption" color="text.secondary">
              Mar 17, 2022 - 14:30
            </Typography>
            <Tag type="neutral" label="HISTORY" />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.avatar}>
          <Tooltip title="User" {...tooltipConfig}>
            <Avatar
              user={{ firstname: 'Paula', lastname: 'Rillo' }}
              fullName
              fullNameProps={{ variant: 'caption', fontWeight: 500 }}
            />
          </Tooltip>
        </Box>
        <Box sx={styles.info}>
          <Box sx={styles.line}>
            <Typography variant="caption">Approved the payment</Typography>
            <Typography variant="caption" color="text.secondary">
              Mar 17, 2022 - 14:30
            </Typography>
            <Tag type="neutral" label="HISTORY" />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.avatar}>
          <Tooltip title="User" {...tooltipConfig}>
            <Avatar
              user={{ firstname: 'Ivan', lastname: 'Caperuto' }}
              fullName
              fullNameProps={{ variant: 'caption', fontWeight: 500 }}
            />
          </Tooltip>
        </Box>
        <Box sx={styles.info}>
          <Box sx={styles.line}>
            <Typography variant="caption">Approved the payment</Typography>
            <Typography variant="caption" color="text.secondary">
              Mar 17, 2022 - 14:30
            </Typography>
            <Tag type="neutral" label="HISTORY" />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.avatar}>
          <Tooltip title="User" {...tooltipConfig}>
            <Avatar
              user={{ firstname: 'Carlos', lastname: 'Pinell' }}
              fullName
              fullNameProps={{ variant: 'caption', fontWeight: 500 }}
            />
          </Tooltip>
        </Box>
        <Box sx={styles.info}>
          <Box sx={styles.line}>
            <Typography variant="caption">Approved the payment</Typography>
            <Typography variant="caption" color="text.secondary">
              Mar 17, 2022 - 14:30
            </Typography>
            <Tag type="neutral" label="HISTORY" />
          </Box>
          <Box sx={styles.line}>
            <Tag type="warning" label="PENDING" />
            <ArrowForwardOutlinedIcon
              sx={{ fontSize: 16, color: 'text.secondary' }}
            />
            <Tag type="success" label="APPROVED" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
