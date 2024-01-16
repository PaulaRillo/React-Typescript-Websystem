import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Providers } from './providers';
import { AppRouter } from './router';
import './styles/nprogress.css';

export function App() {
  nProgress.configure({
    minimum: 0.2,
    showSpinner: false,
    speed: 1500
  });

  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
