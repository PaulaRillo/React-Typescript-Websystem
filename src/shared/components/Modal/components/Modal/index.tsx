//material-ui
import { Dialog, DialogProps, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
//resources
import { forwardRef } from 'react';

type Props = DialogProps;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = (props: Props) => {
  return (
    <Dialog
      {...props}
      TransitionComponent={Transition}
      PaperProps={{ sx: { borderRadius: 2 } }}
    />
  );
};
