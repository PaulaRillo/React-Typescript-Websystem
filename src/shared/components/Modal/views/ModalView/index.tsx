import { Modal } from '../../components/Modal';
import { ModalContainer } from '../../components/ModalContainer';
import { ModalHeader } from '../../components/ModalHeader';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
  minWidth?: number;
  minHeight?: number;
};

export const ModalView = ({
  title,
  open,
  onClose,
  minWidth = 600,
  minHeight,
  children
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader divider title={title} onClose={onClose} />
      <ModalContainer sx={{ minWidth, minHeight }}>{children}</ModalContainer>
    </Modal>
  );
};
