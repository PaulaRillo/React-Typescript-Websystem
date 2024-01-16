import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.1,
  width: '100%',
  minWidth: 200
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  height: '100%'
};

export const titleContainer: StylesProps = {
  display: 'flex',
  gap: 1,
  color: 'primary.main'
};

export const buttonContainer: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  gap: 0.2,
  justifyContent: 'space-between'
};

export const button: StylesProps = {
  height: 'fit-content',
  width: '100%',
  p: 1.5
};

export const loading: StylesProps = {
  minWidth: 256,
  p: 1.5
};

export const warningButton: StylesProps = {
  lineHeight: 1
};
