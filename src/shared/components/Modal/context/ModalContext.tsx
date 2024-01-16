import { createContext, ReactNode, useCallback, useState } from 'react';

type Props = {
  children: ReactNode;
};

type InitialState = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const ModalContext = createContext({
  open: false
} as InitialState);

const ModalProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ open, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
