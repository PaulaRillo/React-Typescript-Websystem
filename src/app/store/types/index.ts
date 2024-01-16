import { store } from 'app/store';

export type ReduxStore = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
