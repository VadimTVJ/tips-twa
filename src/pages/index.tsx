import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useBackButton, useWebApp } from '@tma.js/sdk-react';
import { useEffect } from 'react';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';
import { PageTipResult } from './PageTipResult';
import { PageTransactions } from './PageTransactions';

export const Pages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backButton = useBackButton();
  const webApp = useWebApp();

  const routes = [
    { path: '/', element: <PageHome /> },
    { path: '/tip', element: <PageTip /> },
    { path: '/result', element: <PageTipResult /> },
    { path: '/transactions', element: <PageTransactions /> },
  ];

  useEffect(() => {
    webApp.ready();

    const listener = () => {
      if (window.location.pathname === routes[0].path) {
        webApp.close();
      } else {
        navigate(-1);
      }
    };

    backButton.on('click', listener);
    backButton.show();

    return () => {
      backButton.off('click', listener);
      backButton.hide();
    };
  }, [backButton, webApp, navigate]);

  // todo as object
  return (
    <Routes location={location}>
      {routes.map((route) => <Route {...route} />)}
    </Routes>
  );
};
