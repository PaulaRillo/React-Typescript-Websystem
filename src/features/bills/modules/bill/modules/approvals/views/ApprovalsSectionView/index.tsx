import {
  Section,
  SectionHeader,
  SectionContent,
  SectionStats
} from 'shared/components/Section';
import { ApprovalsDataGrid } from '../../components/ApprovalsDataGrid';

export const ApprovalsSectionView = () => {
  return (
    <Section>
      <SectionHeader
        title="Approvals"
        description="8 missing approvals and 1 rejection (12 approvers)"
        end={
          <SectionStats
            stats={[
              {
                value: '2',
                type: 'success',
                description: 'Approved'
              },
              {
                value: '1',
                type: 'error',
                description: 'Not approved'
              },
              {
                value: '2',
                type: 'warning',
                description: 'Pending'
              },
              {
                value: '5',
                type: 'info',
                description: 'Total'
              }
            ]}
          />
        }
      />
      <SectionContent>
        <ApprovalsDataGrid />
      </SectionContent>
    </Section>
  );
};
