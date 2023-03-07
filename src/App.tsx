import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import Spinner from './components/Spinner/Spinner';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <React.Suspense fallback={<Spinner />}>
          <Router />
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
}
