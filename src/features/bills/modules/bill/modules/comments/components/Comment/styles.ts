import { StylesProps } from 'shared/types/styles-props';

export const comment: StylesProps = {
  display: 'flex',
  width: '100%',
  p: '8px',
  gap: 2
};

export const loggedUsercomment: StylesProps = {
  ...comment,
  flexDirection: 'row-reverse'
};

export const message: StylesProps = {
  display: 'flex',
  flexWrap: 'wrap',
  width: 'fit-content',
  py: 1,
  px: 1.5,
  bgcolor: 'grey.200',
  borderRadius: 2,
  flexDirection: 'column'
};

export const loggedUsermessage: StylesProps = {
  ...message,
  bgcolor: 'rgba(94, 146, 243, 0.08)'
};

export const messageContainer: StylesProps = {
  width: '100%'
};

export const loggedUsermessageContainer: StylesProps = {
  ...messageContainer,
  display: 'flex',
  justifyContent: 'flex-end'
};

export const dateTime: StylesProps = {
  color: 'text.secondary'
};

export const loggedUserDateTime: StylesProps = {
  ...dateTime,
  textAlign: 'right'
};

export const name: StylesProps = {
  fontWeight: 'bold'
};

export const loggedUserName: StylesProps = {
  ...name,
  textAlign: 'right'
};
