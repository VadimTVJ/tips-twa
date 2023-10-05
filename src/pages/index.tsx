import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';
import { PageTipResult } from './PageTipResult';
import { PageTransactions } from './PageTransactions';

export const Pages = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<PageHome />} />
      <Route path="/tip" element={<PageTip />} />
      <Route path="/result" element={<PageTipResult />} />
      <Route path="/transactions" element={<PageTransactions />} />
    </Routes>
  );
};
