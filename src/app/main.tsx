import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { GlobalLoader } from 'shared/components/GlobalLoader';

const App = lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<GlobalLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
