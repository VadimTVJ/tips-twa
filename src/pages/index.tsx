import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useBackButton, useWebApp } from '@tma.js/sdk-react';
import { useEffect } from 'react';
import { RouteProps } from 'react-router';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';
import { PageTipResult } from './PageTipResult';
import { PageTips } from './PageTips';

export const Pages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backButton = useBackButton();
  const webApp = useWebApp();

  const routes: (RouteProps & { withQuit?: boolean; })[] = [
    { path: '/', element: <PageHome />, withQuit: true },
    { path: '/tip/:waiterId?', element: <PageTip /> },
    { path: '/tips', element: <PageTips /> },
    { path: '/result', element: <PageTipResult />, withQuit: true },
  ];

  useEffect(() => {
    const curPathname = location.pathname;
    const route = routes.find(({ path }) => path === curPathname);

    if (route?.withQuit) {
      backButton.hide();
    } else {
      backButton.show();
    }
  }, [location]);

  useEffect(() => {
    webApp.ready(); // todo after prefetches

    const listener = () => navigate(-1);

    backButton.on('click', listener);

    return () => {
      backButton.off('click', listener);
      backButton.hide();
    };
  }, [backButton, webApp, navigate]);

  return (
    <Routes location={location}>
      {routes.map(({ withQuit, ...route }) => <Route key={route.path} {...route} />)}
    </Routes>
  );
};
