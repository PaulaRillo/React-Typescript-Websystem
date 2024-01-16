//core-components
import { User } from 'core.v2/domain/user/entity/user';
import { Section } from 'features/settings/modules/shared/components/Section';
import { SectionItem } from 'features/settings/modules/shared/components/SectionItem';
//translate
import { tr } from 'shared/translate';

type Props = {
  user: User | undefined;
};

export const ContactInfoSection = ({ user }: Props) => {
  return (
    <Section title={tr('settings.section.title.contact')}>
      <SectionItem
        title={tr('settings.section.item.email')}
        description={user?.email || tr('settings.section.placeholder.email')}
      />
      <SectionItem
        title={tr('settings.section.item.phone')}
        description={user?.phoneNumber || tr('settings.section.placeholder.phoneNumber')}
      />
    </Section>
  );
};
