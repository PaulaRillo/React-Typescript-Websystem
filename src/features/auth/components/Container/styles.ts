import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'grey.100',
  width: '100%',
  height: '100vh'
};

export const btElementTopRight: StylesProps = {
  position: 'absolute',
  top: 0,
  right: 0
};

export const btElementBottomLeft: StylesProps = {
  position: 'absolute',
  bottom: 0,
  left: 0
};

export const awsContainer: StylesProps = {
  width: '100%',
  maxWidth: '448px'
};

export const awsImg: StylesProps = {
  width: '18%',
  pt: '4%',
  float: 'right'
};
