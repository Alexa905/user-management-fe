import { useRoutes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contacts from './pages/DevelopersContacts/DevelopersContacts';
import * as React from 'react';
const MainLayout = React.lazy(() => import('./layouts/MainLayout'));

export default function Router() {
  let element = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: '/contacts',
          element: <Contacts />,
        },
      ],
    },
  ]);

  return element;
}
