import { User } from 'core.v2/domain/user/entity/user';
import { Section } from 'features/settings/modules/shared/components/Section';
import { SectionItem } from 'features/settings/modules/shared/components/SectionItem';
//translate
import { tr } from 'shared/translate';
type Props = {
  user: User | undefined;
};
export const BasicInfoSection = ({ user }: Props) => {
  return (
    <Section
      title={tr('settings.section.title.basic')}
      subTitle={tr('settings.section.subtitle.basic')}
    >
      <SectionItem
        title={tr('settings.section.item.name')}
        description={user ? `${user?.firstName} ${user?.lastName}` : undefined}
      />
      <SectionItem
        title={tr('settings.section.item.gender')}
        description={
          user?.description || tr('settings.section.placeholder.gender')
        }
      />
    </Section>
  );
};
