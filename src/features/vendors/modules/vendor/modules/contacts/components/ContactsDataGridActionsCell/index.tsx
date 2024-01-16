import { MoreOptions } from 'shared/components/MoreOptions';
import { MoreOptionsButton } from 'shared/components/MoreOptionsButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { tr } from 'shared/translate';

export const ContactsDataGridActionsCell = () => {
  return (
    <MoreOptions anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <MoreOptionsButton startIcon={<ModeEditOutlineOutlinedIcon />}>
        {tr('shared.edit')}
      </MoreOptionsButton>
      <MoreOptionsButton startIcon={<ArchiveOutlinedIcon />}>
        {tr('shared.archive')}
      </MoreOptionsButton>
    </MoreOptions>
  );
};
