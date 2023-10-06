import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { useBackButton, useWebApp } from '@tma.js/sdk-react';
import { useEffect } from 'react';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';
import { PageTipResult } from './PageTipResult';
import { PageTransactions } from './PageTransactions';

export const Pages = () => {
  const location = useLocation();

  const backButton = useBackButton();
  const webApp = useWebApp();

  useEffect(() => {
    webApp.ready();

    webApp.setBackgroundColor('#e30808');
    webApp.setHeaderColor('#1b9a6e');

    const listener = () => console.log('qqq');
    backButton.on('click', listener);
    backButton.show();

    return () => {
      backButton.off('click', listener);
      backButton.hide();
    };
  }, [backButton, webApp]);

  return (
    <Routes location={location}>
      <Route path="/" element={<PageHome />} />
      <Route path="/tip" element={<PageTip />} />
      <Route path="/result" element={<PageTipResult />} />
      <Route path="/transactions" element={<PageTransactions />} />
    </Routes>
  );
};
