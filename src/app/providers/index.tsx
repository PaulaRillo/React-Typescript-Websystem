import { QueryClient } from 'react-query';
//material-ui
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//resources
import { AppAlert } from 'app/components/AppAlert';
import { store } from 'app/store';
import { theme } from '../theme';

type Props = {
  children: JSX.Element;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 12 // 12 hours
    }
  }
});

export function Providers({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppAlert />
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
        <CssBaseline />
      </Provider>
    </ThemeProvider>
  );
}
