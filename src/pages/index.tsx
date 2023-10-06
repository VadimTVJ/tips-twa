import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useBackButton, useWebApp } from '@tma.js/sdk-react';
import { useEffect } from 'react';
import { RouteProps } from 'react-router';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';
import { PageTipResult } from './PageTipResult';
import { PageTransactions } from './PageTransactions';

export const Pages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backButton = useBackButton();
  const webApp = useWebApp();

  const routes: RouteProps[] = [
    { path: '/', element: <PageHome /> },
    { path: '/tip/:tipId?', element: <PageTip /> },
    { path: '/result', element: <PageTipResult /> },
    { path: '/transactions', element: <PageTransactions /> },
  ];

  useEffect(() => {
    webApp.ready(); // todo after prefetches

    const listener = () => {
      if (window.location.pathname === routes[0].path) {
        webApp.close();
      } else {
        navigate(-1);
      }
    };

    backButton.on('click', listener);
    backButton.hide();
    backButton.show();

    return () => {
      backButton.off('click', listener);
      backButton.hide();
    };
  }, [backButton, webApp, navigate]);

  return (
    <Routes location={location}>
      {routes.map((route) => <Route {...route} />)}
    </Routes>
  );
};
