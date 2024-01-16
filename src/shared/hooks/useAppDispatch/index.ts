import { useDispatch } from 'react-redux';
import { ReduxDispatch } from 'app';

export const useAppDispatch = () => useDispatch<ReduxDispatch>();
