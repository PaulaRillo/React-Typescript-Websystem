import { Section } from 'shared/components/Section';
import { SectionHeader } from 'shared/components/Section';
import { SectionContent } from 'shared/components/Section';
import { OverviewActivities } from '../../components/OverviewActivities';

export const ActivitiesSectionView = () => {
  return (
    <Section>
      <SectionHeader title="Activities" />
      <SectionContent>
        <OverviewActivities />
      </SectionContent>
    </Section>
  );
};
