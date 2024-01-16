import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { ReduxStore } from 'app';

export const useAppSelector: TypedUseSelectorHook<ReduxStore> = useSelector;
