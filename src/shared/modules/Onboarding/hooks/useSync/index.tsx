import { useContext } from 'react';
import { SyncContext } from '../../context/SyncProvider';

export const useSync = () => {
  return useContext(SyncContext);
};
