import { useContext } from 'react';
import { RolesContext } from '../context/RolesContext';

export const useRoles = () => {
  return useContext(RolesContext);
};
