import { useContext } from 'react';
import { NewUserContext } from '../context/NewUserContext';

export const useNewUser = () => {
  return useContext(NewUserContext);
};
