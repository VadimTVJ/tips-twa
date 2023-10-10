import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useBackButton, useLaunchParams, useWebApp } from '@tma.js/sdk-react';
import { useEffect } from 'react';
import { RouteProps } from 'react-router';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';
import { PageTipSuccess } from './PageTipSuccess';
import { PageTips } from './PageTips';
import { PageTipError } from './PageTipError';
import { isNumeric } from '../shared/lib/is-numeric';

export const Pages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backButton = useBackButton();
  const webApp = useWebApp();
  const { initData } = useLaunchParams();

  const routes: RouteProps[] = [
    { path: '/', element: <PageHome /> },
    { path: '/tip/:waiterId?', element: <PageTip /> },
    { path: '/tips', element: <PageTips /> },
    { path: '/success', element: <PageTipSuccess /> },
    { path: '/error', element: <PageTipError /> },
  ];

  useEffect(() => {
    if (initData?.startParam && isNumeric(initData.startParam)) {
      navigate(`/tip/${initData.startParam}`);
    }
  }, [initData?.startParam]);

  useEffect(() => {
    webApp.ready();

    const listener = () => navigate(-1);

    backButton.on('click', listener);

    return () => {
      backButton.off('click', listener);
      backButton.hide();
    };
  }, [backButton, webApp, navigate]);

  return (
    <Routes location={location}>
      {routes.map((route) => <Route key={route.path} {...route} />)}
    </Routes>
  );
};
