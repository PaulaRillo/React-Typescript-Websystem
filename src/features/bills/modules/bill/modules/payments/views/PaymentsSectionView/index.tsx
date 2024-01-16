import { Box, Typography } from '@mui/material';
import { Tag } from 'shared/components/Tag';
import {
  Section,
  SectionHeader,
  SectionContent
} from 'shared/components/Section';
import { PaymentsDataGrid } from '../../components/PaymentsDataGrid';

export const PaymentsSectionView = () => {
  return (
    <Section>
      <SectionHeader
        title="Payments"
        description="(2 attempts)"
        end={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Mar 17, 2022 - 10:23
            </Typography>
            <Tag type="success" label="PAID" />
          </Box>
        }
      />
      <SectionContent sx={{ height: 240 }}>
        <PaymentsDataGrid />
      </SectionContent>
    </Section>
  );
};
