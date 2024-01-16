import { tr } from 'shared/translate';
import { ModalContainer, ModalHeader } from 'shared/components/Modal';
import { Modal } from 'shared/components/Modal/components/Modal';
import { NewUserCreationWizard } from '../../components/NewUserCreationWizard';
import { NewUserProvider } from '../../context/NewUserContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddUserModalView = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} maxWidth="md" onClose={onClose}>
      <ModalContainer sx={{ height: 600, width: 700, overflow: 'auto' }}>
        <ModalHeader
          title={tr('shared.newUser')}
          divider
          sx={{ bgcolor: 'grey.100' }}
          onClose={onClose}
        />
        <NewUserProvider>
          <NewUserCreationWizard onClose={onClose} />
        </NewUserProvider>
      </ModalContainer>
    </Modal>
  );
};
